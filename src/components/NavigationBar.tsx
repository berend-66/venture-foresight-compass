
import React from 'react';
import { cn } from '@/lib/utils';

interface NavigationBarProps {
  currentScreen: 'upload' | 'visualization' | 'dashboard';
  onNavigate: (screen: 'upload' | 'visualization' | 'dashboard') => void;
  uploadComplete: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ 
  currentScreen, 
  onNavigate,
  uploadComplete
}) => {
  const navItems = [
    { 
      id: 'upload' as const, 
      label: 'Pitch Upload', 
      enabled: true 
    },
    { 
      id: 'visualization' as const, 
      label: 'Similarity Visualization', 
      enabled: uploadComplete 
    },
    { 
      id: 'dashboard' as const, 
      label: 'Analytics Dashboard', 
      enabled: uploadComplete 
    }
  ];

  return (
    <nav className="px-6 py-4 border-b border-venture-gray-300">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-lg text-venture-blue-900">
            Venture Foresight Compass
          </span>
        </div>
        
        <ul className="flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => item.enabled && onNavigate(item.id)}
                disabled={!item.enabled}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  currentScreen === item.id
                    ? "bg-venture-blue-800 text-white"
                    : item.enabled
                    ? "text-venture-blue-800 hover:bg-venture-gray-200"
                    : "text-venture-gray-400 cursor-not-allowed"
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
