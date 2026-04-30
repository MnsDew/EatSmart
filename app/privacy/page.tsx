import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How EatSmart handles information when you use our educational nutrition site for the Global Society of Medicine and Health.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#FF85A1] mb-2">
          EatSmart
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: April 30, 2026</p>

        <div className="prose prose-slate prose-p:text-slate-600 max-w-none space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Overview</h2>
            <p>
              EatSmart is an educational experience designed for the Global Society of Medicine and
              Health. This Privacy Policy explains what information may be processed when you visit the
              site and how we use it.
            </p>
            <p>
              The site is operated by <strong>independent developers</strong> who built it voluntarily
              and for portfolio and professional marketing purposes. They do not control all underlying
              educational or medical content (which may come from posters, organizers, or third-party
              licenses) and are not responsible for how other parties or users apply that information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Limitation of responsibility</h2>
            <p>
              The developers are not responsible for misuse of the site, harmful or unlawful activity by
              users or third parties, or for the accuracy or appropriateness of content supplied by others
              (including event organizers or material licensors). Use of EatSmart is at your own risk;
              see the <Link href="/terms" className="font-semibold text-[#FF85A1] hover:underline">Terms of Use</Link>{" "}
              for full disclaimers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Information we collect</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong>Usage analytics:</strong> We may collect aggregated usage data (for example,
                page visits and device type) through privacy-respecting analytics to understand how the
                experience performs.
              </li>
              <li>
                <strong>Calculator inputs:</strong> Any values you type into on-page calculators stay
                in your browser unless you explicitly submit them somewhere else—we do not operate a
                login or medical chart on this marketing site.
              </li>
              <li>
                <strong>Communications:</strong> We do not offer a contact form on this build; if that
                changes later, this policy will describe what you submit and why.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">How we use information</h2>
            <p>
              We use information to run, secure, and improve the site, understand aggregate engagement,
              and comply with law. We do not sell your personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Retention</h2>
            <p>
              Analytics providers may retain aggregate telemetry according to their settings. You can use
              browser controls or extensions to limit trackers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Children</h2>
            <p>
              EatSmart presents general education for broad audiences. If you are under 13, please use
              the site with a parent or guardian.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Changes</h2>
            <p>
              We may update this policy as the product evolves. The “Last updated” line will change when
              we do.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Contact</h2>
            <p>
              For privacy questions tied to this deployment, reach the EatSmart creators through the
              society organizers or the profile links referenced on the site once they are published.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex font-semibold text-[#FF85A1] hover:text-[#ff6b8a] underline-offset-4 hover:underline"
          >
            ← Back to EatSmart
          </Link>
        </div>
      </div>
    </div>
  );
}
