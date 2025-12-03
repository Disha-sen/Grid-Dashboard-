import React, { useCallback, useMemo, useState } from 'react';
import DataGrid from './DataGrid';

import { Employee } from '../types/employee';
import sampleData from '../data/sample-data.json';
import { generateSyntheticData } from '../utils/syntheticDataGenerator';
import { BarChart3, Users, Activity, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(sampleData.employees);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDataSourceChange = useCallback((useSynthetic: boolean) => {
    setIsLoading(true);
    // Simulate network delay for smooth transition
    setTimeout(() => {
      if (useSynthetic) {
        const syntheticEmployees = generateSyntheticData(100000);
        setEmployees(syntheticEmployees);
      } else {
        setEmployees(sampleData.employees);
      }
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1500);
  }, []);

  const stats = useMemo(() => {
    const activeCount = employees.filter((emp) => emp.isActive).length;
    const departments = new Set(employees.map((emp) => emp.department)).size;
    return {
      total: employees.length,
      active: activeCount,
      departments,
    };
  }, [employees]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const StatsSkeleton = () => (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-white/10" />
        <div className="w-16 h-3 bg-white/10 rounded-full" />
      </div>
      <div className="w-24 h-8 bg-white/10 rounded-lg mb-2" />
      <div className="w-32 h-3 bg-white/10 rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-8 transition-all duration-300">
      {/* Modern Compact Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shrink-0">
              <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">FactWise Dashboard</h1>
              <p className="text-purple-200 text-xs md:text-sm">Workforce Analytics & Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 self-start md:self-auto">
            <div
              className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-400 animate-bounce' : 'bg-emerald-400 animate-pulse'}`}
            ></div>
            <span className="text-xs md:text-sm text-white font-medium">
              {isLoading ? 'Updating...' : `Live · ${formatDate(lastUpdated)}`}
            </span>
          </div>
        </div>

        {/* Modern Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isLoading ? (
            <>
              <StatsSkeleton />
              <StatsSkeleton />
              <StatsSkeleton />
            </>
          ) : (
            <>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-300" />
                  </div>
                  <span className="text-xs text-purple-200 font-semibold">TOTAL</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1 animate-slide-up">
                  {stats.total.toLocaleString()}
                </div>
                <div className="text-sm text-purple-200">Total Employees</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-emerald-300" />
                  </div>
                  <span className="text-xs text-purple-200 font-semibold">ACTIVE</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1 animate-slide-up">
                  {stats.active.toLocaleString()}
                </div>
                <div className="text-sm text-purple-200">
                  {((stats.active / stats.total) * 100).toFixed(1)}% Active Rate
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-300" />
                  </div>
                  <span className="text-xs text-purple-200 font-semibold">DEPARTMENTS</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1 animate-slide-up">
                  {stats.departments}
                </div>
                <div className="text-sm text-purple-200">Active Departments</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Data Grid Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 transition-all duration-300 overflow-hidden">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Employee Directory</h2>
          <p className="text-purple-200 text-xs md:text-sm">
            Manage and analyze your workforce data in real-time
          </p>
        </div>
        <DataGrid
          data={employees}
          onDataSourceChange={handleDataSourceChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
