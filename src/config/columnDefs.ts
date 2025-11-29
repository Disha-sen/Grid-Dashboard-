import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import { Employee } from '../types/employee';

// Date formatter
const dateFormatter = (params: ValueFormatterParams) => {
  if (!params.value) return '';
  const date = new Date(params.value);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Currency formatter
const currencyFormatter = (params: ValueFormatterParams) => {
  if (params.value == null) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(params.value);
};

// Number formatter with 1 decimal
const numberFormatter = (params: ValueFormatterParams) => {
  if (params.value == null) return '';
  return params.value.toFixed(1);
};

// Status formatter - simple text
const statusFormatter = (params: ValueFormatterParams) => {
  return params.value ? '✓ Active' : '○ Inactive';
};

// Skills formatter - simple text
const skillsFormatter = (params: ValueFormatterParams) => {
  if (!params.value || !Array.isArray(params.value)) return '';
  const skills = params.value;
  if (skills.length <= 3) {
    return skills.join(', ');
  }
  return `${skills.slice(0, 3).join(', ')} +${skills.length - 3} more`;
};

export const columnDefs: ColDef<Employee>[] = [
  {
    headerName: '',
    field: 'id',
    width: 60,
    pinned: 'left',
    checkboxSelection: true,
    headerCheckboxSelection: true,
    filter: false,
    sortable: false,
    suppressMenu: true,
    lockPosition: true,
  },
  {
    headerName: 'ID',
    field: 'id',
    width: 80,
    filter: 'agNumberColumnFilter',
    sortable: true,
    cellClass: 'font-mono text-slate-600',
  },
  {
    headerName: 'First Name',
    field: 'firstName',
    width: 140,
    filter: 'agTextColumnFilter',
    sortable: true,
    cellClass: 'font-semibold text-slate-900',
  },
  {
    headerName: 'Last Name',
    field: 'lastName',
    width: 140,
    filter: 'agTextColumnFilter',
    sortable: true,
    cellClass: 'font-semibold text-slate-900',
  },
  {
    headerName: 'Email',
    field: 'email',
    width: 260,
    filter: 'agTextColumnFilter',
    sortable: true,
    cellClass: 'text-blue-600',
  },
  {
    headerName: 'Department',
    field: 'department',
    width: 150,
    filter: 'agTextColumnFilter',
    sortable: true,
    cellClass: 'font-medium text-slate-700',
  },
  {
    headerName: 'Position',
    field: 'position',
    width: 200,
    filter: 'agTextColumnFilter',
    sortable: true,
    cellClass: 'text-slate-600',
  },
  {
    headerName: 'Salary',
    field: 'salary',
    width: 130,
    filter: 'agNumberColumnFilter',
    sortable: true,
    valueFormatter: currencyFormatter,
    type: 'numericColumn',
    cellClass: 'font-semibold text-emerald-600',
  },
  {
    headerName: 'Hire Date',
    field: 'hireDate',
    width: 130,
    filter: 'agDateColumnFilter',
    sortable: true,
    valueFormatter: dateFormatter,
    comparator: (valueA: string, valueB: string) => {
      const dateA = new Date(valueA).getTime();
      const dateB = new Date(valueB).getTime();
      return dateA - dateB;
    },
    cellClass: 'text-slate-600',
  },
  {
    headerName: 'Age',
    field: 'age',
    width: 90,
    filter: 'agNumberColumnFilter',
    sortable: true,
    type: 'numericColumn',
    cellClass: 'text-slate-600',
  },
  {
    headerName: 'Location',
    field: 'location',
    width: 150,
    filter: 'agTextColumnFilter',
    sortable: true,
    cellClass: 'text-slate-600',
  },
  {
    headerName: 'Performance',
    field: 'performanceRating',
    width: 130,
    filter: 'agNumberColumnFilter',
    sortable: true,
    valueFormatter: numberFormatter,
    type: 'numericColumn',
    cellClass: 'font-semibold text-indigo-600',
  },
  {
    headerName: 'Projects',
    field: 'projectsCompleted',
    width: 110,
    filter: 'agNumberColumnFilter',
    sortable: true,
    type: 'numericColumn',
    cellClass: 'text-slate-600',
  },
  {
    headerName: 'Status',
    field: 'isActive',
    width: 120,
    filter: 'agTextColumnFilter',
    sortable: true,
    valueFormatter: statusFormatter,
    cellClass: (params) => {
      return params.value ? 'font-semibold text-emerald-700' : 'font-semibold text-slate-600';
    },
  },
  {
    headerName: 'Skills',
    field: 'skills',
    width: 300,
    filter: 'agTextColumnFilter',
    sortable: false,
    valueFormatter: skillsFormatter,
    cellClass: 'text-sm text-slate-700',
    wrapText: true,
    autoHeight: false,
  },
  {
    headerName: 'Manager',
    field: 'manager',
    width: 160,
    filter: 'agTextColumnFilter',
    sortable: true,
    cellClass: 'text-slate-600',
  },
];

export const defaultColDef: ColDef = {
  resizable: true,
  sortable: true,
  filter: true,
  floatingFilter: false,
  enableRowGroup: false,
  suppressMenu: false,
  minWidth: 100,
};
