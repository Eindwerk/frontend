import "@/styles/styles.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="auth-layout">{children}</div>
      </body>
    </html>
  );
}
