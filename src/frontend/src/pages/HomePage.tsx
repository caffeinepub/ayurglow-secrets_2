import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Leaf, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useListPosts } from "../hooks/useQueries";
import { extractCoverImageUrl } from "../utils/imageUtils";

const categories = [
  {
    to: "/health",
    icon: "🌿",
    title: "Health Remedies",
    desc: "Immunity, digestion, weight management, diabetes & BP support",
    color: "from-blue-600 to-teal-500",
  },
  {
    to: "/skin",
    icon: "💆",
    title: "Skin Care",
    desc: "Natural glow, acne treatment, pigmentation, anti-aging",
    color: "from-green-600 to-emerald-500",
  },
  {
    to: "/hair",
    icon: "💇",
    title: "Hair Care",
    desc: "Hair fall treatment, growth remedies, dandruff solutions",
    color: "from-teal-600 to-blue-500",
  },
  {
    to: "/lifestyle",
    icon: "🧘",
    title: "Lifestyle & Weight",
    desc: "Morning routines, detox plans, yoga & wellness practices",
    color: "from-emerald-600 to-green-500",
  },
  {
    to: "/chronic",
    icon: "🩺",
    title: "Chronic Health",
    desc: "Diabetes, blood pressure, thyroid, PCOS, joint pain support",
    color: "from-blue-700 to-indigo-600",
  },
];

const offerings = [
  {
    icon: Leaf,
    title: "Natural Ayurvedic Health Remedies",
    desc: "Time-tested herbal formulations for whole-body wellness",
    color: "text-[oklch(0.42_0.14_155)]",
    bg: "bg-[oklch(0.95_0.04_155)]",
  },
  {
    icon: Sparkles,
    title: "Skin Care Tips for Natural Glow",
    desc: "Ancient beauty secrets for radiant, healthy skin",
    color: "text-[oklch(0.38_0.12_225)]",
    bg: "bg-[oklch(0.95_0.02_215)]",
  },
  {
    icon: Heart,
    title: "Hair Fall & Hair Growth Treatments",
    desc: "Proven Ayurvedic remedies to restore and strengthen hair",
    color: "text-[oklch(0.42_0.14_155)]",
    bg: "bg-[oklch(0.95_0.04_155)]",
  },
  {
    icon: Shield,
    title: "Holistic Lifestyle & Wellness Advice",
    desc: "Daily Dinacharya practices for balanced, vibrant living",
    color: "text-[oklch(0.38_0.12_225)]",
    bg: "bg-[oklch(0.95_0.02_215)]",
  },
];

const whyUs = [
  "100% natural & Ayurvedic approach",
  "Simple home remedies anyone can make",
  "Safe, affordable, and effective",
  "Suitable for all age groups",
];

