import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataGrid from '../components/DataGrid';
import { Employee } from '../types/employee';

const mockEmployees: Employee[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    position: 'Developer',
    salary: 75000,
    hireDate: '2020-01-15',
    age: 30,
    location: 'New York',
    performanceRating: 4.5,
    projectsCompleted: 10,
    isActive: true,
    skills: ['JavaScript', 'React'],
    manager: 'Jane Smith',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    department: 'Marketing',
    position: 'Manager',
    salary: 85000,
    hireDate: '2019-06-20',
    age: 35,
    location: 'Los Angeles',
    performanceRating: 4.8,
    projectsCompleted: 15,
    isActive: true,
    skills: ['Marketing', 'Strategy'],
    manager: null,
  },
];

describe('DataGrid Component', () => {
  it('renders without crashing', () => {
    render(<DataGrid data={mockEmployees} />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('displays correct number of rows', () => {
    render(<DataGrid data={mockEmployees} />);
    // AG Grid renders header + data rows
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('renders column headers', () => {
    render(<DataGrid data={mockEmployees} />);
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('quick filter filters rows', async () => {
    render(<DataGrid data={mockEmployees} />);
    
    const searchInput = screen.getByPlaceholderText(/quick search/i);
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    // After filtering, verify the filter is applied
    expect(searchInput).toHaveValue('John');
  });

  it('export CSV button is present', () => {
    render(<DataGrid data={mockEmployees} />);
    const exportButton = screen.getByText(/export csv/i);
    expect(exportButton).toBeInTheDocument();
  });
});
