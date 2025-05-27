import { X } from "lucide-react";
import Link from "next/link";

const SearchForm = () => {
  return (
    <div className="searchpage__form">
      <div className="searchpage__form-icon">
        <Link href="/">
          <X strokeWidth={1} />
        </Link>
      </div>
      <div className="searchpage__form-input">
        <input type="text" className="bold-blue-17 " />
      </div>
    </div>
  );
};
export default SearchForm;
