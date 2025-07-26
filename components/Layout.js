import { useRouter } from 'next/router';
import ContactButton from './ContactButton';

export default function Layout({ children }) {
  const router = useRouter();
  const hideOnContactPage = router.pathname === '/kontakt-oss';

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
      {!hideOnContactPage && <ContactButton />}
    </div>
  );
}
