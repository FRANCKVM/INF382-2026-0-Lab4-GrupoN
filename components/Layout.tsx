import React from 'react';
import { Home, Grid, Gift } from 'lucide-react';
import { Screen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  navigate: (screen: Screen) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeScreen, navigate }) => {
  const isTabScreen = [Screen.HOME, Screen.OPERATIONS, Screen.FOR_YOU].includes(activeScreen);

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative shadow-2xl overflow-hidden flex flex-col">
      <div className={`flex-1 overflow-y-auto no-scrollbar ${isTabScreen ? 'pb-20' : ''}`}>
        {children}
      </div>

      {isTabScreen && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center z-50">
          <button 
            onClick={() => navigate(Screen.HOME)}
            className={`flex flex-col items-center gap-1 ${activeScreen === Screen.HOME ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Home size={24} strokeWidth={activeScreen === Screen.HOME ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Inicio</span>
          </button>
          
          <button 
            onClick={() => navigate(Screen.OPERATIONS)}
            className={`flex flex-col items-center gap-1 ${activeScreen === Screen.OPERATIONS ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Grid size={24} strokeWidth={activeScreen === Screen.OPERATIONS ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Operaciones</span>
          </button>

          <button 
            onClick={() => navigate(Screen.FOR_YOU)}
            className={`flex flex-col items-center gap-1 ${activeScreen === Screen.FOR_YOU ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Gift size={24} strokeWidth={activeScreen === Screen.FOR_YOU ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Para ti</span>
          </button>
        </div>
      )}
    </div>
  );
};
