import SearchResult from "../ui/SearchResult";

const SearchList = () => {
  return (
    <div className="searchpage__list">
      <SearchResult text="User Profile" link="/profile/user" type="user" />
      <SearchResult text="Team Profile" link="/profile/team" type="team" />
      <SearchResult
        text="Stadium Profile"
        link="/profile/stadium"
        type="stadium"
      />
    </div>
  );
};

export default SearchList;
