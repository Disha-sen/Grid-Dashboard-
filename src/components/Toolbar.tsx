import React, { useState } from 'react';
import { Search, X, Columns3, ChevronDown, ArrowDownToLine, Filter, Database } from 'lucide-react';

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

  const visibleColumns = columns.filter((col) => col.visible).length;

  return (
    <div className="glass-strong rounded-2xl p-4 md:p-6 mb-6 animate-slide-up border border-white/10 shadow-float relative overflow-visible z-50">
      {/* Top Row: Search and Primary Actions */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-5">
        {/* Enhanced Search Box */}
        <div className="flex-1 min-w-0 w-full lg:max-w-xl">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-200" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search employees..."
              className="w-full pl-12 pr-12 py-3 md:py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-xl
                       focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-slate-800
                       transition-all duration-200 text-sm font-medium placeholder:text-slate-400 text-white
                       shadow-sm hover:border-slate-600"
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
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 items-center justify-start md:justify-end w-full lg:w-auto">
          <button
            onClick={onExportCSV}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 md:px-5 py-3 bg-gradient-to-br from-emerald-600 to-teal-600 
                     text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold text-sm shadow-lg shadow-emerald-500/20 active:scale-95 touch-manipulation"
          >
            <ArrowDownToLine className="w-4 h-4" />
            <span>Export</span>
          </button>

          {selectedRowsCount > 0 && (
            <button
              onClick={onClearSelection}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 md:px-5 py-3 bg-slate-700 text-white rounded-xl 
                       hover:bg-slate-600 transition-all font-semibold text-sm shadow-lg shadow-slate-500/20 active:scale-95 touch-manipulation"
            >
              <X className="w-4 h-4" />
              <span className="whitespace-nowrap">Clear ({selectedRowsCount})</span>
            </button>
          )}

          <div className="relative z-[10000] flex-1 md:flex-none">
            <button
              onClick={() => setShowColumnMenu(!showColumnMenu)}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 md:px-5 py-3 bg-white/10 border-2 border-purple-400/30 
                       text-white rounded-xl hover:bg-white/15 hover:border-purple-400/50 transition-all font-semibold text-sm active:scale-95 touch-manipulation"
            >
              <Columns3 className="w-4 h-4" />
              <span>Columns</span>
              <span className="px-2 py-0.5 bg-purple-500/30 rounded-full text-xs">
                {visibleColumns}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showColumnMenu ? 'rotate-180' : ''}`}
              />
            </button>

            {showColumnMenu && (
              <>
                <div className="fixed inset-0 z-[9998]" onClick={() => setShowColumnMenu(false)} />
                <div className="absolute top-full right-0 mt-2 w-full md:w-[400px] glass-strong border border-purple-400/30 rounded-xl shadow-2xl z-[9999] animate-slide-down">
                  <div className="p-4 border-b border-purple-400/30">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white flex items-center gap-2">
                        <Filter className="w-4 h-4 text-purple-400" />
                        Column Visibility
                      </h3>
                      <button
                        onClick={() => setShowColumnMenu(false)}
                        className="p-1 hover:bg-purple-500/30 rounded"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <p className="text-xs text-purple-300 mt-1">
                      {visibleColumns} of {columns.length} visible
                    </p>
                  </div>
                  <div className="p-3 max-h-[300px] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {columns.map((col) => (
                        <label
                          key={col.colId}
                          className="flex items-center gap-2 p-2 hover:bg-purple-500/20 rounded-lg cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={col.visible}
                            onChange={(e) => onColumnVisibilityChange(col.colId, e.target.checked)}
                            className="w-4 h-4 rounded border-2 border-purple-400 bg-white/10 cursor-pointer"
                          />
                          <span className="text-xs text-white font-medium">{col.headerName}</span>
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

      {/* Bottom Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-5 border-t border-purple-400/30">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <label className="text-sm font-bold text-white">Rows per page</label>
          <div className="relative">
            <select
              value={currentPageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="appearance-none pl-4 pr-10 py-2.5 bg-slate-800/50 border-2 border-purple-400/30 rounded-xl
                       text-sm font-bold text-white cursor-pointer transition-all hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              {[10, 20, 50, 100].map((size) => (
                <option key={size} value={size} className="bg-slate-900">
                  {size} rows
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300 pointer-events-none" />
          </div>
        </div>

        {onDataSourceChange && (
          <button
            onClick={() => {
              const newValue = !useSyntheticData;
              setUseSyntheticData(newValue);
              onDataSourceChange(newValue);
            }}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-xl transition-all font-bold text-sm
              ${
                useSyntheticData
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-slate-800/50 text-white hover:bg-slate-700/50 border-2 border-purple-400/30'
              }`}
          >
            <Database className="w-4 h-4" />
            <span>{useSyntheticData ? 'Performance Mode ON' : 'Sample Data'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
