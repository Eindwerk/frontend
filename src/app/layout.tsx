import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "@/styles/styles.scss";

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
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
