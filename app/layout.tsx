import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { participantNames } from "./constants";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NHL Playoffs Pool",
  description: "NHL playoffs pool tracker (may not be reliable)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center`}
      >
        <div className="flex flex-col gap-4 items-center sm:items-start ">
          <ul className="flex flex-col gap-16 border rounded-r-xl rounded-l-none border-slate-300 rounded-lg p-4 h-full overflow-y-auto">
            {participantNames.map((participant) => {
              return (
                <li key={participant} className="text-lg font-bold">
                  <Link
                    href={`/participant/${participant}`}
                    className="text-slate-400 hover:text-slate-600 transition-colors duration-200 ease-in-out"
                  >
                    {/* Capitalize */}
                    {participant.slice(0, 1).toUpperCase() +
                      participant.slice(1).toLowerCase()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {children}
      </body>
    </html>
  );
}
