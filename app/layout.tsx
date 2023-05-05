import Navbar from "./components/Navbar";
import Register from "./components/modals/Register";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
import Login from "./components/modals/Login";
import { getCurrentUser } from "./actions/getCurrentUser";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />

        <Navbar currentUser={currentUser} />

        <Register />

        <Login />

        {children}
      </body>
    </html>
  );
}
