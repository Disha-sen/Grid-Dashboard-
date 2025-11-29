import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../components/Dashboard';

describe('Dashboard Component', () => {
  it('renders the dashboard header', () => {
    render(<Dashboard />);
    expect(screen.getByText('FactWise Dashboard')).toBeInTheDocument();
  });

  it('renders the employee management subtitle', () => {
    render(<Dashboard />);
    expect(screen.getByText('Employee Management System')).toBeInTheDocument();
  });

  it('displays total records count', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Total Records:/i)).toBeInTheDocument();
  });

  it('displays last updated timestamp', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Last Updated:/i)).toBeInTheDocument();
  });

  it('renders footer with copyright', () => {
    render(<Dashboard />);
    expect(screen.getByText(/© 2025 FactWise/i)).toBeInTheDocument();
  });
});
