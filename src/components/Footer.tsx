import { Mail, MapPin } from 'lucide-react';
import { COLLEGE, NAV_LINKS } from '@/lib/constants';

type Props = {
  navigate: (path: string) => void;
};

export default function Footer({ navigate }: Props) {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* College info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                <img
                  src="/images/Seal_of_Tamil_Nadu.svg"
                  alt="Tamil Nadu State Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-white font-semibold text-sm leading-tight">
                {COLLEGE.name}
              </h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {COLLEGE.location}, {COLLEGE.district}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              Affiliated to {COLLEGE.affiliation}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-500" />
              <p className="text-sm text-slate-400 leading-relaxed">
                {COLLEGE.address.join(', ')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 flex-shrink-0 text-slate-500" />
              <a
                href={`mailto:${COLLEGE.email}`}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                {COLLEGE.email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {COLLEGE.name}, {COLLEGE.location}
          </p>
          <button
            onClick={() => navigate('/admin')}
            className="text-xs text-slate-600 hover:text-white transition-colors mt-2"
          >
            Admin Panel
          </button>
        </div>
      </div>
    </footer>
  );
}
