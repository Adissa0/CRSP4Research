import { Event, Member, Resource } from './types';

export const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Biologie Végétale - Examen Final',
    year: 'Licence 1',
    semester: 'Semestre 1',
    subject: 'Biologie',
    type: 'Epreuve',
    dateAdded: '2023-11-15',
    downloadUrl: '#'
  },
  {
    id: '2',
    title: 'Chimie Organique - Corrigé TD2',
    year: 'Licence 1',
    semester: 'Semestre 2',
    subject: 'Chimie',
    type: 'Corrigé',
    dateAdded: '2023-12-10',
    downloadUrl: '#'
  },
  {
    id: '3',
    title: 'Statistiques Agricoles - Partiel',
    year: 'Licence 2',
    semester: 'Semestre 3',
    subject: 'Mathématiques',
    type: 'Epreuve',
    dateAdded: '2024-01-20',
    downloadUrl: '#'
  },
  {
    id: '4',
    title: 'Agronomie Générale - Synthèse',
    year: 'Licence 3',
    semester: 'Semestre 5',
    subject: 'Agronomie',
    type: 'Corrigé',
    dateAdded: '2024-02-05',
    downloadUrl: '#'
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Lancement de "Mon Calculateur"',
    date: '15 Mars 2024',
    description: 'Une révolution pour le suivi académique. Découvrez notre nouvel outil logiciel conçu par le CRSP pour aider les étudiants à simuler et suivre leurs moyennes.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    category: 'Innovation'
  },
  {
    id: '2',
    title: 'Conférence sur l\'Agriculture Durable',
    date: '10 Février 2024',
    description: 'Une rencontre enrichissante avec des experts du domaine pour discuter des défis de l\'agriculture moderne au Bénin.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    category: 'Événement'
  },
  {
    id: '3',
    title: 'Atelier de Rédaction Scientifique',
    date: '05 Janvier 2024',
    description: 'Formation pratique pour les étudiants en fin de cycle sur la structuration et la rédaction de mémoires.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    category: 'Formation'
  }
];

export const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    role: 'Président',
    year: '2023-2024',
    photoUrl: 'https://picsum.photos/200/200?random=4'
  },
  {
    id: '2',
    name: 'Marie Curie',
    role: 'Secrétaire Générale',
    year: '2023-2024',
    photoUrl: 'https://picsum.photos/200/200?random=5'
  },
  {
    id: '3',
    name: 'Albert Einstein',
    role: 'Responsable Innovation',
    year: '2022-2023',
    photoUrl: 'https://picsum.photos/200/200?random=6'
  },
  {
    id: '4',
    name: 'Isaac Newton',
    role: 'Responsable Communication',
    year: '2022-2023',
    photoUrl: 'https://picsum.photos/200/200?random=7'
  }
];

export const ACADEMIC_YEARS = ['Licence 1', 'Licence 2', 'Licence 3'];
export const SEMESTERS = ['Semestre 1', 'Semestre 2', 'Semestre 3', 'Semestre 4', 'Semestre 5', 'Semestre 6'];