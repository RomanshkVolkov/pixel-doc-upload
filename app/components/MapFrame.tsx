'use client';

import React, { useEffect, useState } from 'react';
import { Image, Input } from '@nextui-org/react';
import ReactCrop, { PixelCrop, type Crop } from 'react-image-crop';
import { MdFileUpload } from 'react-icons/md';
import { UrlObject } from 'url';

export default function MapFrame() {
   const [crop, setCrop] = useState<Crop>();
   const [image, setImage] = useState<UrlObject>();

   const size = 1000;
   const pixel = 10;
   const handleChangeCrop = (c: Crop) => {
      const { width: w, height: h, x: x1, y: y1, ...crop } = c;
      const step = 10;
      const x = Math.floor(x1 / step) * step;
      const y = Math.floor(y1 / step) * step;
      const width = Math.ceil(w / step) * step;
      const height = Math.ceil(h / step) * step;
      setCrop({ ...crop, x, y, width, height });
   };

   const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         //make url object
         const reader = new FileReader();
         const selectedArea = document.querySelector(
            '.ReactCrop__crop-selection'
         ) as HTMLElement;
         reader.onload = (e) => {
            const b64 = e.target?.result;
            if (selectedArea) {
               selectedArea.style.backgroundImage = `url(${b64})`;
               selectedArea.style.backgroundSize = 'cover';
               selectedArea.style.backgroundPosition = 'center';
               selectedArea.style.animation = 'none';
            }
         };
         reader.readAsDataURL(file);
      }
   };
   return (
      <>
         <div className="flex justify-center bg-background-100">
            <div className="fixed bottom-0 right-10">
               <Input
                  defaultValue={null as any}
                  value={null as any}
                  data-slot="start"
                  type="file"
                  startContent={<MdFileUpload />}
                  className="p-4"
                  accept="image/*"
                  onChange={handleUploadImage}
               />
            </div>
            <ReactCrop
               crop={crop}
               onChange={handleChangeCrop}
               minWidth={pixel}
               minHeight={pixel}>
               <Image
                  src="/images/pixel-dog.png"
                  width={`${size}px`}
                  height={`${size}px`}
                  alt="Pixel Dog"
                  classNames={{ img: 'inline-block z-1' }}
                  removeWrapper
                  radius="none"
               />
            </ReactCrop>
         </div>
      </>
   );
}
