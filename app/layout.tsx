import "./globals.css";
import { ApplicationProvider } from "@/contexts/ApplicationContext";
import NonceProvider from "@/providers/NonceProvider";
import AmplifyConfig from "@/components/shared/AmplifyConfig";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const dynamic = "force-dynamic";

// SSR logic: get nonce from headers
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const reqHeaders = await headers();
  const nonce = reqHeaders.get("x-nonce");

  return (
    <html lang="pt-BR" data-theme="fantasy" data-testid="root-layout">
      <body
        className={`${inter.variable} ${inter.className} min-h-screen m-0 p-0`}
        data-testid="body-layout"
      >
        <NonceProvider nonce={nonce}>
          <ApplicationProvider>
            {children}
          </ApplicationProvider>
        </NonceProvider>
      </body>
    </html>
  );
}
