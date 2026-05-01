"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Download, Share2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type InstallDeferredContextValue = {
  deferred: BeforeInstallPromptEvent | null;
  clearDeferred: () => void;
};

const InstallDeferredContext = createContext<InstallDeferredContextValue | null>(null);

function useDeferredInstallPromptState(): InstallDeferredContextValue {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBip);
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, []);

  const clearDeferred = useCallback(() => setDeferred(null), []);

  return useMemo(
    () => ({ deferred, clearDeferred }),
    [deferred, clearDeferred],
  );
}

/** Scope PWA install listener to nav — avoids wrapping the whole page. */
export function InstallPromptProvider({ children }: { children: ReactNode }) {
  const value = useDeferredInstallPromptState();
  return (
    <InstallDeferredContext.Provider value={value}>{children}</InstallDeferredContext.Provider>
  );
}

function useInstallDeferred(): InstallDeferredContextValue {
  const v = useContext(InstallDeferredContext);
  if (!v) {
    throw new Error("InstallPromptProvider is required for install components");
  }
  return v;
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return true;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  if (nav.standalone === true) return true;
  return window.matchMedia("(display-mode: standalone)").matches;
}

function isIos(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

/** Skip rendering install UI on desktop to avoid extra drawer subtree. */
function useInstallViewport(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(max-width: 1279px)");
    const sync = () => setOk(q.matches);
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);
  return ok;
}

type InstallDrawerPanelsProps = {
  deferred: BeforeInstallPromptEvent | null;
  clearDeferred: () => void;
  onOpenChange: (open: boolean) => void;
  onNavigate?: () => void;
};

function InstallDrawerPanels({
  deferred,
  clearDeferred,
  onOpenChange,
  onNavigate,
}: InstallDrawerPanelsProps) {
  const ios = isIos();

  const handleInstall = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    clearDeferred();
    onOpenChange(false);
    onNavigate?.();
  };

  const dismiss = () => {
    onOpenChange(false);
    onNavigate?.();
  };

  return (
    <>
      <DrawerHeader className="text-left">
        <DrawerTitle className="font-playfair text-xl text-[#0b1c30]">
          Add EatSmart to your home screen
        </DrawerTitle>
        <DrawerDescription className="text-slate-600 text-base leading-relaxed">
          Open like an app for quick access from your home screen.
        </DrawerDescription>
      </DrawerHeader>

      <div className="space-y-6 px-1 pb-2">
        {deferred ? (
          <Button
            type="button"
            onClick={handleInstall}
            className="w-full h-12 rounded-full bg-[#FF85A1] hover:bg-[#ff6b8a] text-white font-semibold shadow-lg shadow-[#FF85A1]/25"
          >
            <Download className="size-5 mr-2 shrink-0" aria-hidden />
            Install EatSmart
          </Button>
        ) : ios ? (
          <ol className="space-y-4 text-sm text-slate-700">
            <li className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#FF85A1]/15 text-xs font-bold text-[#FF85A1]">
                1
              </span>
              <span className="pt-0.5">
                Tap the{" "}
                <Share2 className="inline size-4 text-[#FF85A1] align-text-bottom mx-0.5" aria-hidden />{" "}
                <strong>Share</strong> button in Safari.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#FF85A1]/15 text-xs font-bold text-[#FF85A1]">
                2
              </span>
              <span className="pt-0.5">
                Choose <strong>Add to Home Screen</strong>, then tap <strong>Add</strong>.
              </span>
            </li>
          </ol>
        ) : (
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-sm text-slate-700 shadow-sm">
            <p>
              Use the browser menu: <strong>Install app</strong> or <strong>Add to Home screen</strong>.
            </p>
          </div>
        )}
      </div>

      <DrawerFooter className="pt-2 gap-2 sm:flex-row sm:justify-stretch">
        <DrawerClose asChild>
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-slate-200 w-full sm:w-auto"
            onClick={dismiss}
          >
            Close
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  );
}

function InstallDrawerShell({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="border-[#FF85A1]/20 bg-[#f8f9ff] px-4 pb-6 max-h-[88vh]">
        {children}
      </DrawerContent>
    </Drawer>
  );
}

type AddToHomeNavButtonProps = {
  onMenuClose?: () => void;
  className?: string;
};

/** Mobile menu only — no floating chip, no scroll/timer listeners, no dismiss storage. */
export function AddToHomeNavButton({ onMenuClose, className }: AddToHomeNavButtonProps) {
  const mobileWide = useInstallViewport();
  const [installed, setInstalled] = useState(true);
  const [open, setOpen] = useState(false);
  const { deferred, clearDeferred } = useInstallDeferred();

  useEffect(() => {
    setInstalled(isStandalone());
  }, []);

  if (!mobileWide || installed) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onMenuClose?.();
          setOpen(true);
        }}
        className={cn(
          "w-full flex items-center justify-center gap-2 rounded-full h-11 font-sans font-medium text-sm",
          "border border-[#FF85A1]/35 bg-white/90 text-[#0b1c30] shadow-sm hover:bg-[#FF85A1]/5 transition-colors",
          className,
        )}
      >
        <Smartphone className="size-4 text-[#FF85A1] shrink-0" aria-hidden />
        Add to Home
      </button>

      <InstallDrawerShell open={open} onOpenChange={setOpen}>
        <InstallDrawerPanels
          deferred={deferred}
          clearDeferred={clearDeferred}
          onOpenChange={setOpen}
          onNavigate={onMenuClose}
        />
      </InstallDrawerShell>
    </>
  );
}
