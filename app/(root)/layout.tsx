import Image from 'next/image';
import { Toaster } from '@/components/ui/toaster';

import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import MobileMenu from '@/components/MobileMenu';
import PodcastPlayer from '@/components/PodcastPlayer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative w-full flex justify-between bg-black-3 max-w-screen-2xl ml-auto mr-auto">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
              <Image
                src="/icons/logo.png"
                width={30}
                height={30}
                alt="menu icon"
              />
              <MobileMenu />
            </div>
            <div className="flex flex-col md:pb-14">
              <Toaster />

              {children}
            </div>
          </div>
        </section>
        <RightSidebar />
      </main>

      <PodcastPlayer />
    </div>
  );
}
