import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Search } from "lucide-react";
import { useState } from "react";
import { useListPosts } from "../hooks/useQueries";
import { extractCoverImageUrl, getVisibleTags } from "../utils/imageUtils";

const CATEGORY_LABELS: Record<string, string> = {
  all: "All Posts",
  health: "Health",
  skin: "Skin Care",
  hair: "Hair Care",
  lifestyle: "Lifestyle",
  chronic: "Chronic Health",
};

export default function BlogPage() {
  const { data: posts, isLoading } = useListPosts();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const published = posts?.filter((p) => p.isPublished) ?? [];

  const filtered = published.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen" data-ocid="blog.page">
      {/* Hero */}
      <section
        className="hero-gradient py-14 text-white"
        data-ocid="blog.hero.section"
      >
        <div className="container">
          <h1 className="font-display text-4xl font-bold mb-3">
            AyurGlow Blog
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Expert guides, deep-dive remedies, and Ayurvedic wisdom for everyday
            wellness.
          </p>
        </div>
      </section>

      <section className="py-10" data-ocid="blog.content.section">
        <div className="container">
          {/* Search + Filter row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                data-ocid="blog.search_input"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="mb-8"
            data-ocid="blog.category.tab"
          >
            <TabsList className="h-auto gap-2 bg-transparent p-0 flex-wrap">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  data-ocid={`blog.${key}.tab`}
                  className="px-4 py-2 rounded-full text-sm font-medium border border-border
                    data-[state=active]:bg-[oklch(0.38_0.12_225)] data-[state=active]:text-white data-[state=active]:border-transparent
                    data-[state=inactive]:bg-white data-[state=inactive]:hover:border-brand-blue"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Posts Grid */}
          {isLoading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="blog.loading_state"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-white overflow-hidden"
                >
                  <Skeleton className="h-48" />
                  <div className="p-5 space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="blog.empty_state"
            >
              <div className="text-5xl mb-4">📝</div>
              <p className="font-display text-xl font-semibold text-foreground mb-2">
                No posts found
              </p>
              <p className="text-sm">
                {search
                  ? "Try a different search term."
                  : "Be the first to publish an Ayurvedic blog post!"}
              </p>
              <Link
                to="/admin"
                className="mt-4 inline-block text-brand-blue font-medium text-sm hover:underline"
                data-ocid="blog.admin.link"
              >
                Go to Admin Panel →
              </Link>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="blog.posts.list"
            >
              {filtered.map((post, i) => {
                // Use imageUtils to extract cover image from tags
                const coverUrl = extractCoverImageUrl(post.tags || []);
                const visibleTags = getVisibleTags(post.tags || []);
                return (
                  <div key={post.id} data-ocid={`blog.item.${i + 1}`}>
                    <Link to="/blog/$id" params={{ id: post.id }}>
                      <Card className="h-full overflow-hidden card-hover border-border">
                        <div className="h-48 bg-gradient-to-br from-[oklch(0.38_0.12_225)] to-[oklch(0.42_0.14_155)] overflow-hidden">
                          {coverUrl ? (
                            <img
                              src={coverUrl}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display =
                                  "none";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-5xl text-white/30">
                              🌿
                            </div>
                          )}
                        </div>
                        <CardContent className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge
                              variant="secondary"
                              className="text-xs capitalize bg-[oklch(0.92_0.04_165)] text-[oklch(0.25_0.08_155)]"
                            >
                              {post.category}
                            </Badge>
                            {post.subcategory && (
                              <Badge
                                variant="outline"
                                className="text-xs capitalize"
                              >
                                {post.subcategory}
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-display text-base font-semibold text-foreground mb-2 leading-snug line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                            {post.excerpt}
                          </p>
                          {visibleTags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {visibleTags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            {post.publishedAt ? (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(
                                  Number(post.publishedAt) / 1_000_000,
                                ).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </div>
                            ) : (
                              <span />
                            )}
                            <span className="text-xs text-brand-blue font-medium flex items-center gap-1">
                              Read More <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
