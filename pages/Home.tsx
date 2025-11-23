import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calculator, Users, Lightbulb } from 'lucide-react';
import { MOCK_EVENTS } from '../constants';

const Home: React.FC = () => {
  // Get the innovation event (Mon Calculateur)
  const innovation = MOCK_EVENTS.find(e => e.category === 'Innovation');

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">L'excellence au service de</span>{' '}
                  <span className="block text-primary-600 xl:inline">la recherche agricole</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Le CRSP accompagne les étudiants de l'UNA dans leur parcours scientifique. 
                  Accédez aux ressources, découvrez nos outils innovants et rejoignez une communauté passionnée.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/ressources"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                    >
                      Accéder aux Ressources
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/evenements"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                    >
                      Nos Innovations
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1596788069677-24a919363553?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Étudiants en agriculture"
          />
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Notre Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Au cœur de l'innovation étudiante
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <BookOpen className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Ressources Partagées</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Une banque d'épreuves, de corrigés et de supports de cours centralisée pour faciliter vos révisions.
                </dd>
              </div>

              <div className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <Calculator className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Outils Technologiques</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Des logiciels comme "Mon Calculateur" pour suivre vos performances académiques avec précision.
                </dd>
              </div>

              <div className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <Users className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Communauté</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Un réseau d'étudiants, d'enseignants et de professionnels pour collaborer sur des projets de recherche.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Innovation Spotlight */}
      {innovation && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold uppercase tracking-wide">
                        Innovation Phare
                    </span>
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  {innovation.title}
                </h2>
                <p className="mt-3 max-w-3xl text-lg text-gray-500">
                  {innovation.description}
                </p>
                <div className="mt-8">
                  <Link
                    to="/evenements"
                    className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="mt-8 lg:mt-0 relative">
                  <div className="absolute inset-0 bg-primary-200 rounded-3xl transform rotate-3 scale-95 opacity-30"></div>
                  <img 
                    className="relative rounded-lg shadow-lg w-full object-cover h-64 sm:h-80 lg:h-96" 
                    src={innovation.imageUrl} 
                    alt="Innovation" 
                  />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;