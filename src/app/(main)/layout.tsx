import "@/styles/styles.scss";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-holder">
          <Header />
          <div className="app-container">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
