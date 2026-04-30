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

const DISMISS_KEY = "eatsmart-pwa-install-dismissed-at";
const DISMISS_MS = 1000 * 60 * 60 * 24 * 14; /** 14 days */
/** Show floating install hint only after light scroll or this delay — avoids covering the hero. */
const FAB_SCROLL_PX = 100;
const FAB_IDLE_MS = 5500;

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

function useInstallFabReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const go = () => {
      if (!cancelled) setReady(true);
    };

    const onScroll = () => {
      if (window.scrollY >= FAB_SCROLL_PX) go();
    };

    const timer = window.setTimeout(go, FAB_IDLE_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return ready;
}

type InstallDrawerContentProps = {
  deferred: BeforeInstallPromptEvent | null;
  clearDeferred: () => void;
  onOpenChange: (open: boolean) => void;
  onDismissPersist: () => void;
  onNavigate?: () => void;
  compactCopy?: boolean;
};

function InstallDrawerPanels({
  deferred,
  clearDeferred,
  onOpenChange,
  onDismissPersist,
  onNavigate,
  compactCopy,
}: InstallDrawerContentProps) {
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
    onDismissPersist();
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
          {compactCopy
            ? "Open the site like an app — quick access from your home screen."
            : "Open the site like an app — faster access, full screen, and your usual bookmarks stay in the browser."}
        </DrawerDescription>
      </DrawerHeader>

      <div className="space-y-6 px-1 pb-2">
        {deferred ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm">
            {!compactCopy ? (
              <p className="text-sm font-medium text-[#0b1c30] mb-3">Ready to install</p>
            ) : null}
            <Button
              type="button"
              onClick={handleInstall}
              className="w-full h-12 rounded-full bg-[#FF85A1] hover:bg-[#ff6b8a] text-white font-semibold shadow-lg shadow-[#FF85A1]/25"
            >
              <Download className="size-5 mr-2 shrink-0" aria-hidden />
              Install EatSmart
            </Button>
          </div>
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
                Scroll and choose <strong>Add to Home Screen</strong>, then tap <strong>Add</strong>.
              </span>
            </li>
          </ol>
        ) : (
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-sm text-slate-700 shadow-sm">
            <p>
              Use your browser menu: look for <strong>Install app</strong>,{" "}
              <strong>Add to Home screen</strong>, or an install icon in the address bar.
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
            Not now
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

export function AddToHomeScreenFab() {
  const mobileWide = useInstallViewport();
  const fabReady = useInstallFabReady();
  const [installed, setInstalled] = useState(true);
  const [open, setOpen] = useState(false);
  const { deferred, clearDeferred } = useInstallDeferred();

  useEffect(() => {
    setInstalled(isStandalone());
  }, []);

  const handleDismissPersist = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  }, []);

  if (!mobileWide || installed) return null;

  const rawDismiss = typeof window !== "undefined" ? localStorage.getItem(DISMISS_KEY) : null;
  const dismissedAt = rawDismiss ? Number.parseInt(rawDismiss, 10) : 0;
  const dismissedRecently =
    Number.isFinite(dismissedAt) && Date.now() - dismissedAt < DISMISS_MS;
  const showChip = fabReady && !dismissedRecently;

  return (
    <>
      <div
        className={cn(
          "xl:hidden fixed z-45 pointer-events-none",
          "bottom-0 right-0 max-w-[min(100vw-1rem,20rem)]",
          "pb-[max(0.65rem,env(safe-area-inset-bottom))] pr-3 pl-3",
        )}
      >
        {showChip ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Add EatSmart to your home screen"
            title="Add to home screen"
            className={cn(
              "pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/55",
              "bg-white/88 px-2.5 py-1.5 pl-2 text-[11px] leading-tight font-semibold tracking-tight text-[#0b1c30]",
              "shadow-md shadow-[#FF85A1]/12 backdrop-blur-md",
              "ring-1 ring-[#FF85A1]/18 transition-transform duration-200 active:scale-[0.96]",
              "animate-in fade-in slide-in-from-bottom-3 duration-500",
            )}
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#FF85A1]/12 text-[#FF85A1]">
              <Smartphone className="size-3.5" aria-hidden />
            </span>
            <span className="pr-0.5">Add to Home</span>
          </button>
        ) : null}
      </div>

      <InstallDrawerShell open={open} onOpenChange={setOpen}>
        <InstallDrawerPanels
          deferred={deferred}
          clearDeferred={clearDeferred}
          onOpenChange={setOpen}
          onDismissPersist={handleDismissPersist}
          compactCopy={false}
        />
      </InstallDrawerShell>
    </>
  );
}

type AddToHomeNavButtonProps = {
  onMenuClose?: () => void;
  className?: string;
};

export function AddToHomeNavButton({ onMenuClose, className }: AddToHomeNavButtonProps) {
  const mobileWide = useInstallViewport();
  const [installed, setInstalled] = useState(true);
  const [open, setOpen] = useState(false);
  const { deferred, clearDeferred } = useInstallDeferred();

  useEffect(() => {
    setInstalled(isStandalone());
  }, []);

  const handleDismissPersist = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
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
          onDismissPersist={handleDismissPersist}
          onNavigate={onMenuClose}
          compactCopy
        />
      </InstallDrawerShell>
    </>
  );
}
