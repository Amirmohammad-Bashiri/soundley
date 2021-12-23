import Loader from "@components/loader";
import NoResult from "./no-result";

function SearchResults({ searchResult, isLoading }) {
  const result = searchResult?.data?.result;
  console.log(result);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[500px]">
          <Loader type="Oval" color="#D1D5DB" height={70} width={70} />
        </div>
      ) : result && result.length === 0 ? (
        <NoResult />
      ) : null}
    </div>
  );
}

export default SearchResults;
