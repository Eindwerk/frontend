import { ArrowRight, Box, Landmark, UserRound } from "lucide-react";
import Link from "next/link";
import Text from "./Text";

interface SearchResultProps {
  text: string;
  link: string;
  type: "user" | "team" | "stadium";
}

export default function SearchResult({ text, link, type }: SearchResultProps) {
  const renderIcon = () => {
    switch (type) {
      case "user":
        return <UserRound strokeWidth={2} />;
      case "team":
        return <Box strokeWidth={2} />;
      case "stadium":
        return <Landmark strokeWidth={2} />;
      default:
        return <Box strokeWidth={2} />;
    }
  };

  return (
    <Link href={link}>
      <div className="search-result">
        <div className="search-result__icon">{renderIcon()}</div>
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
