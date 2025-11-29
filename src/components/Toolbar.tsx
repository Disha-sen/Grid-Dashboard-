import React, { useState } from 'react';
import {
  Search,
  X,
  Columns3,
  ChevronDown,
  Database,
  Sparkles,
  Filter,
  ArrowDownToLine,
} from 'lucide-react';
import clsx from 'clsx';

interface Column {
  colId: string;
  headerName: string;
  visible: boolean;
}

interface ToolbarProps {
  onQuickFilterChange: (value: string) => void;
  onExportCSV: () => void;
  onClearSelection: () => void;
  selectedRowsCount: number;
  columns: Column[];
  onColumnVisibilityChange: (colId: string, visible: boolean) => void;
  onPageSizeChange: (size: number) => void;
  currentPageSize: number;
  onDataSourceChange?: (useSynthetic: boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onQuickFilterChange,
  onExportCSV,
  onClearSelection,
  selectedRowsCount,
  columns,
  onColumnVisibilityChange,
  onPageSizeChange,
  currentPageSize,
  onDataSourceChange,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [useSyntheticData, setUseSyntheticData] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onQuickFilterChange(value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    onQuickFilterChange('');
  };

  const handleDataSourceToggle = () => {
    const newValue = !useSyntheticData;
    setUseSyntheticData(newValue);
    if (onDataSourceChange) {
      onDataSourceChange(newValue);
    }
  };

  const pageSizes = [10, 20, 50, 100];
  const visibleColumns = columns.filter((col) => col.visible).length;

  return (
    <div className="glass-strong rounded-2xl p-6 mb-6 animate-slide-up border border-slate-200/60 shadow-float relative overflow-visible z-50">
      {/* Top Row: Search and Primary Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-5">
        {/* Enhanced Search Box */}
        <div className="flex-1 min-w-[280px] max-w-xl">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-200" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search employees, departments, skills..."
              className="w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl
                       focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white
                       transition-all duration-200 text-sm font-medium placeholder:text-slate-400
                       shadow-sm hover:border-slate-300"
              aria-label="Quick search"
            />
            {searchValue && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-lg transition-all duration-200 group/clear"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-slate-400 group-hover/clear:text-slate-600" />
              </button>
            )}

            {/* Search Focus Ring */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-indigo-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl -z-10" />
          </div>
        </div>

        {/* Action Button Group */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Export Button */}
          <button
            onClick={onExportCSV}
            className="group relative inline-flex items-center gap-2.5 px-5 py-3.5 
                     bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-xl 
                     hover:from-emerald-700 hover:to-teal-700
                     transition-all duration-300 font-semibold text-sm
                     shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40
                     hover:-translate-y-0.5 active:translate-y-0"
            aria-label="Export to CSV"
          >
            <ArrowDownToLine className="w-4 h-4 group-hover:animate-bounce" />
            <span>Export</span>
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Clear Selection (Conditional) */}
          {selectedRowsCount > 0 && (
            <button
              onClick={onClearSelection}
              className="group relative inline-flex items-center gap-2.5 px-5 py-3.5 
                       bg-slate-800 text-white rounded-xl hover:bg-slate-900
                       transition-all duration-300 font-semibold text-sm
                       shadow-lg shadow-slate-500/25 hover:shadow-xl hover:shadow-slate-500/40
                       hover:-translate-y-0.5 active:translate-y-0 animate-fade-in"
              aria-label="Clear selection"
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">
                {selectedRowsCount}
              </span>
            </button>
          )}

          {/* Column Visibility Dropdown */}
          <div className="relative z-[10000]">
            <button
              onClick={() => setShowColumnMenu(!showColumnMenu)}
              className={clsx(
                'group relative inline-flex items-center gap-2.5 px-5 py-3.5',
                'bg-white border-2 border-slate-200 text-slate-700 rounded-xl',
                'hover:border-indigo-300 hover:bg-indigo-50/50',
                'transition-all duration-300 font-semibold text-sm',
                'shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
                showColumnMenu && 'border-indigo-500 bg-indigo-50'
              )}
              aria-label="Column visibility"
            >
              <Columns3 className="w-4 h-4 group-hover:text-indigo-600 transition-colors" />
              <span className="hidden sm:inline">Columns</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
                {visibleColumns}
              </span>
              <ChevronDown
                className={clsx(
                  'w-4 h-4 transition-transform duration-300',
                  showColumnMenu && 'rotate-180'
                )}
              />
            </button>

            {/* Dropdown Menu */}
            {showColumnMenu && (
              <>
                <div className="fixed inset-0 z-[9998]" onClick={() => setShowColumnMenu(false)} />
                <div className="fixed top-32 right-8 w-[500px] glass-strong border border-slate-200 rounded-2xl shadow-premium z-[9999] animate-slide-down">
                  {/* Header */}
                  <div className="p-5 border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <Filter className="w-4 h-4 text-indigo-600" />
                        Column Visibility
                      </h3>
                      <button
                        onClick={() => setShowColumnMenu(false)}
                        className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {visibleColumns} of {columns.length} columns visible
                    </p>
                  </div>

                  {/* Column List */}
                  <div className="p-3 max-h-[400px] overflow-y-auto overflow-x-hidden">
                    <div className="grid grid-cols-2 gap-2">
                      {columns.map((col) => (
                        <label
                          key={col.colId}
                          className="flex items-center gap-2 p-2.5 hover:bg-indigo-50/50 rounded-lg cursor-pointer transition-all duration-200 group"
                        >
                          <div className="relative flex-shrink-0">
                            <input
                              type="checkbox"
                              checked={col.visible}
                              onChange={(e) =>
                                onColumnVisibilityChange(col.colId, e.target.checked)
                              }
                              className="w-4 h-4 rounded border-2 border-slate-300 text-indigo-600 
                                       focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 
                                       transition-all cursor-pointer
                                       checked:bg-gradient-to-br checked:from-indigo-600 checked:to-purple-600
                                       checked:border-indigo-600"
                            />
                          </div>
                          <span className="text-xs text-slate-700 group-hover:text-slate-900 font-semibold flex-1 truncate">
                            {col.headerName}
                          </span>
                          {col.visible && (
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row: Page Size and Performance Toggle */}
      <div className="flex flex-wrap gap-4 items-center justify-between pt-5 border-t border-slate-200/80">
        {/* Page Size Selector */}
        <div className="flex items-center gap-3">
          <label htmlFor="pageSize" className="text-sm font-bold text-slate-700">
            Rows per page
          </label>
          <div className="relative">
            <select
              id="pageSize"
              value={currentPageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="appearance-none pl-4 pr-10 py-2.5 bg-white border-2 border-slate-200 
                       rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       text-sm font-bold text-slate-700 cursor-pointer transition-all 
                       hover:border-slate-300 shadow-sm"
            >
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size} rows
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Performance Demo Toggle */}
        {onDataSourceChange && (
          <button
            onClick={handleDataSourceToggle}
            className={clsx(
              'group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl',
              'transition-all duration-500 font-bold text-sm overflow-hidden',
              'shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0',
              useSyntheticData
                ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-purple-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-slate-500/10'
            )}
          >
            {/* Shimmer Effect for Active State */}
            {useSyntheticData && (
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                style={{ backgroundSize: '200% 100%' }}
              />
            )}

            <div className="relative flex items-center gap-3">
              {useSyntheticData ? (
                <>
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span>Performance Mode</span>
                      <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">ON</span>
                    </div>
                    <div className="text-xs font-medium opacity-90">100,000 rows loaded</div>
                  </div>
                </>
              ) : (
                <>
                  <Database className="w-5 h-5" />
                  <div>
                    <div>Sample Data</div>
                    <div className="text-xs font-medium text-slate-500">20 rows</div>
                  </div>
                </>
              )}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
