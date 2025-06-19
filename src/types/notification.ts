export interface Notification {
  id: number;
  type: "like" | "friend_post";
  sender_id: number;
  username?: string; // wordt opgehaald via sender_id
  user_id: number; // de ontvanger van de notificatie
  post_id?: number;
  game_id?: number;
  created_at: string;
  updated_at: string;
}
