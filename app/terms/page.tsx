import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing your use of the EatSmart educational website for the Global Society of Medicine and Health.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#FF85A1] mb-2">
          EatSmart
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Terms of Use</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: April 30, 2026</p>

        <div className="prose prose-slate prose-p:text-slate-600 max-w-none space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Nature of this project</h2>
            <p>
              EatSmart was built and designed by independent developers as a <strong>volunteer</strong>{" "}
              effort for event and educational context (Global Society of Medicine and Health), and for
              the developers&apos; own <strong>portfolio and marketing</strong> purposes. It is not a
              commercial medical service, clinic, or licensed nutrition practice.
            </p>
            <p>
              The developers are solely responsible for the technical implementation and design of this
              website—not for clinical decisions, how individuals use the information, or any outcomes
              that may follow.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Agreement</h2>
            <p>
              By using EatSmart, you agree to these Terms of Use. If you disagree, please do not use the
              site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Educational purpose</h2>
            <p>
              EatSmart summarizes ideas from the Colorful Heart-Healthy Diet poster. It is provided for
              educational and demonstration purposes for the Global Society of Medicine and Health—not as medical, dietary,
              or emergency advice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">No clinician relationship</h2>
            <p>
              Nothing on this site creates a doctor–patient or clinician–client relationship. For
              personal guidance—especially if you are pregnant, living with diabetes, have heart
              disease, or take prescription medications—work directly with a licensed professional.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Accuracy</h2>
            <p>
              We strive for accurate translations of the poster content, but nutrient needs vary. Numbers,
              portion labels, and example meal plans may not fit every person or culture.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Third-party content</h2>
            <p>
              Photography is credited to Pexels contributors under the Pexels license. Optional fasting
              apps mentioned are independent products; listings do not imply endorsement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Acceptable use</h2>
            <p>
              Do not misuse the site (for example, by attempting to disrupt hosting infrastructure,
              scrape at abusive rates, or misrepresent EatSmart as a licensed clinic).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, the developers, designers, and any contributors
              to EatSmart <strong>are not responsible or liable</strong> for any loss, injury, claim,
              damage, or any direct or indirect consequences arising from your access to or use of this
              site—including, without limitation, misuse of the materials, reliance on examples or
              numbers, inappropriate or unlawful use by any user, or disputes involving third parties,
              hosts, or content sources.
            </p>
            <p>
              Educational or poster-derived <strong>content provided by others</strong> (for example
              organizers, licensors of printed materials, or image providers) remains the responsibility
              of those parties for its accuracy, suitability, and permitted use. The developers do not
              warrant that all such content is complete, current, or appropriate for every jurisdiction
              or individual.
            </p>
            <p>
              If you engage in any unlawful, abusive, harmful, or unintended use of EatSmart—or if
              another party misuses information connected with this site—that conduct is{" "}
              <strong>not attributable to the developers</strong>, who only supplied the web experience
              described above.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0b1c30]">Changes</h2>
            <p>
              We may update these terms; continued use after changes constitutes acceptance of the revised
              terms.
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
