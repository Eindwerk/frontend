import { getAllSearchData } from "@/lib/actions/getAllSearchData";
import { slugify } from "@/lib/utils/slugify";
import SearchResult from "../ui/SearchResult";

const SearchList = async ({ search }: { search: string }) => {
  const trimmed = (search ?? "").trim();

  if (!trimmed) return null;

  const { teams, stadiums, users } = await getAllSearchData();

  return (
    <div className="searchpage__list">
      {users
        .filter((u) => u.name.toLowerCase().includes(trimmed.toLowerCase()))
        .map((user) => (
          <SearchResult
            key={user.id}
            text={user.name}
            link={`/profile/user/${user.id}/${slugify(user.name)}`}
            type="user"
          />
        ))}

      {teams
        .filter((t) => t.name.toLowerCase().includes(trimmed.toLowerCase()))
        .map((team) => (
          <SearchResult
            key={team.id}
            text={team.name}
            link={`/profile/team/${team.id}/${slugify(team.name)}`}
            type="team"
          />
        ))}

      {stadiums
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
