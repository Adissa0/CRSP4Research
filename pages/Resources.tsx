import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_RESOURCES, ACADEMIC_YEARS, SEMESTERS } from '../constants';
import { Resource } from '../types';
import { Search, Filter, Download, FileText, Upload, X, Trash2 } from 'lucide-react';

const Resources: React.FC = () => {
  const { canUpload } = useAuth();
  
  // State for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  
  // State for resources (using mock data initially)
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES);

  // State for upload modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newResource, setNewResource] = useState<Partial<Resource>>({
    year: ACADEMIC_YEARS[0],
    semester: SEMESTERS[0],
    type: 'Epreuve'
  });

  // Filter Logic
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear ? resource.year === selectedYear : true;
    const matchesSemester = selectedSemester ? resource.semester === selectedSemester : true;
    
    return matchesSearch && matchesYear && matchesSemester;
  });

  // Handle Upload
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (newResource.title && newResource.subject && newResource.year && newResource.semester) {
        const resourceToAdd: Resource = {
            id: Date.now().toString(),
            title: newResource.title!,
            year: newResource.year!,
            semester: newResource.semester!,
            subject: newResource.subject!,
            type: newResource.type as 'Epreuve' | 'Corrigé',
            dateAdded: new Date().toISOString().split('T')[0],
            downloadUrl: '#'
        };
        setResources([resourceToAdd, ...resources]);
        setIsUploadModalOpen(false);
        setNewResource({ year: ACADEMIC_YEARS[0], semester: SEMESTERS[0], type: 'Epreuve' }); // Reset form
        alert("Ressource ajoutée avec succès !");
    }
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette ressource ?")) {
      setResources(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ressources Académiques</h1>
          <p className="mt-2 text-gray-600">Accédez aux épreuves et corrigés pour réussir vos examens.</p>
        </div>
        
        {canUpload && (
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <Upload className="ml-2 -ml-1 h-5 w-5 mr-2" />
            Ajouter une ressource
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-white focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
              placeholder="Rechercher une matière..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="bg-white block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md border"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Toutes les années</option>
            {ACADEMIC_YEARS.map(year => <option key={year} value={year}>{year}</option>)}
          </select>

          <select
            className="bg-white block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md border"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">Tous les semestres</option>
            {SEMESTERS.map(sem => <option key={sem} value={sem}>{sem}</option>)}
          </select>

          <button 
            onClick={() => {setSearchTerm(''); setSelectedYear(''); setSelectedSemester('');}}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Resource List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <li key={resource.id}>
                <div className="block hover:bg-gray-50 transition-colors">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center truncate">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${resource.type === 'Epreuve' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            <FileText className="h-6 w-6" />
                        </div>
                        <p className="ml-4 text-sm font-medium text-primary-600 truncate">{resource.title}</p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${resource.type === 'Epreuve' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {resource.type}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {resource.subject}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          {resource.year} &bull; {resource.semester}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                         <button className="flex items-center text-primary-600 hover:text-primary-800 font-medium">
                            <Download className="h-4 w-4 mr-1" />
                            Télécharger
                         </button>
                         {canUpload && (
                           <button 
                             onClick={() => handleDelete(resource.id)}
                             className="ml-4 flex items-center text-red-600 hover:text-red-800 font-medium transition-colors"
                             title="Supprimer la ressource"
                           >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Supprimer
                           </button>
                         )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-8 text-center text-gray-500">
                Aucune ressource trouvée pour ces critères.
            </li>
          )}
        </ul>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsUploadModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setIsUploadModalOpen(false)}
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Ajouter une ressource
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleUpload} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Titre</label>
                        <input 
                            type="text" 
                            required 
                            className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={newResource.title || ''}
                            onChange={e => setNewResource({...newResource, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Matière</label>
                        <input 
                            type="text" 
                            required 
                            className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={newResource.subject || ''}
                            onChange={e => setNewResource({...newResource, subject: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Année</label>
                            <select 
                                className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                value={newResource.year}
                                onChange={e => setNewResource({...newResource, year: e.target.value})}
                            >
                                {ACADEMIC_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Semestre</label>
                            <select 
                                className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                value={newResource.semester}
                                onChange={e => setNewResource({...newResource, semester: e.target.value})}
                            >
                                {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select 
                            className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={newResource.type}
                            onChange={e => setNewResource({...newResource, type: e.target.value as any})}
                        >
                            <option value="Epreuve">Epreuve</option>
                            <option value="Corrigé">Corrigé</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Fichier (PDF)</label>
                        <input 
                            type="file" 
                            accept=".pdf"
                            className="bg-white mt-1 block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary-50 file:text-primary-700
                            hover:file:bg-primary-100"
                        />
                      </div>
                      <div className="pt-4 flex justify-end">
                          <button type="button" onClick={() => setIsUploadModalOpen(false)} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-3">
                              Annuler
                          </button>
                          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
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

export default Resources;