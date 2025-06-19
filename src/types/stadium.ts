export interface Stadium {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  latitude: number;
  longitude: number;
  banner_image?: string;
  team_id: number;
  profile_image?: string;
}
