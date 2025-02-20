import { Inscription } from '../../inscriptions/models/index';
export interface Student {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  profile: Profile;
  gender: Sex;
  inscriptions?: Inscription[]
}

// Definir los valores como constantes reutilizables
export type Profile = 'Desarrollador' | 'IT' | 'UI/UX' | 'Otro';
export const STUDENT_PROFFILE: Profile[] = ['Desarrollador', 'IT', 'UI/UX', 'Otro'];

export type Sex = 'F' | 'M';
export const STUDENT_GENDER: Sex[] = ['F', 'M'];
