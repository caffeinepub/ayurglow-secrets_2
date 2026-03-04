import Array "mo:core/Array";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Migration "migration";

import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

(with migration = Migration.run)
actor {
  include MixinStorage();

  type BlogPost = {
    id : Text;
    title : Text;
    category : Category;
    subcategory : Text;
    content : Text;
    excerpt : Text;
    tags : [Text];
    isPublished : Bool;
    publishedAt : ?Time.Time;
    coverImage : ?Storage.ExternalBlob;
    contentImages : [Storage.ExternalBlob];
  };

  module BlogPost {
    public func compare(post1 : BlogPost, post2 : BlogPost) : Order.Order {
      Text.compare(post1.id, post2.id);
    };
  };

  type Comment = {
    postId : Text;
    authorName : Text;
    content : Text;
    createdAt : Time.Time;
  };

  module Comment {
    public func compare(comment1 : Comment, comment2 : Comment) : Order.Order {
      switch (Int.compare(comment1.createdAt, comment2.createdAt)) {
        case (#equal) { Text.compare(comment1.authorName, comment2.authorName) };
        case (order) { order };
      };
    };
  };

  type Category = {
    #health;
    #skin;
    #hair;
    #lifestyle;
    #chronic;
  };

  var nextPostId = 2;

  let blogPosts = Map.empty<Text, BlogPost>();
  let comments = Map.empty<Text, List.List<Comment>>();

  func textToCategory(text : Text) : Category {
    switch (text) {
      case ("health") { #health };
      case ("skin") { #skin };
      case ("hair") { #hair };
      case ("lifestyle") { #lifestyle };
      case ("chronic") { #chronic };
      case (_) { Runtime.trap("Unknown category") };
    };
  };

  let samplePost : BlogPost = {
    id = "1";
    title = "Best Ayurvedic Herbs for Glowing Skin";
    category = textToCategory("skin");
    subcategory = "Natural Glow";
    content = "Discover the power of Turmeric, Neem, Sandalwood, Aloe Vera, and Saffron for achieving naturally radiant skin. These ancient Ayurvedic herbs offer proven benefits for skin clarity, tone, and overall glow.";
    excerpt = "Explore top Ayurvedic herbs for glowing skin - Turmeric, Neem, Sandalwood, Aloe Vera, and Saffron. Enhance your natural beauty with these time-tested remedies.";
    tags = ["herbs", "skin", "natural glow", "ayurveda"];
    isPublished = true;
    publishedAt = ?Time.now();
    coverImage = null;
    contentImages = [];
  };

  blogPosts.add(samplePost.id, samplePost);

  public shared ({ caller }) func createPost(title : Text, category : Text, subcategory : Text, content : Text, excerpt : Text, tags : [Text], isPublished : Bool, coverImage : ?Storage.ExternalBlob, contentImages : [Storage.ExternalBlob]) : async BlogPost {
    let postId = nextPostId.toText();
    nextPostId += 1;

    let categoryEnum = textToCategory(category);

    let publishedAt = if (isPublished) {
      ?Time.now();
    } else {
      null;
    };

    let post : BlogPost = {
      id = postId;
      title;
      category = categoryEnum;
      subcategory;
      content;
      excerpt;
      tags;
      isPublished;
      publishedAt;
      coverImage;
      contentImages;
    };

    blogPosts.add(postId, post);
    post;
  };

  public shared ({ caller }) func updatePost(id : Text, title : Text, category : Text, subcategory : Text, content : Text, excerpt : Text, tags : [Text], isPublished : Bool, coverImage : ?Storage.ExternalBlob, contentImages : [Storage.ExternalBlob]) : async BlogPost {
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Post not found") };
      case (?post) {
        let categoryEnum = textToCategory(category);

        let publishedAt = if (isPublished and not post.isPublished) {
          ?Time.now();
        } else {
          post.publishedAt;
        };

        let updatedPost : BlogPost = {
          id;
          title;
          category = categoryEnum;
          subcategory;
          content;
          excerpt;
          tags;
          isPublished;
          publishedAt;
          coverImage;
          contentImages;
        };

        blogPosts.add(id, updatedPost);
        updatedPost;
      };
    };
  };

  public shared ({ caller }) func deletePost(id : Text) : async () {
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Post not found") };
      case (?_) {
        blogPosts.remove(id);
      };
    };
  };

  public query ({ caller }) func getPost(id : Text) : async BlogPost {
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Post not found") };
      case (?post) { post };
    };
  };

  public query ({ caller }) func listPosts() : async [BlogPost] {
    blogPosts.values().toArray().sort();
  };

  public query ({ caller }) func listPostsByCategory(category : Text) : async [BlogPost] {
    let categoryEnum = textToCategory(category);

    blogPosts.filter(
      func(_, post) {
        post.category == categoryEnum;
      }
    ).values().toArray().sort();
  };

  public query ({ caller }) func listPostsBySubcategory(subcategory : Text) : async [BlogPost] {
    blogPosts.filter(
      func(_, post) {
        Text.equal(post.subcategory, subcategory);
      }
    ).values().toArray().sort();
  };

  public shared ({ caller }) func addComment(postId : Text, authorName : Text, content : Text) : async Comment {
    switch (blogPosts.get(postId)) {
      case (null) { Runtime.trap("Post not found") };
      case (?_) {
        let comment : Comment = {
          postId;
          authorName;
          content;
          createdAt = Time.now();
        };

        let postComments = switch (comments.get(postId)) {
          case (null) { List.empty<Comment>() };
          case (?existing) { existing };
        };

        postComments.add(comment);
        comments.add(postId, postComments);

        comment;
      };
    };
  };

  public query ({ caller }) func listComments(postId : Text) : async [Comment] {
    switch (comments.get(postId)) {
      case (null) { [] };
      case (?commentList) {
        commentList.reverse().toArray();
      };
    };
  };

  public query ({ caller }) func getCategories() : async [Text] {
    ["health", "skin", "hair", "lifestyle", "chronic"];
  };
};
