"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

const SearchForm = ({ search }: { search: string }) => {
  const router = useRouter();
  const [value, setValue] = useState(search || "");
  const [, startTransition] = useTransition();

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTransition(() => {
        router.push(`/search?search=${value}`);
      });
    }, 250);

    return () => clearTimeout(timeout);
  }, [value, router]);

  return (
    <div className="searchpage__form">
      <div className="searchpage__form-icon">
        <Link href="/">
          <X strokeWidth={1} />
        </Link>
      </div>
      <div className="searchpage__form-input">
        <input
          type="text"
          className="bold-blue-17"
          name="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default SearchForm;
