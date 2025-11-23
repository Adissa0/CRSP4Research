import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, login, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-primary-600 font-semibold' : 'text-gray-600 hover:text-primary-600';

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/ressources', label: 'Ressources' },
    { path: '/evenements', label: 'Événements & Innovations' },
    { path: '/membres', label: 'Membres' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <div className="bg-primary-600 p-2 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl text-slate-800 tracking-tight">CRSP<span className="text-primary-600">4Research</span></span>
              </Link>

              {/* Desktop Menu moved to left with margin */}
              <div className="hidden md:flex items-center space-x-8 ml-10">
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path} className={`${isActive(link.path)} transition-colors duration-200`}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-slate-900">{user?.name}</span>
                    <span className="text-xs text-primary-600 font-medium px-2 py-0.5 bg-primary-50 rounded-full">{user?.role}</span>
                  </div>
                  <button onClick={logout} className="p-2 text-gray-500 hover:text-red-600 transition-colors" title="Déconnexion">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => login(UserRole.ADMIN)} 
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-all shadow-sm hover:shadow text-sm font-medium"
                  >
                    Connexion Admin
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-200 my-2 pt-2">
                 {isAuthenticated ? (
                    <div className="px-3 py-2">
                         <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
                                {user?.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">{user?.name}</div>
                                <div className="text-xs text-primary-600">{user?.role}</div>
                            </div>
                         </div>
                         <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full text-left text-red-600 font-medium text-sm">
                            Se déconnecter
                         </button>
                    </div>
                 ) : (
                     <div className="px-3 py-2 flex flex-col gap-2">
                        <button onClick={() => { login(UserRole.ADMIN); setIsMenuOpen(false); }} className="w-full bg-primary-600 text-white px-4 py-2 rounded text-center">
                            Connexion Admin
                        </button>
                     </div>
                 )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                 <GraduationCap className="h-6 w-6 text-primary-500" />
                 <span className="font-bold text-lg text-white">CRSP4Research</span>
              </div>
              <p className="text-sm text-slate-400">
                Encourager, orienter et accompagner les jeunes chercheurs dans le domaine agricole. 
                Le pont entre vos idées et leur concrétisation.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Liens Rapides</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/ressources" className="hover:text-primary-400 transition-colors">Ressources Académiques</Link></li>
                <li><Link to="/evenements" className="hover:text-primary-400 transition-colors">Innovations & Outils</Link></li>
                <li><Link to="/membres" className="hover:text-primary-400 transition-colors">Notre Équipe</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Université Nationale d'Agriculture (UNA)</li>
                <li>Bénin</li>
                <li>Email: crsp4reseach@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} CRSP4Research. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;