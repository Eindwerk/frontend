import { ArrowRight, User, Users, Box } from "lucide-react";
import Link from "next/link";

import Text from "./Text";

// TODO: door mate van type render correcte icon

interface SearchResultProps {
  text: string;
  link: string;
}

export default function SearchResult({ text, link }: SearchResultProps) {
  return (
    <Link href={link}>
      <div className="search-result">
        <div className="search-result__icon">
          <Box strokeWidth={2} />
        </div>
        <div className="search-result__text">
          <Text variant="bold-blue-17">{text}</Text>
        </div>
        <div className="search-result__redirect">
          <ArrowRight strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
}
