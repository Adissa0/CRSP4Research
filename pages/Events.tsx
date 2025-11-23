import React, { useState } from 'react';
import { MOCK_EVENTS } from '../constants';
import { Calendar, Tag, Trash2, Plus, X, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Event } from '../types';

const Events: React.FC = () => {
  const { canUpload } = useAuth();
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    category: 'Événement',
    imageUrl: 'https://picsum.photos/800/600'
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      setEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date && newEvent.description && newEvent.category) {
        const eventToAdd: Event = {
            id: Date.now().toString(),
            title: newEvent.title!,
            date: newEvent.date!,
            description: newEvent.description!,
            imageUrl: newEvent.imageUrl || 'https://picsum.photos/800/600',
            category: newEvent.category as 'Événement' | 'Innovation' | 'Formation'
        };
        setEvents([eventToAdd, ...events]);
        setIsModalOpen(false);
        setNewEvent({ category: 'Événement', imageUrl: 'https://picsum.photos/800/600' });
        alert("Événement ajouté avec succès !");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-12">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Événements & Innovations
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Découvrez l'actualité du CRSP, nos conférences et nos outils technologiques.
              </p>
            </div>
            {canUpload && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-6 md:mt-0 flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Ajouter un événement
              </button>
            )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 relative group">
              {/* Admin Delete Button */}
              {canUpload && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(event.id);
                  }}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Supprimer l'événement"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}

              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={event.imageUrl} alt={event.title} />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium px-2 py-1 rounded-full ${
                          event.category === 'Innovation' ? 'bg-purple-100 text-purple-800' :
                          event.category === 'Formation' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                      }`}>
                        {event.category}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <time dateTime={event.date}>{event.date}</time>
                      </div>
                  </div>
                  <div className="block mt-4">
                    <p className="text-xl font-semibold text-gray-900">{event.title}</p>
                    <p className="mt-3 text-base text-gray-500 line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                    <button className="w-full bg-gray-50 hover:bg-gray-100 text-primary-600 font-medium py-2 rounded transition-colors text-sm">
                        Voir les détails
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* Add Event Modal */}
       {isModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span className="sr-only">Fermer</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Upload className="h-6 w-6 text-primary-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Ajouter un événement
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleAddEvent} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Titre</label>
                        <input 
                            type="text" 
                            required 
                            className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={newEvent.title || ''}
                            onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input 
                            type="text" 
                            required 
                            placeholder="ex: 15 Mars 2024"
                            className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={newEvent.date || ''}
                            onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                        <select 
                            className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={newEvent.category}
                            onChange={e => setNewEvent({...newEvent, category: e.target.value as any})}
                        >
                            <option value="Événement">Événement</option>
                            <option value="Innovation">Innovation</option>
                            <option value="Formation">Formation</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea 
                            required 
                            rows={3}
                            className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={newEvent.description || ''}
                            onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            className="bg-white mt-1 block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary-50 file:text-primary-700
                            hover:file:bg-primary-100"
                            onChange={e => {
                                // Simulate file selection by keeping the default random image or setting a specific one
                                // In a real app, we would read the file here.
                                setNewEvent({...newEvent, imageUrl: `https://picsum.photos/800/600?random=${Date.now()}`})
                            }}
                        />
                      </div>
                      <div className="pt-4 flex justify-end">
                          <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3">
                              Annuler
                          </button>
                          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                              Enregistrer
                          </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;