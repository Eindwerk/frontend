import SearchList from "@/components/searchbar/SearchList";
import SearchForm from "@/components/searchbar/SearchForm";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) => {
  const { search } = await searchParams;
  return (
    <form className="searchpage">
      <SearchList search={search} />
      <SearchForm search={search} />
    </form>
  );
};
export default SearchPage;
