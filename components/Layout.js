import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  const hideOnContactPage = router.pathname === '/kontakt';

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Elråd logo" width={130} height={60} />
        </div>
        <nav className="flex gap-6 text-black font-medium">
          <Link href="/">Hjem</Link>
          <Link href="/om">Om Elråd</Link>
          <Link href="/priser">Priser</Link>
          <Link href="/kontakt">Kontakt oss</Link>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center flex-grow bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 p-4">
        {children}
      </main>

      {!hideOnContactPage && (
        <div className="w-full flex justify-center p-6 bg-white">
          <Link href="/kontakt">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-4 rounded-lg shadow-md text-center max-w-xl w-full">
              Trenger du fortsatt hjelp? Få personlig veiledning fra en autorisert elektroinstallatør.
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
