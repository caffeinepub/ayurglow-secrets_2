import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Loader2,
  MessageSquare,
  Send,
  Tag,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ExternalBlob } from "../backend.d";
import {
  useAddComment,
  useGetPost,
  useListComments,
} from "../hooks/useQueries";

type ImageSize = "small" | "medium" | "large" | "full";

// IMAGE_SIZE_CLASSES maps size names to tailwind classes for rendered images
const _IMAGE_SIZE_CLASSES: Record<ImageSize, string> = {
  small: "max-w-xs mx-auto",
  medium: "max-w-md mx-auto",
  large: "max-w-xl mx-auto",
  full: "w-full",
};

function parseContent(content: string, contentImages: ExternalBlob[]) {
  // Parse ![alt](index) or ![alt](url) patterns and render images
  const parts = content.split(/(\!\[([^\]]*)\]\(([^)]+)\))/g);
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;

    // Check if this is an image tag match
    if (part.startsWith("![")) {
      i++; // skip alt group
      i++; // skip src group
      continue;
    }

    // Check for image pattern
    const imgMatch = part.match(/\!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      const [, alt, src] = imgMatch;
      let imgUrl = src;
      // If src is a number, it's an index into contentImages
      const idx = Number.parseInt(src, 10);
      if (!Number.isNaN(idx) && contentImages[idx]) {
        imgUrl = contentImages[idx].getDirectURL?.() || src;
      }
      elements.push(
        <figure key={key++} className="my-6">
          <img
            src={imgUrl}
            alt={alt}
            className="w-full rounded-xl shadow-sm object-cover"
          />
          {alt && (
            <figcaption className="text-center text-xs text-muted-foreground mt-2 italic">
              {alt}
            </figcaption>
          )}
        </figure>,
      );
    } else {
      // Split by double newline for paragraphs
      const paragraphs = part.split(/\n\n+/);
      for (const para of paragraphs) {
        if (!para.trim()) continue;

        // Handle headers
        if (para.startsWith("## ")) {
          elements.push(
            <h2
              key={key++}
              className="font-display text-2xl font-bold text-[oklch(0.25_0.1_230)] mt-8 mb-3"
            >
              {para.slice(3)}
            </h2>,
          );
        } else if (para.startsWith("### ")) {
          elements.push(
            <h3
              key={key++}
              className="font-display text-xl font-semibold text-[oklch(0.38_0.12_225)] mt-6 mb-2"
            >
              {para.slice(4)}
            </h3>,
          );
        } else if (para.startsWith("**") && para.endsWith("**")) {
          elements.push(
            <p key={key++} className="font-semibold text-foreground my-2">
              {para.slice(2, -2)}
            </p>,
          );
        } else if (para.startsWith("- ") || para.includes("\n- ")) {
          // Bullet list
          const items = para.split("\n").filter((l) => l.startsWith("- "));
          elements.push(
            <ul key={key++} className="list-disc pl-5 space-y-1 my-3">
              {items.map((item) => (
                <li key={item} className="text-foreground/80 text-base">
                  {item.slice(2)}
                </li>
              ))}
            </ul>,
          );
        } else {
          const lines = para.split("\n");
          elements.push(
            <p
              key={key++}
              className="text-foreground/80 leading-relaxed my-3 text-base"
            >
              {lines.map((line, lineIdx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: line content can repeat
                <span key={lineIdx}>
                  {line}
                  {lineIdx < lines.length - 1 && <br />}
                </span>
              ))}
            </p>,
          );
        }
      }
    }
  }

  return elements;
}

