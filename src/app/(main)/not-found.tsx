import Text from "@/components/ui/Text";

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
