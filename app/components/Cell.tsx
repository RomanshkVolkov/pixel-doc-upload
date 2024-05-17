'use client';
import { Tooltip } from '@nextui-org/react';
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
   const [x, y] = coords.split(',');

   const handleSelected = (e: any) => {
      const target = e.target as HTMLElement;
      const area = document.getElementById('pixel-area');
      const selected = document.querySelectorAll('.selected');

      target.classList.toggle('selected');
      if (selected.length >= 2) {
         selected.forEach((item) => {
            item.classList.remove('selected');
         });
      } else if (selected.length === 1 && target.classList.contains('selected')) {
         const startArea = selected[0].previousElementSibling;
         const endArea = target.previousElementSibling;
         if (startArea && endArea) {
            const startCoords = startArea.getAttribute('coords');
            const endCoords = endArea.getAttribute('coords');
            if (!startCoords || !endCoords) return;
            const [startX, startY] = startCoords.split(',');
            const [endX, endY] = endCoords.split(',');
            handler.start.set(`${startX},${startY}`);
            const x = Math.min(parseInt(startX), parseInt(endX));
            const y = Math.min(parseInt(startY), parseInt(endY));
            const width = Math.abs(parseInt(startX) - parseInt(endX));
            const height = Math.abs(parseInt(startY) - parseInt(endY));
            const cells = document.querySelectorAll('.pixel-cell');
            cells.forEach((cell) => {
               const cellX = parseInt(cell.getAttribute('x') || '');
               const cellY = parseInt(cell.getAttribute('y') || '');
               if (
                  cellX >= x &&
                  cellX <= x + width &&
                  cellY >= y &&
                  cellY <= y + height
               ) {
                  cell.classList.add('selected');
               }
            });
            const imgBg = document.createElement('div');
            imgBg.classList.add('img-bg');
            imgBg.style.top = `${y}px`;
            imgBg.style.left = `${x}px`;
            imgBg.style.width = `${width}px`;
            imgBg.style.height = `${height}px`;

            const img = document.createElement('img');
            img.src = '/images/background.webp';

            imgBg.appendChild(img);
            area!.appendChild(imgBg);
         }
      }
   };

   return (
      <>
         <area
            shape={shape}
            coords={coords}
            href={href}
            alt={alt}
            onClick={handleSelected}
         />
         {/* <rect
            onMouseOver={() => handler.current.set(coords)}
            id={`pixel-${x}-${y}`}
            className="pixel-cell"
            x={x}
            y={y}
            width={`${size}px`}
            height={`${size}px`}
            fill="none"
            stroke="black"
            style={{ top: `${y}px`, left: `${x}px`, position: 'absolute' }}
            onClick={handleSelected}
         /> */}
      </>
   );
}
