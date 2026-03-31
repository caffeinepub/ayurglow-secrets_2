import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ExternalBlob } from "../backend";
import type { AuthorProfile, BlogPost, Comment } from "../backend.d";
import { useActor } from "./useActor";

// ==================== POSTS ====================
export function useListPosts() {
  const { actor } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.listPosts();
    },
    enabled: !!actor,
    staleTime: 0,
    retry: 5,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function useListPostsByCategory(category: string) {
  const { actor } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["posts", "category", category],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.listPostsByCategory(category);
    },
    enabled: !!actor && !!category,
    staleTime: 0,
    retry: 5,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function useGetPost(id: string) {
  const { actor } = useActor();
  return useQuery<BlogPost>({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getPost(id);
    },
    enabled: !!actor && !!id,
    staleTime: 0,
    retry: 5,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

// ==================== COMMENTS ====================
export function useListComments(postId: string) {
  const { actor } = useActor();
  return useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.listComments(postId);
    },
    enabled: !!actor && !!postId,
    staleTime: 0,
    retry: 5,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function useAddComment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      postId,
      authorName,
      content,
    }: {
      postId: string;
      authorName: string;
      content: string;
    }) => {
      if (!actor) throw new Error("No actor available");
      return actor.addComment(postId, authorName, content);
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
}

// ==================== ADMIN MUTATIONS ====================
export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      category: string;
      subcategory: string;
      content: string;
      excerpt: string;
      tags: string[];
      isPublished: boolean;
      coverImage: ExternalBlob | null;
      contentImages: ExternalBlob[];
    }) => {
      if (!actor) throw new Error("No actor available");
      return actor.createPost(
        params.title,
        params.category,
        params.subcategory,
        params.content,
        params.excerpt,
        params.tags,
        params.isPublished,
        params.coverImage,
        params.contentImages,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useUpdatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: string;
      title: string;
      category: string;
      subcategory: string;
      content: string;
      excerpt: string;
      tags: string[];
      isPublished: boolean;
      coverImage: ExternalBlob | null;
      contentImages: ExternalBlob[];
    }) => {
      if (!actor) throw new Error("No actor available");
      return actor.updatePost(
        params.id,
        params.title,
        params.category,
        params.subcategory,
        params.content,
        params.excerpt,
        params.tags,
        params.isPublished,
        params.coverImage,
        params.contentImages,
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", data.id] });
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor available");
      return actor.deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

// ==================== AUTHOR PROFILE ====================
export function useGetAuthorProfile() {
  const { actor } = useActor();
  return useQuery<AuthorProfile>({
    queryKey: ["authorProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getAuthorProfile();
    },
    enabled: !!actor,
    staleTime: 0,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
  });
}

export function useSetAuthorProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      bio: string;
      title: string;
    }) => {
      if (!actor) throw new Error("No actor available");
      return actor.setAuthorProfile(params.name, params.bio, params.title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authorProfile"] });
    },
  });
}

export function useGetPostExpertise(postId: string | null) {
  const { actor } = useActor();
  return useQuery<string>({
    queryKey: ["postExpertise", postId],
    queryFn: async () => {
      if (!actor || !postId) return "";
      return actor.getPostExpertise(postId);
    },
    enabled: !!actor && !!postId,
    staleTime: 0,
    // Prevent background refetches from interfering with in-progress edits
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
  });
}

export function useSetPostExpertise() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { postId: string; expertise: string }) => {
      if (!actor) throw new Error("No actor available");
      return actor.setPostExpertise(params.postId, params.expertise);
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["postExpertise", postId] });
    },
  });
}