export default function HomePage() {
  const { data: posts, isLoading: postsLoading } = useListPosts();

  const featuredPosts = posts?.filter((p) => p.isPublished).slice(0, 3) ?? [];

  return (
    <main data-ocid="home.page">
      {/* ===== HERO ===== */}
      <section
        className="hero-gradient relative overflow-hidden py-20 md:py-28"
        data-ocid="home.hero.section"
      >
        {/* Background decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-white"
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30 text-xs font-medium px-3 py-1">
              🌿 Ancient Ayurvedic Wisdom
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Welcome to{" "}
              <span className="text-[oklch(0.85_0.12_155)]">AyurGlow</span>{" "}
              Secrets
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-3 font-medium italic">
              "Ancient Ayurvedic Wisdom for Healthy Body, Glowing Skin & Strong
              Hair"
            </p>
            <p className="text-white/75 text-base md:text-lg mb-8 leading-relaxed max-w-2xl">
              Discover time-tested Ayurvedic remedies for overall health,
              radiant skin, and strong, healthy hair. We bring you natural,
              chemical-free solutions rooted in ancient Indian wisdom and backed
              by modern understanding.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/health" data-ocid="home.hero.explore-button">
                <button
                  type="button"
                  className="btn-secondary flex items-center gap-2"
                >
                  Explore Remedies
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/blog" data-ocid="home.hero.blog-button">
                <button
                  type="button"
                  className="bg-white/15 hover:bg-white/25 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 border border-white/30"
                >
                  Read Our Blog
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== WHAT WE OFFER ===== */}
      <section className="py-16 bg-white" data-ocid="home.offerings.section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl font-bold text-[oklch(0.25_0.1_230)] mb-3">
              What We Offer
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A comprehensive Ayurvedic wellness platform covering every aspect
              of natural health
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offerings.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full border-border hover:shadow-brand transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4`}
                    >
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className="font-display text-sm font-semibold text-foreground mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORY CARDS ===== */}
      <section
        className="py-16 section-gradient"
        data-ocid="home.categories.section"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl font-bold text-[oklch(0.25_0.1_230)] mb-3">
              Explore by Category
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Browse our comprehensive collection of Ayurvedic remedies
              organized by category
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link to={cat.to} data-ocid={`home.category.${i + 1}.card`}>
                  <div
                    className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${cat.color} p-6 text-white card-hover cursor-pointer`}
                  >
                    <div className="absolute top-3 right-3 opacity-20 text-6xl">
                      {cat.icon}
                    </div>
                    <div className="text-3xl mb-3">{cat.icon}</div>
                    <h3 className="font-display text-xl font-bold mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {cat.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-white/90 text-sm font-medium">
                      Explore Remedies
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY AYURGLOW ===== */}
      <section className="py-16 bg-white" data-ocid="home.why.section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-3xl font-bold text-[oklch(0.25_0.1_230)] mb-4">
                Why AyurGlow Secrets?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We are committed to making ancient Ayurvedic wisdom accessible
                to everyone. Our remedies are carefully researched and
                simplified for modern daily life.
              </p>
              <ul className="space-y-3">
                {whyUs.map((point, whyIdx) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: whyIdx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[oklch(0.42_0.14_155)] text-white flex items-center justify-center">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-foreground font-medium">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* About preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[oklch(0.38_0.12_225)] to-[oklch(0.42_0.14_155)] rounded-2xl p-8 text-white"
            >
              <h3 className="font-display text-2xl font-bold mb-4">
                About AyurGlow Secrets
              </h3>
              <p className="text-white/85 leading-relaxed mb-4">
                AyurGlow Secrets is a wellness platform dedicated to sharing the
                healing power of Ayurveda for a healthier life, glowing skin,
                and stronger hair. Inspired by ancient Ayurvedic texts and
                traditional Indian home remedies, our goal is to help people
                adopt natural solutions over chemical-based treatments.
              </p>
              <p className="text-white/85 leading-relaxed">
                We believe true beauty and health begin from within. Through
                balanced nutrition, herbal remedies, and mindful living,
                Ayurveda offers sustainable healing without side effects. Our
                content is carefully researched and simplified to help you
                easily follow Ayurvedic practices in your daily life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED BLOG POSTS ===== */}
      <section className="py-16 section-gradient" data-ocid="home.blog.section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="font-display text-3xl font-bold text-[oklch(0.25_0.1_230)] mb-2">
                Latest from the Blog
              </h2>
              <p className="text-muted-foreground">
                Expert insights and deep-dive guides on Ayurvedic wellness
              </p>
            </div>
            <Link to="/blog" data-ocid="home.blog.view-all.link">
              <button
                type="button"
                className="hidden sm:flex items-center gap-2 text-brand-blue font-medium text-sm hover:underline"
              >
                View All Posts
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>

          {postsLoading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
              data-ocid="home.blog.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-border bg-white p-5"
                >
                  <Skeleton className="h-40 w-full rounded-lg mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              ))}
            </div>
          ) : featuredPosts.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="home.blog.empty_state"
            >
              <div className="text-4xl mb-3">📝</div>
              <p className="font-medium">Blog posts are coming soon!</p>
              <p className="text-sm mt-1">
                Check back or visit the admin panel to create posts.
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
              data-ocid="home.blog.list"
            >
              {featuredPosts.map((post, i) => {
                const coverUrl = extractCoverImageUrl(post.tags || []);
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    data-ocid={`home.blog.item.${i + 1}`}
                  >
                    <Link to="/blog/$id" params={{ id: post.id }}>
                      <Card className="h-full overflow-hidden card-hover border-border">
                        <div className="h-44 bg-gradient-to-br from-[oklch(0.38_0.12_225)] to-[oklch(0.42_0.14_155)] overflow-hidden">
                          {coverUrl ? (
                            <img
                              src={coverUrl}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/30 text-5xl">
                              🌿
                            </div>
                          )}
                        </div>
                        <CardContent className="p-5">
                          <Badge
                            variant="secondary"
                            className="text-xs mb-3 capitalize bg-[oklch(0.92_0.04_165)] text-[oklch(0.25_0.08_155)]"
                          >
                            {post.category}
                          </Badge>
                          <h3 className="font-display text-base font-semibold text-foreground mb-2 leading-snug line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                          {post.publishedAt && (
                            <p className="text-xs text-muted-foreground mt-3">
                              {new Date(
                                Number(post.publishedAt) / 1_000_000,
                              ).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
