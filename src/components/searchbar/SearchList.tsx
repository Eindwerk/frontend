import { getAllStadiums } from "@/lib/actions/getAllStadiums";
import { getAllTeams } from "@/lib/actions/getAllTeams";
import { getAllUsers } from "@/lib/actions/getAllUsers";
import { slugify } from "@/lib/utils/slugify";
import SearchResult from "../ui/SearchResult";

const SearchList = async ({ search }: { search: string }) => {
  const trimmed = (search ?? "").trim();

  if (!trimmed) {
    return null;
  }

  const teamData = await getAllTeams();
  const stadiumData = await getAllStadiums();
  const userData = await getAllUsers();

  return (
    <div className="searchpage__list">
      {userData
        .filter((u) => u.name.toLowerCase().includes(trimmed.toLowerCase()))
        .map((user) => (
          <SearchResult
            key={user.id}
            text={user.name}
            link={`/profile/user/${user.id}/${slugify(user.name)}`}
            type="user"
          />
        ))}

      {teamData
        .filter((t) => t.name.toLowerCase().includes(trimmed.toLowerCase()))
        .map((team) => (
          <SearchResult
            key={team.id}
            text={team.name}
            link={`/profile/team/${team.id}/${slugify(team.name)}`}
            type="team"
          />
        ))}

      {stadiumData
        .filter((s) => s.name.toLowerCase().includes(trimmed.toLowerCase()))
        .map((stadium) => (
          <SearchResult
            key={stadium.id}
            text={stadium.name}
            link={`/profile/stadium/${stadium.id}/${slugify(stadium.name)}`}
            type="stadium"
          />
        ))}
    </div>
  );
};

export default SearchList;
