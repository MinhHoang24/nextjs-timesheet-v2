import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: "Timesheet",
  description: "Next.js + Tailwind CSS 2025",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
      </head>
      <body className="bg-[#e9e9e9]">
        {children}
      </body>
    </html>
  );
}