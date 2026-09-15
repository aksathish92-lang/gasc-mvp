import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { COLLEGE, NAV_LINKS } from '@/lib/constants';

type Props = {
  currentRoute: string;
  navigate: (path: string) => void;
};

export default function Header({ currentRoute, navigate }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-slate-800 text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-x-4 gap-y-0.5">
          <span className="text-slate-200">{COLLEGE.affiliation}</span>
          <span className="text-slate-300">Est. {COLLEGE.established}</span>
        </div>
      </div>

      {/* Logo + title */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img
              src="/images/Seal_of_Tamil_Nadu.svg"
              alt="Tamil Nadu State Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-xl font-bold text-slate-900 leading-tight">
              {COLLEGE.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 truncate">
              {COLLEGE.location}, {COLLEGE.district}
            </p>
          </div>
          <button
            className="lg:hidden p-2 text-slate-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:block bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = currentRoute === link.path;
              return (
                <li key={link.path}>
                  <button
                    onClick={() => handleNav(link.path)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      isActive
                        ? 'text-slate-900 border-slate-800 bg-white'
                        : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden bg-white border-b border-slate-200 shadow-lg">
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map((link) => {
              const isActive = currentRoute === link.path;
              return (
                <li key={link.path}>
                  <button
                    onClick={() => handleNav(link.path)}
                    className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-slate-900 bg-slate-100 border-l-4 border-slate-800'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
