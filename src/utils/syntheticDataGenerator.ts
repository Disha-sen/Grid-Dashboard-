import { Employee } from '../types/employee';

const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Barbara', 'David', 'Elizabeth', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris',
];

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];

const positions = [
  'Senior Developer', 'Junior Developer', 'Manager', 'Director', 'VP',
  'Specialist', 'Analyst', 'Coordinator', 'Engineer', 'Consultant',
];

const locations = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
  'San Antonio', 'San Diego', 'Dallas', 'Austin', 'Seattle', 'Denver', 'Miami',
];

const skillSets = [
  ['JavaScript', 'React', 'Node.js'],
  ['Python', 'Django', 'PostgreSQL'],
  ['Java', 'Spring Boot', 'MySQL'],
  ['AWS', 'Docker', 'Kubernetes'],
  ['Marketing', 'SEO', 'Analytics'],
  ['Sales', 'CRM', 'Negotiation'],
  ['HR', 'Recruitment', 'HRIS'],
  ['Finance', 'Excel', 'SAP'],
];

const managers = [
  'Sarah Johnson', 'Michael Brown', 'David Wilson', 'Jennifer Lee',
  'Karen White', 'Thomas Clark', 'Robert Martinez', null,
];

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

export function generateSyntheticData(count: number): Employee[] {
  const employees: Employee[] = [];
  
  for (let i = 1; i <= count; i++) {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const department = randomElement(departments);
    
    employees.push({
      id: i,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@company.com`,
      department,
      position: randomElement(positions),
      salary: randomNumber(45000, 200000),
      hireDate: randomDate(new Date(2015, 0, 1), new Date(2024, 11, 31)),
      age: randomNumber(22, 65),
      location: randomElement(locations),
      performanceRating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
      projectsCompleted: randomNumber(0, 30),
      isActive: Math.random() > 0.1, // 90% active
      skills: randomElement(skillSets),
      manager: randomElement(managers),
    });
  }
  
  return employees;
}
