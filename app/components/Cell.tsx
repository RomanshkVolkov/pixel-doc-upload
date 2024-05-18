'use client';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface CellHandlerOption {
   value: string;
   set: Dispatch<SetStateAction<string>>;
}
interface Props {
   handler: {
      current: CellHandlerOption;
      start: CellHandlerOption;
      end: CellHandlerOption;
   };
   shape: string;
   coords: string;
   href: string;
   size: number;
   alt: string;
}

export default function Cell(props: Props) {
   const { handler, shape, coords, href, size, alt } = props;
   const [x1, y1, x2, y2] = coords.split(',').map(Number); // Convert to numbers

   const handleSelected = (e: React.MouseEvent<HTMLAreaElement>) => {
      e.preventDefault();

      const { start, end } = handler;
      const [startX, startY] = start.value.split(',').map(Number);
      const [endX, endY] = end.value.split(',').map(Number);

      if (!start.value) {
         start.set(`${x1},${y1}`);
      } else if (!end.value) {
         end.set(`${x1},${y1}`);
         updateSelectedArea();
      } else {
         start.set(`${x1},${y1}`);
         end.set('');
         resetSelectedArea();
      }
   };

   const updateSelectedArea = () => {
      const selectedArea = document.getElementById('selected-area');
      if (selectedArea) {
         const left = handler.start.value.split(',')[0];
         const top = handler.start.value.split(',')[1];
         const width = Math.abs(x1 - Number(handler.end.value.split(',')[0]));
         const height = Math.abs(y1 - Number(handler.end.value.split(',')[1]));

         selectedArea.style.left = `${left}px`;
         selectedArea.style.top = `${top}px`;
         selectedArea.style.width = `${width}px`;
         selectedArea.style.height = `${height}px`;
      }
   };

   const resetSelectedArea = () => {
      const selectedArea = document.getElementById('selected-area');
      if (selectedArea) {
         selectedArea.style.width = '0px';
         selectedArea.style.height = '0px';
      }
   };

   useEffect(() => {
      if (handler.end.value) {
         updateSelectedArea();
      }
   }, [handler.end.value]); // Update whenever end value changes

   return (
      <area
         shape={shape}
         coords={coords}
         href="#"
         alt={alt}
         onClick={handleSelected}
         onMouseOver={() => handler.current.set(coords)}
      />
   );
}
