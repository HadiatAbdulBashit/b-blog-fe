export type Register = {
  name: string;
  email: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
  remember: boolean;
};

export type Article = {
  author: Author | undefined;
  id: string | undefined;
  createdAt: string | undefined;
  title: string;
  content: string | undefined;
};

export type NewArticle = {
  title: string;
  content: string;
};

export type EditArticle = {
  title: string | undefined;
  content: string | undefined;
};

export type Author = {
  email: string | undefined;
  id: string | undefined;
  name: string;
};

export type NewComment = {
  postId: string | undefined;
  content: string;
};

export type Comment = {
  id: string;
  postId: string;
  content: string;
  createdAt: string;
  author: Author;
};

export type EditComment = {
  content: string;
};