export default function BlogPostPage() {
  const { id } = useParams({ from: "/blog/$id" });
  const { data: post, isLoading: postLoading, isError } = useGetPost(id);
  const { data: comments, isLoading: commentsLoading } = useListComments(id);
  const addComment = useAddComment();

  const [authorName, setAuthorName] = useState("");
  const [commentContent, setCommentContent] = useState("");

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentContent.trim()) {
      toast.error("Please fill in both name and comment fields.");
      return;
    }
    try {
      await addComment.mutateAsync({
        postId: id,
        authorName: authorName.trim(),
        content: commentContent.trim(),
      });
      setAuthorName("");
      setCommentContent("");
      toast.success("Comment posted successfully!");
    } catch {
      toast.error("Failed to post comment. Please try again.");
    }
  };

  if (postLoading) {
    return (
      <main className="min-h-screen" data-ocid="blog-post.page">
        <div
          className="container py-10 max-w-3xl"
          data-ocid="blog-post.loading_state"
        >
          <Skeleton className="h-6 w-24 mb-6" />
          <Skeleton className="h-64 w-full rounded-xl mb-6" />
          <Skeleton className="h-8 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </main>
    );
  }

  if (isError || !post) {
    return (
      <main className="min-h-screen" data-ocid="blog-post.page">
        <div
          className="container py-10 max-w-3xl"
          data-ocid="blog-post.error_state"
        >
          <Alert variant="destructive">
            <AlertDescription>
              Post not found or failed to load. Please try again.
            </AlertDescription>
          </Alert>
          <Link
            to="/blog"
            className="mt-4 inline-flex items-center gap-2 text-brand-blue"
            data-ocid="blog-post.back.link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const coverUrl = post.coverImage?.getDirectURL?.();
  const contentImages: ExternalBlob[] = post.contentImages || [];

  return (
    <main className="min-h-screen" data-ocid="blog-post.page">
      <div className="container py-10 max-w-3xl">
        {/* Back link */}
        <Link
          to="/blog"
          data-ocid="blog-post.back.link"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-blue text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Cover Image */}
        {coverUrl && (
          <div className="rounded-2xl overflow-hidden mb-8 shadow-brand">
            <img
              src={coverUrl}
              alt={post.title}
              className="w-full max-h-80 object-cover"
            />
          </div>
        )}

        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge className="capitalize bg-[oklch(0.38_0.12_225)] text-white">
            {post.category}
          </Badge>
          {post.subcategory && (
            <Badge variant="outline" className="capitalize">
              {post.subcategory}
            </Badge>
          )}
          {post.publishedAt && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(
                Number(post.publishedAt) / 1_000_000,
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl font-bold text-[oklch(0.2_0.1_230)] mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed border-l-4 border-[oklch(0.42_0.14_155)] pl-4 py-1">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Content */}
        <article className="prose-ayur mb-12" data-ocid="blog-post.editor">
          {parseContent(post.content, contentImages)}
        </article>

        {/* Divider */}
        <hr className="border-border my-10" />

        {/* Comments Section */}
        <section data-ocid="blog-post.comments.section">
          <h2 className="font-display text-2xl font-bold text-[oklch(0.25_0.1_230)] mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-brand-blue" />
            Comments
            {comments && comments.length > 0 && (
              <span className="text-base text-muted-foreground font-normal">
                ({comments.length})
              </span>
            )}
          </h2>

          {/* Comment List */}
          {commentsLoading ? (
            <div
              className="space-y-4 mb-8"
              data-ocid="blog-post.comments.loading_state"
            >
              {[1, 2].map((i) => (
                <div key={i} className="rounded-lg border border-border p-4">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5 mt-1" />
                </div>
              ))}
            </div>
          ) : comments && comments.length > 0 ? (
            <div className="space-y-4 mb-8" data-ocid="blog-post.comments.list">
              {comments.map((comment, commentIdx) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: comments have no stable ID
                  key={commentIdx}
                  data-ocid={`blog-post.comment.item.${commentIdx + 1}`}
                  className="rounded-lg border border-border bg-muted/30 p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[oklch(0.38_0.12_225)] text-white flex items-center justify-center text-sm font-bold">
                      {comment.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {comment.authorName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(
                          Number(comment.createdAt) / 1_000_000,
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="text-center py-8 text-muted-foreground mb-8 rounded-lg border border-border bg-muted/20"
              data-ocid="blog-post.comments.empty_state"
            >
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          )}

          {/* Add Comment Form */}
          <div
            className="rounded-xl border border-border bg-card p-6"
            data-ocid="blog-post.comment.dialog"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-brand-blue" />
              Share Your Thoughts
            </h3>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div>
                <label
                  htmlFor="comment-author"
                  className="text-sm font-medium text-foreground mb-1.5 block"
                >
                  Your Name
                </label>
                <Input
                  id="comment-author"
                  placeholder="Enter your name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  data-ocid="blog-post.comment.name.input"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="comment-content"
                  className="text-sm font-medium text-foreground mb-1.5 block"
                >
                  Comment
                </label>
                <Textarea
                  id="comment-content"
                  placeholder="Share your experience, questions, or thoughts about this remedy..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  rows={4}
                  data-ocid="blog-post.comment.textarea"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={addComment.isPending}
                data-ocid="blog-post.comment.submit_button"
                className="bg-[oklch(0.38_0.12_225)] hover:bg-[oklch(0.32_0.12_225)] text-white"
              >
                {addComment.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Post Comment
                  </>
                )}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
