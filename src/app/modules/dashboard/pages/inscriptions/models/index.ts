import { Courses } from "../../courses/models";
import { Student } from "../../students/models";

export interface Inscription {
  id: string,
  studentId?: Student['id'],
  courseId?: Courses['id'],
}
