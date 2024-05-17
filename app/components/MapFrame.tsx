'use client';

import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import { Image, Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';

export default function MapFrame() {
   const [currentCell, setCurrentCell] = useState<string>('');
   const [startSelected, setStartSelected] = useState<string>('');
   const [endSelected, setEndSelected] = useState<string>('');

   const handleSelectWithHref = (x: number, y: number) => {
      return `?x=${x}&y=${y}`;
   };
   const width = 1000;
   const height = 1000;
   const pixel = 10;
   const rows = height / pixel;
   const cols = width / pixel;

   const handler = {
      current: {
         value: currentCell,
         set: setCurrentCell,
      },
      start: {
         value: startSelected,
         set: setStartSelected,
      },
      end: {
         value: endSelected,
         set: setEndSelected,
      },
   };

   return (
      <>
         <div className="w-full mb-10 px-32">
            <div className="grid grid-cols-4 gap-4 ">
               <Input type="text" placeholder="x" value={startSelected} />
               <Input type="text" placeholder="y" value={endSelected} />
               <Input type="number" placeholder="width" />
               <Input type="number" placeholder="height" />
            </div>
         </div>
         <Image
            src="/images/pixel-dog.png"
            className="pixel-image"
            useMap="#pixel-area"
            width={1000}
            height={1000}
            alt="pixel-dog"
         />
         <map id="pixel-area" name="pixel-area">
            <div className="w-full flex justify-center absolute bg-background z-50 top-[-20px]">
               {currentCell}
            </div>
            {Array.from({ length: rows }, (_, row) =>
               Array.from({ length: cols }, (_, col) => {
                  const x1 = row * pixel;
                  const y1 = col * pixel;
                  const x2 = x1 + pixel;
                  const y2 = y1 + pixel;
                  return (
                     <Cell
                        handler={handler}
                        key={`${row}-${col}`}
                        shape="rect"
                        coords={[x1, y1, x2, y2].join(',')}
                        size={pixel}
                        href={'#'}
                        alt="pixel"
                     />
                  );
               })
            )}
         </map>
      </>
   );
}
