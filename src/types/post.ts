import { Game } from "./game";
import { Comment } from "./comment";
import { Likes } from "./likes";

export interface Post {
  id: number;
  user_id: number;
  game: Game;
  comments: Comment[] | null;
  likes: Likes[];
  image: string;
  title: string;
  created_at: string;
  updated_at: string;
}
