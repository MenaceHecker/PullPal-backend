export interface IUser {
  id: string;
  email: string;
  username: string;
  name?: string;
  avatar?: string;
  githubId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGithubUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
}