import { Inscription } from "../../inscriptions/models";
import { Teacher } from "../../teachers/models/teacher";

export interface Courses {
  id: string;
  name: string;
  hours: number;
  nClasses: number;
  teacherId: Teacher['id'];
  teacher?: Teacher;
  inscriptions?: Inscription[]
}
