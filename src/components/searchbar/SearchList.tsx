import SearchResult from "../ui/SearchResult";

const SearchList = () => {
  return (
    <div className="searchpage__list">
      <SearchResult text="User Profile" link="/search" />
      <SearchResult text="Team Profile" link="/search" />
      <SearchResult text="Stadium Profile" link="/search" />
    </div>
  );
};
export default SearchList;
