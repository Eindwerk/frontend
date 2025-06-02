import ClientAppFrame from "@/components/layout/ClientAppFrame";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientAppFrame>{children}</ClientAppFrame>
      </body>
    </html>
  );
}
