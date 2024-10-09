import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster"
import SideMenu from '@/components/SideMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inventory Management',
  description: 'Track hardware and software inventory',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <div className="flex h-screen">
          <SideMenu />
          <main className="flex-1 overflow-auto pl-16">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}