import React, { useState } from 'react';
import { MOCK_MEMBERS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, X, Upload } from 'lucide-react';
import { Member } from '../types';

const Members: React.FC = () => {
  const { canUpload } = useAuth();
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState<Partial<Member>>({
    year: '2023-2024',
    photoUrl: 'https://picsum.photos/200/200'
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
      setMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMember.name && newMember.role && newMember.year) {
        const memberToAdd: Member = {
            id: Date.now().toString(),
            name: newMember.name!,
            role: newMember.role!,
            year: newMember.year!,
            photoUrl: newMember.photoUrl || 'https://picsum.photos/200/200'
        };
        setMembers([memberToAdd, ...members]);
        setIsModalOpen(false);
        setNewMember({ year: '2023-2024', photoUrl: 'https://picsum.photos/200/200' });
        alert("Membre ajouté avec succès !");
    }
  };

  // Group members by year
  const groupedMembers = members.reduce((acc, member) => {
    (acc[member.year] = acc[member.year] || []).push(member);
    return acc;
  }, {} as Record<string, Member[]>);

  const sortedYears = Object.keys(groupedMembers).sort().reverse();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="md:flex md:items-center md:justify-between mb-16">
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Les Visages du CRSP</h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">
              Découvrez l'équipe dynamique qui œuvre pour la promotion de la recherche scientifique à l'UNA.
            </p>
          </div>
          {canUpload && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-6 md:mt-0 flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 flex-shrink-0"
            >
              <Plus className="h-5 w-5 mr-2" />
              Ajouter un membre
            </button>
          )}
      </div>

      {sortedYears.map((year) => (
        <div key={year} className="mb-16 animate-fade-in-up">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mr-4">Bureau {year}</h2>
            <div className="h-px bg-gray-200 flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {groupedMembers[year].map((member) => (
              <div key={member.id} className="pt-4 relative group">
                 {/* Admin Delete Button */}
                 {canUpload && (
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="absolute top-2 right-2 z-10 p-1.5 bg-white/90 rounded-full text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm transition-opacity opacity-0 group-hover:opacity-100"
                      title="Supprimer le membre"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                <div className="flow-root bg-white rounded-lg px-4 pb-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center">
                        <span className="p-1 rounded-full bg-white shadow-sm">
                             <img className="h-24 w-24 rounded-full object-cover border-2 border-primary-100" src={member.photoUrl} alt={member.name} />
                        </span>
                    </div>
                    <div className="text-center justify-center items-center">
                        <h3 className="mt-4 text-lg font-bold text-gray-900 tracking-tight">{member.name}</h3>
                        <p className="text-primary-600 font-medium text-sm mb-4">{member.role}</p>
                        
                        <div className="border-t border-gray-100 pt-4">
                             <p className="text-xs text-gray-500">Étudiant en Agriculture</p>
                             <p className="text-xs text-gray-400 mt-1">Université Nationale d'Agriculture</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add Member Modal */}
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
                    Ajouter un membre
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleAddMember} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nom Complet</label>
                        <input 
                            type="text" 
                            required 
                            className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={newMember.name || ''}
                            onChange={e => setNewMember({...newMember, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Rôle</label>
                        <input 
                            type="text" 
                            required 
                            className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={newMember.role || ''}
                            onChange={e => setNewMember({...newMember, role: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Année de Mandat</label>
                        <input 
                            type="text" 
                            required 
                            placeholder="ex: 2023-2024"
                            className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={newMember.year || ''}
                            onChange={e => setNewMember({...newMember, year: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Photo</label>
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
                                // Simulate file upload
                                setNewMember({...newMember, photoUrl: `https://picsum.photos/200/200?random=${Date.now()}`})
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

export default Members;