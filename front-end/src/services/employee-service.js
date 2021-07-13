const KEYS = {
  employees: 'empoyees',
  employeeId: 'employeeId'
};

export const getDepartmentCollection = [
  { id: '1', title: 'Development' },
  { id: '2', title: 'Marketing' },
  { id: '3', title: 'Accounting' },
  { id: '4', title: 'HR' }
];

export function getAllEmployees() {
  if (localStorage.getItem(KEYS.employees) === null) {
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  }
  const employees = JSON.parse(localStorage.getItem(KEYS.employees));
  // map departmentID to department title
  const departments = getDepartmentCollection;
  return employees.map((x) => ({
    ...x,
    department: departments[x.departmentId - 1].title
  }));
}

export function generateEmployeeId() {
  if (localStorage.getItem(KEYS.employeeId) === null) {
    localStorage.setItem(KEYS.employeeId, '0');
  }
  // eslint-disable-next-line radix
  let id = parseInt(localStorage.getItem(KEYS.employeeId));
  localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
}

export function insertEmployee(data) {
  const employees = getAllEmployees();
  data.id = generateEmployeeId();
  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function updateEmployee(data) {
  const employees = getAllEmployees();
  const recordIndex = employees.findIndex((x) => x.id === data.id);
  employees[recordIndex] = { ...data };
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function deleteEmployee(id) {
  let employees = getAllEmployees();
  employees = employees.filter((x) => x.id !== id);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}
