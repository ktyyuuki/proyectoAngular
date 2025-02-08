export function generateId(students: any[]): number {
  if (students.length === 0) {
      return 1;  // Si la lista está vacía, el primer ID será 1
  }
  const maxId = Math.max(...students.map(student => student.id));
  return maxId + 1;
}

export function generateRandomId(name: string, length = 3) {
  const cleanName = name.replace(/[^a-zA-Z]/g, '').toLowerCase();
  let hash = 0;
  for (let i = 0; i < cleanName.length; i++) {
      hash = (hash << 5) - hash + cleanName.charCodeAt(i);
      hash |= 0;
  }

  const randomString = Math.abs(hash).toString(36).substring(0, length);
  return `${cleanName.substring(0, 3)}${randomString}`;
}
