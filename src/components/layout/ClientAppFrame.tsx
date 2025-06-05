"use client";

import "@/styles/styles.scss";
import "leaflet/dist/leaflet.css";
import { NotificationProvider } from "@/context/NotificationContext";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientAppFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationProvider>
      <div className="app-wrapper">
        <div className="app-holder">
          <Header />
          <div className="app-container">{children}</div>
          <Footer />
        </div>
      </div>
    </NotificationProvider>
  );
}
