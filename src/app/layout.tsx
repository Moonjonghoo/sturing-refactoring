import Header from '@/components/common/Header';
import './globals.css';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="w-screen overflow-x-hidden border border-black max-w-screen-md m-auto relative">
        <Header />
        {children}
      </body>
    </html>
  );
}
