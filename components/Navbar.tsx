import React from 'react';
import { Menu, Satellite } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection }) => {
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'context', label: 'Problem' },
    { id: 'methodology', label: 'Architecture' },
    { id: 'results', label: 'Performance' },
    { id: 'demo', label: 'Interactive' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Satellite className="h-6 w-6 text-cyan-400" />
            <span className="font-bold text-lg tracking-tight text-white">SAR<span className="text-cyan-400">SegFormer</span></span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-cyan-400 bg-slate-900 border border-slate-800'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button className="bg-slate-900 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};