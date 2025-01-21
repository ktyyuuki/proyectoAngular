export function generateId(students: any[]): number {
  if (students.length === 0) {
      return 1;  // Si la lista está vacía, el primer ID será 1
  }
  const maxId = Math.max(...students.map(student => student.id));
  return maxId + 1;
}
