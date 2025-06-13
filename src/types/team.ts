import { Competition } from "./competition";

export interface Team {
  id: number;
  name: string;
  league: Competition;
  logo_url: string | null;
  banner_image: string | null;
}
