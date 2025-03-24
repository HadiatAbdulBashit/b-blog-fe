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
  author: Author;
  id: string;
  createdAt: string;
  title: string;
  content: string | undefined;
};

export type Author = {
  email: string | undefined;
  id: string | undefined;
  name: string;
};
