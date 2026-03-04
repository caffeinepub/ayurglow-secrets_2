import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Bold,
  Calendar,
  CheckCircle,
  Copy,
  Edit,
  Image,
  Italic,
  Loader2,
  Plus,
  Trash2,
  Type,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import type { BlogPost, ExternalBlob as ExternalBlobType } from "../backend.d";
import {
  useCreatePost,
  useDeletePost,
  useListPosts,
  useUpdatePost,
} from "../hooks/useQueries";
import { getVisibleTags } from "../utils/imageUtils";

type ImageSize = "small" | "medium" | "large" | "full";

interface UploadedImage {
  blob: ExternalBlob | ExternalBlobType;
  previewUrl: string;
  size: ImageSize;
  name: string;
  copied?: boolean;
}

interface PostForm {
  title: string;
  category: string;
  subcategory: string;
  excerpt: string;
  visibleTagsInput: string;
  content: string;
  isPublished: boolean;
  publishImmediately: boolean;
  publishDate: string;
}

const emptyForm: PostForm = {
  title: "",
  category: "health",
  subcategory: "",
  excerpt: "",
  visibleTagsInput: "",
  content: "",
  isPublished: false,
  publishImmediately: true,
  publishDate: new Date().toISOString().slice(0, 10),
};

const CATEGORIES = [
  { value: "health", label: "Health Remedies" },
  { value: "skin", label: "Skin Care" },
  { value: "hair", label: "Hair Care" },
  { value: "lifestyle", label: "Lifestyle & Weight" },
  { value: "chronic", label: "Chronic Health" },
];

const IMAGE_SIZES: { value: ImageSize; label: string }[] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "full", label: "Full Width" },
];

