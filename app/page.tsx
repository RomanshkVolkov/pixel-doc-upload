import SwitchTheme from '@/app/components/shared/SwitchTheme';
import MapFrame from './components/MapFrame';

export default function Home() {
   return (
      <div className="w-full flex flex-col justify-center items-center mt-10">
         <SwitchTheme />
         <MapFrame />
      </div>
   );
}
