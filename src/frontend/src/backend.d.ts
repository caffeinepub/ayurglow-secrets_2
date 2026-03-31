import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface AuthorProfile {
    name: string;
    bio: string;
    title: string;
}
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    isPublished: boolean;
    subcategory: string;
    tags: Array<string>;
    publishedAt?: Time;
    coverImage?: ExternalBlob;
    excerpt: string;
    category: Category;
    contentImages: Array<ExternalBlob>;
}
export type Time = bigint;
export interface Comment {
    content: string;
    createdAt: Time;
    authorName: string;
    postId: string;
}
export enum Category {
    hair = "hair",
    skin = "skin",
    chronic = "chronic",
    lifestyle = "lifestyle",
    health = "health"
}
export interface backendInterface {
    addComment(postId: string, authorName: string, content: string): Promise<Comment>;
    createPost(title: string, category: string, subcategory: string, content: string, excerpt: string, tags: Array<string>, isPublished: boolean, coverImage: ExternalBlob | null, contentImages: Array<ExternalBlob>): Promise<BlogPost>;
    deletePost(id: string): Promise<void>;
    getAuthorProfile(): Promise<AuthorProfile>;
    getCategories(): Promise<Array<string>>;
    getPost(id: string): Promise<BlogPost>;
    getPostExpertise(postId: string): Promise<string>;
    listComments(postId: string): Promise<Array<Comment>>;
    listPosts(): Promise<Array<BlogPost>>;
    listPostsByCategory(category: string): Promise<Array<BlogPost>>;
    listPostsBySubcategory(subcategory: string): Promise<Array<BlogPost>>;
    setAuthorProfile(name: string, bio: string, title: string): Promise<void>;
    setPostExpertise(postId: string, expertise: string): Promise<void>;
    updatePost(id: string, title: string, category: string, subcategory: string, content: string, excerpt: string, tags: Array<string>, isPublished: boolean, coverImage: ExternalBlob | null, contentImages: Array<ExternalBlob>): Promise<BlogPost>;
}
