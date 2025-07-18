import "./globals.css";
import { montserrat } from "@/lib/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
