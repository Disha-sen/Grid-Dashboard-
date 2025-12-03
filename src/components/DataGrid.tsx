import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { GridReadyEvent, GridApi, ColumnApi } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Employee } from '../types/employee';
import { columnDefs, defaultColDef } from '../config/columnDefs';
import { saveColumnState, loadColumnState } from '../utils/localStorage';
import Toolbar from './Toolbar';

interface DataGridProps {
  data: Employee[];
  onDataSourceChange?: (useSynthetic: boolean) => void;
  isLoading?: boolean;
}

const GridSkeleton = () => (
  <div className="w-full h-[650px] bg-white/10 rounded-xl overflow-hidden animate-pulse border border-white/10">
    {/* Header Skeleton */}
    <div className="h-12 border-b border-white/10 bg-white/10 flex items-center px-4 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-4 bg-white/20 rounded w-32" />
      ))}
    </div>
    {/* Rows Skeleton */}
    {[...Array(15)].map((_, i) => (
      <div key={i} className="h-12 border-b border-white/5 flex items-center px-4 gap-4">
        {[1, 2, 3, 4, 5, 6].map((j) => (
          <div key={j} className="h-3 bg-white/10 rounded w-32" />
        ))}
      </div>
    ))}
  </div>
);

const DataGrid: React.FC<DataGridProps> = ({ data, onDataSourceChange, isLoading = false }) => {
  const gridRef = useRef<AgGridReact<Employee>>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [columnApi, setColumnApi] = useState<ColumnApi | null>(null);
  const [quickFilterText, setQuickFilterText] = useState<string>('');
  const [selectedRowsCount, setSelectedRowsCount] = useState<number>(0);
  const [paginationPageSize, setPaginationPageSize] = useState<number>(20);
  const [allColumns, setAllColumns] = useState<any[]>([]);

  // Function to update column state for UI
  const updateColumnState = useCallback(() => {
    if (!columnApi) return;
    const cols =
      columnApi
        .getColumns()
        ?.map((col: any) => ({
          colId: col.getColId(),
          headerName: col.getColDef().headerName || col.getColId(),
          visible: col.isVisible(),
        }))
        .filter((col: any) => col.headerName && col.headerName.trim() !== '') || [];
    setAllColumns(cols);
  }, [columnApi]);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);

    // Load saved column state
    const savedState = loadColumnState();
    if (savedState) {
      params.columnApi.applyColumnState({ state: savedState, applyOrder: true });
    }

    // Initial column state update
    // We need to wait a tick for columns to be ready or just call it
    setTimeout(() => {
      const cols =
        params.columnApi
          .getColumns()
          ?.map((col: any) => ({
            colId: col.getColId(),
            headerName: col.getColDef().headerName || col.getColId(),
            visible: col.isVisible(),
          }))
          .filter((col: any) => col.headerName && col.headerName.trim() !== '') || [];
      setAllColumns(cols);
    }, 0);
  }, []);

  // Update columns when columnApi is set (just in case)
  useEffect(() => {
    if (columnApi) {
      updateColumnState();
    }
  }, [columnApi, updateColumnState]);

  // Save column state on changes
  const onColumnMoved = useCallback(() => {
    if (columnApi) {
      const columnState = columnApi.getColumnState();
      saveColumnState(columnState);
    }
  }, [columnApi]);

  const onColumnResized = useCallback(() => {
    if (columnApi) {
      const columnState = columnApi.getColumnState();
      saveColumnState(columnState);
    }
  }, [columnApi]);

  const onColumnVisible = useCallback(() => {
    if (columnApi) {
      const columnState = columnApi.getColumnState();
      saveColumnState(columnState);
      updateColumnState(); // Update UI state
    }
  }, [columnApi, updateColumnState]);

  const onSortChanged = useCallback(() => {
    if (columnApi) {
      const columnState = columnApi.getColumnState();
      saveColumnState(columnState);
    }
  }, [columnApi]);

  // Handle selection changes
  const onSelectionChanged = useCallback(() => {
    if (gridApi) {
      const selectedRows = gridApi.getSelectedRows();
      setSelectedRowsCount(selectedRows.length);
    }
  }, [gridApi]);

  // Export to CSV
  const handleExportCSV = useCallback(() => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        fileName: `factwise-employees-${new Date().toISOString().split('T')[0]}.csv`,
        onlySelected: false,
      });
    }
  }, [gridApi]);

  // Clear selection
  const handleClearSelection = useCallback(() => {
    if (gridApi) {
      gridApi.deselectAll();
    }
  }, [gridApi]);

  // Quick filter
  const onQuickFilterChanged = useCallback((value: string) => {
    setQuickFilterText(value);
  }, []);

  useEffect(() => {
    if (gridApi) {
      gridApi.setGridOption('quickFilterText', quickFilterText);
    }
  }, [quickFilterText, gridApi]);

  // Column visibility
  const handleColumnVisibilityChange = useCallback(
    (colId: string, visible: boolean) => {
      if (columnApi) {
        columnApi.setColumnVisible(colId, visible);
        // The onColumnVisible event will trigger and update the state
      }
    },
    [columnApi]
  );

  // Pagination page size change
  const handlePageSizeChange = useCallback((size: number) => {
    setPaginationPageSize(size);
  }, []);

  // Force update grid page size when state changes
  useEffect(() => {
    if (gridApi) {
      gridApi.paginationSetPageSize(paginationPageSize);
    }
  }, [gridApi, paginationPageSize]);

  return (
    <div className="flex flex-col bg-white/5 rounded-2xl shadow-glass overflow-visible border border-white/10">
      <Toolbar
        onQuickFilterChange={onQuickFilterChanged}
        onExportCSV={handleExportCSV}
        onClearSelection={handleClearSelection}
        selectedRowsCount={selectedRowsCount}
        columns={allColumns}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        onPageSizeChange={handlePageSizeChange}
        currentPageSize={paginationPageSize}
        onDataSourceChange={onDataSourceChange}
      />

      <div className="ag-theme-quartz" style={{ width: '100%', height: '650px' }}>
        {isLoading ? (
          <GridSkeleton />
        ) : (
          <AgGridReact<Employee>
            ref={gridRef}
            rowData={data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            onColumnMoved={onColumnMoved}
            onColumnResized={onColumnResized}
            onColumnVisible={onColumnVisible}
            onSortChanged={onSortChanged}
            onSelectionChanged={onSelectionChanged}
            pagination={true}
            paginationPageSize={paginationPageSize}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            animateRows={true}
            enableCellTextSelection={true}
            suppressScrollOnNewData={true}
            maintainColumnOrder={true}
            overlayNoRowsTemplate='<span class="ag-overlay-no-rows-center">No employees found</span>'
            overlayLoadingTemplate='<span class="ag-overlay-loading-center">Loading employees...</span>'
          />
        )}
      </div>
    </div>
  );
};

export default DataGrid;
