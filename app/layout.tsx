import Navbar from "./components/Navbar";
import Register from "./components/modals/Register";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
import Login from "./components/modals/Login";
import { getCurrentUser } from "./actions/getCurrentUser";
import Categories from "./components/categories/Categories";
import Rent from "./components/modals/Rent";
import ClientOnly from "./components/ClientsOnly";

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
        <ClientOnly>
          <ToasterProvider />

          <div>
            <Navbar currentUser={currentUser} />

            <Categories />
          </div>

          <Register />

          <Login />

          <Rent />
        </ClientOnly>

        <main className="py-5">{children}</main>
      </body>
    </html>
  );
}
