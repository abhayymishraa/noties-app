import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import { ClerkProvider, auth } from '@clerk/nextjs'
import prisma from "./lib/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NOTIES",
  description: "A easy note making app developed in nextJs",
};

async function getData(userId :string )  {
  if(userId){
 const data = await prisma.user.findUnique({
  where:{
    id: userId
  },
  select:{
    colorScheme:true
  }
 })
  return data}
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {userId} = auth()
  const data  = await getData(userId as string)
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className}  ${data?.colorScheme ?? "theme-orange"} `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
