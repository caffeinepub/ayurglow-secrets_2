import { Link } from "@tanstack/react-router";
import { ArrowLeft, Shield } from "lucide-react";
import { motion } from "motion/react";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content:
      "Welcome to AyurGlow Secrets. We are committed to protecting your privacy and being transparent about the minimal information we handle. This Privacy Policy explains what information may be collected when you visit our website and how it is used. We do not require you to create an account or provide any personal information to browse our content.",
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    content:
      "AyurGlow Secrets does not require you to register or log in to access any content on our website. We may automatically log basic access data such as your IP address and browser type for security and analytics purposes. This technical data helps us understand how our site is used and to keep it secure. We do not sell, rent, or share this data with third parties for marketing purposes.",
  },
  {
    id: "cookies",
    title: "3. Cookies",
    content:
      "We may use cookies to improve your browsing experience on AyurGlow Secrets. Cookies are small text files stored on your device that help us remember your preferences and understand how visitors interact with our site. You can disable cookies at any time through your browser settings. Please note that disabling cookies may affect the functionality of some features on our site.",
  },
  {
    id: "third-party-links",
    title: "4. Third-Party Links",
    content:
      "Our website may contain links to external websites and resources. These third-party sites have their own privacy policies, and we have no control over or responsibility for their content or privacy practices. We encourage you to review the privacy policy of any external site you visit through links on AyurGlow Secrets.",
  },
  {
    id: "comments",
    title: "5. Comments",
    content:
      "AyurGlow Secrets allows visitors to post comments on blog posts without creating an account. Any comments you submit are stored on our platform and are publicly visible. Please do not include sensitive personal information such as your full name, address, phone number, or health records in your comments. We reserve the right to remove comments that are inappropriate or violate our community standards.",
  },
  {
    id: "childrens-privacy",
    title: "6. Children's Privacy",
    content:
      "AyurGlow Secrets is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has submitted personal information to us, please contact us through our social media channels and we will take appropriate steps to remove such information.",
  },
  {
    id: "policy-changes",
    title: "7. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will indicate the date of the most recent revision at the top of this page. Your continued use of AyurGlow Secrets after any changes constitutes your acceptance of the updated Privacy Policy.",
  },
  {
    id: "contact",
    title: "8. Contact",
    content:
      "If you have any questions or concerns about this Privacy Policy or how your information is handled, please reach out to us through our social media channels listed in the footer. We are happy to address any privacy-related inquiries and will respond as promptly as possible.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main data-ocid="privacy.page" className="min-h-screen">
      {/* Hero Header */}
      <section
        data-ocid="privacy.section"
        className="relative bg-[oklch(0.22_0.08_230)] text-white overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, oklch(0.5 0.15 155) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, oklch(0.38 0.12 225) 0%, transparent 55%)",
          }}
        />
        <div className="relative container py-16 md:py-20">
          <Link
            to="/"
            data-ocid="privacy.link"
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
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[oklch(0.38_0.12_225)]/30 backdrop-blur-sm border border-white/10">
              <Shield className="w-7 h-7 text-[oklch(0.75_0.15_155)]" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                Privacy Policy
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
            Your privacy matters to us. This policy explains how AyurGlow
            Secrets handles your information when you visit our website.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="container py-12 md:py-16 max-w-4xl">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              data-ocid="privacy.panel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="bg-white rounded-2xl border border-[oklch(0.9_0.03_230)] shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow"
            >
              <h2 className="font-display text-xl font-bold text-[oklch(0.25_0.1_230)] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[oklch(0.42_0.14_155)] flex-shrink-0" />
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
            Have more questions? Read our Medical Disclaimer or return to the
            homepage.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/medical-disclaimer"
              data-ocid="privacy.secondary_button"
              className="inline-flex items-center gap-2 bg-[oklch(0.38_0.12_225)] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[oklch(0.32_0.12_225)] transition-colors"
            >
              Medical Disclaimer
            </Link>
            <Link
              to="/"
              data-ocid="privacy.primary_button"
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
