import { montserrat } from './ui/fonts';
import './ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${montserrat.className} antialiased h-full min-h-screen bg-gradient-to-tr from-gray-950 to-gray-800 text-white overflow-auto relative`}
      >
        {/* Círculos decorativos */}
        <div className="pointer-events-none fixed bottom-[-150px] left-[-100px] w-[400px] h-[400px] bg-purple-700 opacity-30 blur-3xl rounded-full z-0 animate-float-blob" />
        <div className="pointer-events-none fixed top-[-100px] right-[-80px] w-[300px] h-[300px] bg-indigo-500 opacity-25 blur-3xl rounded-full z-0 animate-float-blob" />

        {/* Contenido principal */}
        <main className="relative z-10 min-h-screen">{children}</main>
      </body>
    </html>
  );
}



