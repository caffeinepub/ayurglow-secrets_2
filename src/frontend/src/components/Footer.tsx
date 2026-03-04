import { Link } from "@tanstack/react-router";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[oklch(0.22_0.08_230)] text-white mt-auto"
      data-ocid="footer.section"
    >
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <img
              src="/assets/generated/ayurglow-logo-transparent.dim_400x120.png"
              alt="AyurGlow Secrets"
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-sm text-white/70 leading-relaxed">
              AyurGlow Secrets is a wellness platform dedicated to sharing the
              healing power of Ayurveda for a healthier life, glowing skin, and
              stronger hair. Inspired by ancient Ayurvedic texts and traditional
              Indian home remedies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/health", label: "Health Remedies" },
                { to: "/skin", label: "Skin Care" },
                { to: "/hair", label: "Hair Care" },
                { to: "/lifestyle", label: "Lifestyle & Weight" },
                { to: "/chronic", label: "Chronic Health" },
                { to: "/blog", label: "Blog" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "")}.link`}
                    className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="text-[oklch(0.65_0.1_155)]">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-white">
              Connect With Us
            </h3>
            <p className="text-sm text-white/70 mb-5">
              Follow us on social media for daily Ayurvedic tips, remedies, and
              wellness inspiration.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                data-ocid="footer.instagram.link"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-[oklch(0.7_0.2_0)] transition-colors"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                data-ocid="footer.facebook.link"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-[oklch(0.45_0.15_240)] transition-colors"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="YouTube"
                data-ocid="footer.youtube.link"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-[oklch(0.55_0.25_25)] transition-colors"
              >
                <SiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-white/50">
            © {year} AyurGlow Secrets. All rights reserved.
          </p>
          <p className="text-xs text-white/30 mt-1">
            Disclaimer: Content is for informational purposes only and does not
            constitute medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
