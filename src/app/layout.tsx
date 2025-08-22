import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies, headers } from "next/headers";
import { I18nProvider } from "@/i18n/I18nContext";
import { UserProvider } from "@/providers/UserProvider";
import { auth } from "@/lib/session";
import type { Lang } from "@/i18n/translations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AXCEL",
  description: "Accelerate your excellence",
};

function isLang(v: unknown): v is Lang {
  return v === "en" || v === "zh-TW";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies(); // <-- await
  const headerList = await headers(); // <-- await

  const cookieLang = cookieStore.get("lang")?.value;
  const accept = headerList.get("accept-language") ?? "";

  // language
  const inferred: Lang = accept.toLowerCase().startsWith("zh") ? "zh-TW" : "en";
  const initialLang: Lang =
    (isLang(cookieLang) ? cookieLang : undefined) ?? inferred;

  // user
  const session = await auth();
  const initialUser = session ? { id: session.userId } : null;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider initialUser={initialUser}>
          <I18nProvider initialLang={initialLang}>{children}</I18nProvider>
        </UserProvider>
      </body>
    </html>
  );
}
