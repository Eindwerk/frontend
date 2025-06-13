import { Team } from "./team";

export interface Stadium {
  id: number;
  name: string;
  team_name: Team["name"];
  profile_image: string | null;
  banner_image: string | null;
  location: {
    latitude: number;
    altitude: number;
  };
}
