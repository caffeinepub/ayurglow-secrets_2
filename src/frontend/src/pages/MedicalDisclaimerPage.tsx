import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

const sections = [
  {
    id: "not-medical-advice",
    title: "1. Not Medical Advice",
    content:
      "All content published on AyurGlow Secrets — including articles, blog posts, remedy guides, and category pages — is provided for general informational and educational purposes only. None of the information on this website constitutes medical advice, diagnosis, or treatment. The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment by a licensed healthcare provider.",
    highlight: true,
  },
  {
    id: "consult-professional",
    title: "2. Consult a Healthcare Professional",
    content:
      "Always seek the guidance of a qualified healthcare provider or physician before beginning any new health remedy, herbal supplement, dietary change, or lifestyle practice described on this website. This is especially important for pregnant women, breastfeeding mothers, children, elderly individuals, and those with pre-existing medical conditions. Never disregard professional medical advice or delay seeking it because of something you have read on AyurGlow Secrets.",
  },
  {
    id: "no-doctor-patient",
    title: "3. No Doctor-Patient Relationship",
    content:
      "Using this website or reading its content does not create a doctor-patient relationship between you and AyurGlow Secrets or any of its contributors. The information provided is general in nature and does not take into account your individual health circumstances, medical history, or specific needs. For personalized medical advice, please consult a qualified healthcare professional.",
  },
  {
    id: "ayurvedic-remedies",
    title: "4. Ayurvedic Remedies",
    content:
      "Ayurveda is an ancient system of medicine with a rich tradition spanning thousands of years. While many Ayurvedic practices and herbal remedies have been used historically, individual results may vary significantly. Some herbs and supplements may interact with prescription medications, over-the-counter drugs, or other supplements. Certain herbs may cause allergic reactions or side effects in some individuals. Always research potential interactions and consult a healthcare provider before use.",
  },
  {
    id: "emergency",
    title: "5. Emergency Situations",
    content:
      "AyurGlow Secrets is not an emergency medical service. In the event of a medical emergency, call your local emergency services number (such as 911, 112, or your country's equivalent) immediately. Do not rely on information from this website in emergency situations. If you are experiencing a medical emergency, seek professional medical help right away.",
    highlight: true,
  },
  {
    id: "accuracy",
    title: "6. Accuracy of Information",
    content:
      "We strive to provide accurate, helpful, and up-to-date information about Ayurvedic practices and natural wellness. However, we cannot guarantee that all information on this website is complete, current, or free from errors. Medical knowledge and Ayurvedic research are continuously evolving. Information that was accurate at the time of publication may become outdated. We encourage you to verify information from multiple sources and consult qualified professionals.",
  },
  {
    id: "liability",
    title: "7. Limitation of Liability",
    content:
      "AyurGlow Secrets, its owners, editors, contributors, and affiliates are not liable for any harm, loss, injury, or damage — direct or indirect — arising from your use of, or reliance on, any information provided on this website. By accessing and using AyurGlow Secrets, you acknowledge that you do so at your own risk and that you have read and understood this Medical Disclaimer.",
  },
];

export default function MedicalDisclaimerPage() {
  return (
    <main data-ocid="disclaimer.page" className="min-h-screen">
      {/* Hero Header */}
      <section
        data-ocid="disclaimer.section"
        className="relative bg-[oklch(0.22_0.08_230)] text-white overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 80% 50%, oklch(0.5 0.15 155) 0%, transparent 60%), radial-gradient(ellipse at 20% 30%, oklch(0.45 0.18 30) 0%, transparent 55%)",
          }}
        />
        <div className="relative container py-16 md:py-20">
          <Link
            to="/"
            data-ocid="disclaimer.link"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[oklch(0.55_0.18_30)]/30 backdrop-blur-sm border border-white/10">
              <AlertTriangle className="w-7 h-7 text-[oklch(0.82_0.15_75)]" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                Medical Disclaimer
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Last updated: March 2026
              </p>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white/70 text-base max-w-2xl leading-relaxed"
          >
            Please read this disclaimer carefully before using any information,
            remedies, or content shared on AyurGlow Secrets.
          </motion.p>
        </div>
      </section>

      {/* Important Notice Banner */}
      <div className="bg-[oklch(0.96_0.04_75)] border-b border-[oklch(0.88_0.08_75)]">
        <div className="container py-4 max-w-4xl">
          <p className="text-[oklch(0.35_0.1_55)] text-sm font-medium flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[oklch(0.6_0.15_55)]" />
            <span>
              <strong>Important:</strong> The content on this website is for
              educational purposes only and is NOT a substitute for professional
              medical advice, diagnosis, or treatment.
            </span>
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="container py-12 md:py-16 max-w-4xl">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              data-ocid="disclaimer.panel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className={`rounded-2xl border shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow ${
                section.highlight
                  ? "bg-[oklch(0.97_0.025_75)] border-[oklch(0.88_0.07_75)]"
                  : "bg-white border-[oklch(0.9_0.03_230)]"
              }`}
            >
              <h2
                className={`font-display text-xl font-bold mb-3 flex items-center gap-2 ${
                  section.highlight
                    ? "text-[oklch(0.35_0.1_55)]"
                    : "text-[oklch(0.25_0.1_230)]"
                }`}
              >
                <span
                  className={`w-1.5 h-6 rounded-full flex-shrink-0 ${
                    section.highlight
                      ? "bg-[oklch(0.6_0.15_55)]"
                      : "bg-[oklch(0.42_0.14_155)]"
                  }`}
                />
                {section.title}
              </h2>
              <p className="text-[oklch(0.35_0.04_230)] leading-relaxed text-[15px]">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 p-6 bg-[oklch(0.96_0.03_155)] rounded-2xl border border-[oklch(0.88_0.06_155)] text-center"
        >
          <p className="text-[oklch(0.32_0.08_230)] text-sm mb-4">
            By using AyurGlow Secrets you agree to this disclaimer. If you have
            questions, please review our Privacy Policy.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/privacy-policy"
              data-ocid="disclaimer.secondary_button"
              className="inline-flex items-center gap-2 bg-[oklch(0.38_0.12_225)] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[oklch(0.32_0.12_225)] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/"
              data-ocid="disclaimer.primary_button"
              className="inline-flex items-center gap-2 border border-[oklch(0.38_0.12_225)] text-[oklch(0.38_0.12_225)] px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[oklch(0.95_0.02_225)] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
