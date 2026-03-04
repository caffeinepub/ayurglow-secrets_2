import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Storage "blob-storage/Storage";

module {
  // Old types
  type OldBlogPost = {
    id : Text;
    title : Text;
    category : Category;
    subcategory : Text;
    content : Text;
    excerpt : Text;
    tags : [Text];
    isPublished : Bool;
    publishedAt : ?Int;
    coverImage : ?Storage.ExternalBlob;
    contentImages : [Storage.ExternalBlob];
  };

  type OldComment = {
    postId : Text;
    authorName : Text;
    content : Text;
    createdAt : Int;
  };

  type Category = {
    #health;
    #skin;
    #hair;
    #lifestyle;
    #chronic;
  };

  type OldActor = {
    blogPosts : Map.Map<Text, OldBlogPost>;
    comments : Map.Map<Text, List.List<OldComment>>;
    nextPostId : Nat;
  };

  // New types
  type NewBlogPost = {
    id : Text;
    title : Text;
    category : Category;
    subcategory : Text;
    content : Text;
    excerpt : Text;
    tags : [Text];
    isPublished : Bool;
    publishedAt : ?Int;
    coverImage : ?Storage.ExternalBlob;
    contentImages : [Storage.ExternalBlob];
  };

  type NewComment = {
    postId : Text;
    authorName : Text;
    content : Text;
    createdAt : Int;
  };

  type NewActor = {
    blogPosts : Map.Map<Text, NewBlogPost>;
    comments : Map.Map<Text, List.List<NewComment>>;
    nextPostId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let newBlogPosts = old.blogPosts.map<Text, OldBlogPost, NewBlogPost>(
      func(_id, oldPost) {
        oldPost;
      }
    );

    let newComments = old.comments.map<Text, List.List<OldComment>, List.List<NewComment>>(
      func(_id, oldCommentList) {
        oldCommentList.map<OldComment, NewComment>(func(oldComment) { oldComment });
      }
    );

    {
      blogPosts = newBlogPosts;
      comments = newComments;
      nextPostId = old.nextPostId;
    };
  };
};
