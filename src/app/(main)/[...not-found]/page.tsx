import Text from "@/components/ui/Text";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist",
};

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Text variant="bold-blue-22">Page Not Found</Text>
    </div>
  );
}
