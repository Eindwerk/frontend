"use client";

import "@/styles/styles.scss";
import "leaflet/dist/leaflet.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { NotificationProvider } from "@/context/NotificationContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NotificationProvider>
          <div className="app-holder">
            <Header />
            <div className="app-container">{children}</div>
            <Footer />
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}
