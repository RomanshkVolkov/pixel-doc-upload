'use client';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';

export default function Providers({ children }: { children: React.ReactNode }) {
   const { push } = useRouter();
   return (
      <NextUIProvider navigate={push}>
         <ThemeProvider attribute="class" defaultTheme="dark">
            <main className="bg-background text-foreground">{children}</main>
         </ThemeProvider>
      </NextUIProvider>
   );
}
