import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { defaultFont } from '@/utils/fonts';
import 'react-image-crop/dist/ReactCrop.css';

export const metadata: Metadata = {
   title: 'Lets Celebrate!',
   description: 'Lets Celebrate!',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="es">
         <body className={defaultFont.className}>
            <Providers>{children}</Providers>
         </body>
      </html>
   );
}
