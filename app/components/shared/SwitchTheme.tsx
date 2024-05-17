'use client';

import { Button, Spinner, Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { ImSun } from 'react-icons/im';
import { BsMoonStars } from 'react-icons/bs';

export default function SwitchTheme() {
   const [mounted, setMounted] = useState(false);
   const { theme, setTheme } = useTheme();

   useEffect(() => {
      setMounted(true);
   }, []);

   const toggleTheme = (value: boolean) => {
      const theme = value ? 'light' : 'dark';
      setTheme(theme);
   };

   const sun = <ImSun size={18} />;
   const moon = <BsMoonStars size={18} />;

   return (
      <div className="fixed flex justify-center items-center top-5 right-10 z-50">
         {mounted ? (
            <Switch
               size="lg"
               isSelected={theme === 'light'}
               onChange={(e) => toggleTheme(e.target.checked)}
               endContent={moon}
               startContent={sun}
            />
         ) : (
            <Spinner />
         )}
      </div>
   );
}
