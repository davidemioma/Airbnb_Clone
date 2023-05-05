import Navbar from "./components/Navbar";
import Register from "./components/modals/Register";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
import Login from "./components/modals/Login";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />

        <Navbar />

        <Register />

        <Login />

        {children}
      </body>
    </html>
  );
}
