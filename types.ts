export enum UserRole {
  STUDENT = 'Étudiant',
  MODERATOR = 'Modérateur',
  ADMIN = 'Administrateur',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Resource {
  id: string;
  title: string;
  year: string;
  semester: string;
  subject: string;
  type: 'Epreuve' | 'Corrigé';
  dateAdded: string;
  downloadUrl: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  category: 'Événement' | 'Innovation' | 'Formation';
}

export interface Member {
  id: string;
  name: string;
  role: string;
  year: string; // e.g., "Promotion 2023"
  photoUrl: string;
}