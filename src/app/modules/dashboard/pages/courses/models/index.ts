import { Teacher } from "../../teachers/models/teacher";

export interface Courses {
  id: string;
  name: string;
  hours: number;
  nClasses: number;
  teacher: Teacher;
}
