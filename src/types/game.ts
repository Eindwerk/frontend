import { Stadium } from "./stadium";
import { Team } from "./team";

export interface Game {
  id: number;
  stadium_id: number;
  home_team_id: number;
  away_team_id: number;
  match_date: string;
  created_at: string;
  updated_at: string;
  stadium: Stadium;
  home_team: Team;
  away_team: Team;
}