export default function AdminPage() {
  const { data: posts, isLoading } = useListPosts();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();

  const [activeTab, setActiveTab] = useState("posts");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<PostForm>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Image state
  const [coverImage, setCoverImage] = useState<UploadedImage | null>(null);
  const [contentImages, setContentImages] = useState<UploadedImage[]>([]);
  const [coverUploadProgress, setCoverUploadProgress] = useState(0);
  const [contentUploadProgress, setContentUploadProgress] = useState(0);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingContent, setIsUploadingContent] = useState(false);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Rich text toolbar state
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeColor, setActiveColor] = useState("#000000");

  const PRESET_COLORS = [
    { hex: "#000000", label: "Black" },
    { hex: "#2d6a4f", label: "Forest Green" },
    { hex: "#1d4e89", label: "Ocean Blue" },
    { hex: "#c0392b", label: "Crimson" },
    { hex: "#e67e22", label: "Amber" },
    { hex: "#6c3483", label: "Purple" },
    { hex: "#0097a7", label: "Teal" },
  ];

  const applyFormat = (
    type: "bold" | "italic" | "color" | "normal",
    color?: string,
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;

    if (start === end) {
      toast.info("Select some text first");
      return;
    }

    const content = form.content;
    const before = content.slice(0, start);
    const selected = content.slice(start, end);
    const after = content.slice(end);

    let formatted = selected;
    let newStart = start;
    let newEnd = end;

    if (type === "normal") {
      formatted = selected
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)/g, "$1")
        .replace(/<color:[^>]+>([\s\S]*?)<\/color>/g, "$1");
      newEnd = start + formatted.length;
    } else if (type === "bold") {
      formatted = `**${selected}**`;
      newEnd = start + formatted.length;
    } else if (type === "italic") {
      formatted = `*${selected}*`;
      newEnd = start + formatted.length;
    } else if (type === "color" && color) {
      formatted = `<color:${color}>${selected}</color>`;
      newEnd = start + formatted.length;
    }

    const newContent = before + formatted + after;
    setForm((f) => ({ ...f, content: newContent }));

    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(newStart, newEnd);
      }
    }, 0);
  };

  // Cover image: read bytes → create ExternalBlob with progress → store blob + local preview
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    setCoverUploadProgress(0);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setCoverUploadProgress(pct),
      );
      const previewUrl = URL.createObjectURL(file);
      setCoverImage({ blob, previewUrl, size: "full", name: file.name });
      toast.success(
        "Cover image ready! It will upload when you save the post.",
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Cover image error:", err);
      toast.error(`Failed to prepare cover image: ${msg}`);
    } finally {
      setIsUploadingCover(false);
      setCoverUploadProgress(0);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  };

  const handleRemoveCover = () => {
    if (coverImage?.previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(coverImage.previewUrl);
    }
    setCoverImage(null);
  };

  // Content images: same approach — store blobs for submit time
  const handleContentImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploadingContent(true);
    setContentUploadProgress(0);
    try {
      const newImages: UploadedImage[] = [];
      for (const file of files) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
          setContentUploadProgress(pct),
        );
        const previewUrl = URL.createObjectURL(file);
        newImages.push({ blob, previewUrl, size: "medium", name: file.name });
      }
      setContentImages((prev) => [...prev, ...newImages]);
      toast.success(
        `${files.length} image(s) ready! They will upload when you save the post.`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Content image error:", err);
      toast.error(`Failed to prepare image(s): ${msg}`);
    } finally {
      setIsUploadingContent(false);
      setContentUploadProgress(0);
      if (contentInputRef.current) contentInputRef.current.value = "";
    }
  };

  const copyImageMarkdown = (img: UploadedImage, index: number) => {
    const markdown = `![${img.name}](${index}:${img.size})`;
    navigator.clipboard.writeText(markdown).then(() => {
      setContentImages((prev) =>
        prev.map((im, i) => (i === index ? { ...im, copied: true } : im)),
      );
      setTimeout(() => {
        setContentImages((prev) =>
          prev.map((im, i) => (i === index ? { ...im, copied: false } : im)),
        );
      }, 2000);
      toast.success("Image markdown copied! Paste into content.");
    });
  };

  const removeContentImage = (index: number) => {
    setContentImages((prev) => {
      const img = prev[index];
      if (img?.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(img.previewUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const updateImageSize = (index: number, size: ImageSize) => {
    setContentImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, size } : img)),
    );
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingPost(null);
    // Revoke any blob URLs
    if (coverImage?.previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(coverImage.previewUrl);
    }
    for (const img of contentImages) {
      if (img.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(img.previewUrl);
      }
    }
    setCoverImage(null);
    setContentImages([]);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);

    const visibleTags = getVisibleTags(post.tags || []);

    setForm({
      title: post.title,
      category: post.category,
      subcategory: post.subcategory,
      excerpt: post.excerpt,
      visibleTagsInput: visibleTags.join(", "),
      content: post.content,
      isPublished: post.isPublished,
      publishImmediately: post.isPublished,
      publishDate: post.publishedAt
        ? new Date(Number(post.publishedAt) / 1_000_000)
            .toISOString()
            .slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    });

    // Restore cover image from ExternalBlob
    if (post.coverImage) {
      const url = post.coverImage.getDirectURL();
      setCoverImage({
        blob: post.coverImage,
        previewUrl: url,
        size: "full",
        name: "Existing cover",
      });
    } else {
      setCoverImage(null);
    }

    // Restore content images from ExternalBlob array
    const restoredContentImages: UploadedImage[] = (
      post.contentImages || []
    ).map((blob, i) => ({
      blob,
      previewUrl: blob.getDirectURL(),
      size: "medium" as ImageSize,
      name: `Image ${i + 1}`,
    }));
    setContentImages(restoredContentImages);

    setActiveTab("create");
  };

  const handleSubmit = async (publish: boolean) => {
    if (!form.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!form.content.trim()) {
      toast.error("Content is required.");
      return;
    }

    const tags = form.visibleTagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const isPublished = publish;

    try {
      if (editingPost) {
        await updatePost.mutateAsync({
          id: editingPost.id,
          title: form.title,
          category: form.category,
          subcategory: form.subcategory,
          content: form.content,
          excerpt: form.excerpt,
          tags,
          isPublished,
          coverImage: (coverImage?.blob as ExternalBlob) ?? null,
          contentImages: contentImages.map((img) => img.blob as ExternalBlob),
        });
        toast.success("Post updated successfully!");
      } else {
        await createPost.mutateAsync({
          title: form.title,
          category: form.category,
          subcategory: form.subcategory,
          content: form.content,
          excerpt: form.excerpt,
          tags,
          isPublished,
          coverImage: (coverImage?.blob as ExternalBlob) ?? null,
          contentImages: contentImages.map((img) => img.blob as ExternalBlob),
        });
        toast.success(isPublished ? "Post published!" : "Draft saved!");
      }

      resetForm();
      setActiveTab("posts");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Failed to save post: ${msg}`);
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deletePost.mutateAsync(deleteId);
      toast.success("Post deleted.");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete post.");
    }
  };

  const isPending = createPost.isPending || updatePost.isPending;

  return (
    <main className="min-h-screen" data-ocid="admin.page">
      {/* Header */}
      <section
        className="hero-gradient py-10 text-white"
        data-ocid="admin.hero.section"
      >
        <div className="container">
          <h1 className="font-display text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-white/80">
            Manage blog posts and content for AyurGlow Secrets
          </p>
        </div>
      </section>

      <section className="py-8" data-ocid="admin.content.section">
        <div className="container">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            data-ocid="admin.tab"
          >
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="posts" data-ocid="admin.posts.tab">
                  All Posts
                </TabsTrigger>
                <TabsTrigger value="create" data-ocid="admin.create.tab">
                  {editingPost ? "Edit Post" : "Create New Post"}
                </TabsTrigger>
              </TabsList>

              {activeTab === "posts" && (
                <Button
                  onClick={() => {
                    resetForm();
                    setActiveTab("create");
                  }}
                  className="bg-[oklch(0.38_0.12_225)] hover:bg-[oklch(0.32_0.12_225)] text-white"
                  data-ocid="admin.create.primary_button"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Button>
              )}
            </div>

            {/* ===== ALL POSTS TAB ===== */}
            <TabsContent value="posts">
              {isLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="admin.posts.loading_state"
                >
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-14 w-full rounded-lg" />
                  ))}
                </div>
              ) : !posts || posts.length === 0 ? (
                <div
                  className="text-center py-16 text-muted-foreground rounded-xl border border-dashed border-border"
                  data-ocid="admin.posts.empty_state"
                >
                  <div className="text-5xl mb-3">📝</div>
                  <p className="font-display text-xl font-semibold text-foreground mb-2">
                    No posts yet
                  </p>
                  <p className="text-sm mb-4">
                    Create your first Ayurvedic blog post to get started.
                  </p>
                  <Button
                    onClick={() => {
                      resetForm();
                      setActiveTab("create");
                    }}
                    className="bg-[oklch(0.38_0.12_225)] text-white"
                    data-ocid="admin.create-first.button"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Post
                  </Button>
                </div>
              ) : (
                <div
                  className="rounded-xl border border-border overflow-hidden"
                  data-ocid="admin.posts.table"
                >
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead>Cover</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post, i) => {
                        const coverUrl = post.coverImage?.getDirectURL();
                        return (
                          <TableRow
                            key={post.id}
                            data-ocid={`admin.post.row.${i + 1}`}
                          >
                            <TableCell>
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-[oklch(0.38_0.12_225)] to-[oklch(0.42_0.14_155)] flex-shrink-0">
                                {coverUrl ? (
                                  <img
                                    src={coverUrl}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (
                                        e.target as HTMLImageElement
                                      ).style.display = "none";
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-white/50 text-lg">
                                    🌿
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium max-w-xs">
                              <span className="line-clamp-1">{post.title}</span>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="secondary"
                                className="capitalize text-xs bg-[oklch(0.92_0.04_165)] text-[oklch(0.25_0.08_155)]"
                              >
                                {post.category}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  post.isPublished ? "default" : "secondary"
                                }
                                className={`text-xs ${
                                  post.isPublished
                                    ? "bg-[oklch(0.42_0.14_155)] text-white"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {post.isPublished ? "Published" : "Draft"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-xs">
                              {post.publishedAt
                                ? new Date(
                                    Number(post.publishedAt) / 1_000_000,
                                  ).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "—"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditPost(post)}
                                  data-ocid={`admin.post.edit_button.${i + 1}`}
                                  className="text-brand-blue hover:text-brand-blue hover:bg-blue-50"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setDeleteId(post.id)}
                                  data-ocid={`admin.post.delete_button.${i + 1}`}
                                  className="text-destructive hover:text-destructive hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            {/* ===== CREATE / EDIT TAB ===== */}
            <TabsContent value="create">
              <div className="max-w-4xl space-y-6">
                {/* Basic Info */}
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Post Details
                  </h2>

                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter post title..."
                      value={form.title}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, title: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="admin.post.title.input"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={form.category}
                        onValueChange={(v) =>
                          setForm((f) => ({ ...f, category: v }))
                        }
                      >
                        <SelectTrigger
                          className="mt-1"
                          data-ocid="admin.post.category.select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subcategory">Subcategory</Label>
                      <Input
                        id="subcategory"
                        placeholder="e.g., immunity-boosting"
                        value={form.subcategory}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            subcategory: e.target.value,
                          }))
                        }
                        className="mt-1"
                        data-ocid="admin.post.subcategory.input"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief description for blog listing..."
                      value={form.excerpt}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, excerpt: e.target.value }))
                      }
                      rows={2}
                      className="mt-1"
                      data-ocid="admin.post.excerpt.textarea"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      placeholder="ayurveda, skin care, turmeric..."
                      value={form.visibleTagsInput}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          visibleTagsInput: e.target.value,
                        }))
                      }
                      className="mt-1"
                      data-ocid="admin.post.tags.input"
                    />
                  </div>
                </div>

                {/* Cover Image */}
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Cover Image
                  </h2>

                  {coverImage ? (
                    <div className="relative rounded-xl overflow-hidden border border-border">
                      <img
                        src={coverImage.previewUrl}
                        alt="Cover preview"
                        className="w-full h-52 object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveCover}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                        data-ocid="admin.cover.remove.button"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="w-full border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer hover:border-brand-blue transition-colors"
                      onClick={() => coverInputRef.current?.click()}
                      data-ocid="admin.cover.dropzone"
                    >
                      {isUploadingCover ? (
                        <div className="flex flex-col items-center gap-3 text-muted-foreground">
                          <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
                          <p className="text-sm font-medium">
                            Preparing cover image...
                          </p>
                          {coverUploadProgress > 0 && (
                            <div className="w-48">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{coverUploadProgress}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="h-2 rounded-full transition-all duration-300"
                                  style={{
                                    width: `${coverUploadProgress}%`,
                                    background: "oklch(0.38 0.12 225)",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Image className="w-10 h-10 opacity-40" />
                          <p className="text-sm font-medium">
                            Click to select cover image
                          </p>
                          <p className="text-xs">
                            JPG, PNG, WebP · Any file size supported
                          </p>
                        </div>
                      )}
                    </button>
                  )}

                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverUpload}
                    data-ocid="admin.cover.upload_button"
                  />

                  {!coverImage && (
                    <Button
                      variant="outline"
                      onClick={() => coverInputRef.current?.click()}
                      disabled={isUploadingCover}
                      data-ocid="admin.cover.select.secondary_button"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Select Cover Image
                    </Button>
                  )}
                </div>

                {/* Content */}
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Content
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Use{" "}
                    <code className="bg-muted px-1 rounded">## Heading</code>{" "}
                    for headings,{" "}
                    <code className="bg-muted px-1 rounded">- item</code> for
                    lists. Insert images by copying the markdown code below and
                    pasting it in your content, e.g.{" "}
                    <code className="bg-muted px-1 rounded">
                      ![caption](0:medium)
                    </code>
                    . Select text and use the toolbar to apply formatting.
                  </p>

                  {/* Formatting Toolbar */}
                  <div className="border border-border rounded-t-lg bg-muted/40 px-2 py-1.5 flex items-center gap-1 flex-wrap">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={() => applyFormat("normal")}
                      title="Remove formatting"
                      data-ocid="admin.content.format-normal.button"
                    >
                      <Type className="w-3.5 h-3.5 mr-1" />
                      Normal
                    </Button>

                    <div className="w-px h-5 bg-border mx-0.5" />

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 font-bold text-sm hover:bg-muted hover:text-foreground"
                      onClick={() => applyFormat("bold")}
                      title="Bold"
                      data-ocid="admin.content.format-bold.button"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 italic text-sm hover:bg-muted hover:text-foreground"
                      onClick={() => applyFormat("italic")}
                      title="Italic"
                      data-ocid="admin.content.format-italic.button"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </Button>

                    <div className="w-px h-5 bg-border mx-0.5" />

                    <div className="relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs flex items-center gap-1.5 hover:bg-muted hover:text-foreground"
                        onClick={() => setShowColorPicker((v) => !v)}
                        title="Text color"
                        data-ocid="admin.content.format-color.button"
                      >
                        <span
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm inline-block"
                          style={{ background: activeColor }}
                        />
                        <span className="text-muted-foreground">Color</span>
                      </Button>

                      {showColorPicker && (
                        <div className="absolute top-full left-0 mt-1 z-10 bg-popover border border-border rounded-lg p-2 shadow-lg">
                          <p className="text-xs text-muted-foreground mb-2 px-1">
                            Pick a color
                          </p>
                          <div className="grid grid-cols-4 gap-1.5">
                            {PRESET_COLORS.map((c) => (
                              <button
                                key={c.hex}
                                type="button"
                                title={c.label}
                                className="w-6 h-6 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-ring"
                                style={{ background: c.hex }}
                                onClick={() => {
                                  setActiveColor(c.hex);
                                  setShowColorPicker(false);
                                  applyFormat("color", c.hex);
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="ml-auto text-xs text-muted-foreground hidden sm:block">
                      Select text → apply format
                    </div>
                  </div>

                  <textarea
                    ref={textareaRef}
                    placeholder="Write your Ayurvedic post content here... Use ## for headings, - for bullet points."
                    value={form.content}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, content: e.target.value }))
                    }
                    rows={16}
                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 font-mono text-sm rounded-t-none border-t-0 -mt-4 flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    data-ocid="admin.post.content.editor"
                  />
                </div>

                {/* In-Content Images */}
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    In-Content Images
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Upload images to embed in your content. Copy the markdown
                    code and paste it into the content editor where you want the
                    image to appear.
                  </p>

                  {contentImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {contentImages.map((img, imgIdx) => (
                        <div
                          // biome-ignore lint/suspicious/noArrayIndexKey: images don't have stable IDs
                          key={imgIdx}
                          data-ocid={`admin.content-image.item.${imgIdx + 1}`}
                          className="rounded-lg border border-border overflow-hidden bg-muted/20"
                        >
                          <div className="h-32 overflow-hidden">
                            <img
                              src={img.previewUrl}
                              alt={img.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3 space-y-2">
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {img.name}
                            </p>
                            <div>
                              <Label className="text-xs">Size</Label>
                              <Select
                                value={img.size}
                                onValueChange={(v) =>
                                  updateImageSize(imgIdx, v as ImageSize)
                                }
                              >
                                <SelectTrigger
                                  className="h-7 text-xs mt-0.5"
                                  data-ocid={`admin.content-image.size.select.${imgIdx + 1}`}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {IMAGE_SIZES.map((s) => (
                                    <SelectItem
                                      key={s.value}
                                      value={s.value}
                                      className="text-xs"
                                    >
                                      {s.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs h-7"
                                onClick={() => copyImageMarkdown(img, imgIdx)}
                                data-ocid={`admin.content-image.copy.button.${imgIdx + 1}`}
                              >
                                {img.copied ? (
                                  <CheckCircle className="mr-1 h-3 w-3 text-green-600" />
                                ) : (
                                  <Copy className="mr-1 h-3 w-3" />
                                )}
                                {img.copied ? "Copied!" : "Copy"}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-destructive"
                                onClick={() => removeContentImage(imgIdx)}
                                data-ocid={`admin.content-image.delete_button.${imgIdx + 1}`}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => contentInputRef.current?.click()}
                      disabled={isUploadingContent}
                      data-ocid="admin.content-image.upload_button"
                    >
                      {isUploadingContent ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="mr-2 h-4 w-4" />
                      )}
                      {isUploadingContent && contentUploadProgress > 0
                        ? `${contentUploadProgress}%`
                        : "Upload Image(s)"}
                    </Button>
                    <input
                      ref={contentInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleContentImageUpload}
                    />
                  </div>
                </div>

                {/* Publication Settings */}
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Publication Settings
                  </h2>

                  <div className="flex items-center gap-3">
                    <Switch
                      id="publish-immediately"
                      checked={form.publishImmediately}
                      onCheckedChange={(checked) =>
                        setForm((f) => ({ ...f, publishImmediately: checked }))
                      }
                      data-ocid="admin.post.publish-immediately.switch"
                    />
                    <Label htmlFor="publish-immediately">
                      Publish Immediately
                    </Label>
                  </div>

                  {!form.publishImmediately && (
                    <div>
                      <Label htmlFor="publish-date">
                        Scheduled Publish Date
                      </Label>
                      <Input
                        id="publish-date"
                        type="date"
                        value={form.publishDate}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            publishDate: e.target.value,
                          }))
                        }
                        className="mt-1 max-w-xs"
                        data-ocid="admin.post.publish-date.input"
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pb-8">
                  <Button
                    onClick={() => handleSubmit(false)}
                    disabled={isPending}
                    variant="outline"
                    data-ocid="admin.post.save-draft.secondary_button"
                  >
                    {isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Save as Draft
                  </Button>
                  <Button
                    onClick={() =>
                      handleSubmit(
                        form.publishImmediately ? true : form.isPublished,
                      )
                    }
                    disabled={isPending}
                    className="bg-[oklch(0.42_0.14_155)] hover:bg-[oklch(0.35_0.14_155)] text-white"
                    data-ocid="admin.post.publish.primary_button"
                  >
                    {isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {editingPost ? "Update & Publish" : "Publish Post"}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      resetForm();
                      setActiveTab("posts");
                    }}
                    data-ocid="admin.post.cancel.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="admin.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.delete.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
