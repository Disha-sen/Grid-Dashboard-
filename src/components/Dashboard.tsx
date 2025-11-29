import React, { useCallback, useMemo, useState } from 'react';
import DataGrid from './DataGrid';
import StatsCard from './StatsCard';
import { Employee } from '../types/employee';
import sampleData from '../data/sample-data.json';
import { generateSyntheticData } from '../utils/syntheticDataGenerator';
import { Sparkles, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(sampleData.employees);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const handleDataSourceChange = useCallback((useSynthetic: boolean) => {
    if (useSynthetic) {
      const syntheticEmployees = generateSyntheticData(100000);
      setEmployees(syntheticEmployees);
    } else {
      setEmployees(sampleData.employees);
    }
    setLastUpdated(new Date());
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

  return (
    <div className="min-h-screen flex flex-col gradient-mesh">
      {/* Ultra Premium Hero Header */}
      <header className="relative overflow-hidden animate-slide-down">
        {/* Multi-layer Gradient Background */}
        <div className="absolute inset-0 gradient-primary opacity-95" />

        {/* Animated Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"
            style={{ backgroundSize: '200% 100%' }}
          />
        </div>

        <div className="relative px-6 py-12 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Left: Branding & Title */}
              <div className="flex-1 space-y-4">
                {/* Logo Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full border border-white/30">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-semibold text-white tracking-tight">FactWise</span>
                </div>

                {/* Main Title */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none">
                  FactWise Dashboard
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-white/80 font-medium max-w-2xl leading-relaxed">
                  Efficiently manage and analyze your workforce data.
                </p>

                {/* Quick Stats Pills */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-xl rounded-xl border border-white/20">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-white">Live Data</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-xl rounded-xl border border-white/20">
                    <Clock className="w-4 h-4 text-white/80" />
                    <span className="text-sm text-white/90">{formatDate(lastUpdated)}</span>
                  </div>
                </div>
              </div>

              {/* Right: Status Card */}
              <div className="lg:flex-shrink-0">
                <div className="glass-strong rounded-2xl p-6 border border-white/30 shadow-premium max-w-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">System Status</span>
                      <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 rounded-full">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-emerald-700">Operational</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500 font-medium">Total Records</p>
                        <p className="text-2xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          {employees.length.toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500 font-medium">Active Now</p>
                        <p className="text-2xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          {stats.active.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Performance</span>
                        <span className="font-bold text-emerald-600">Excellent</span>
                      </div>
                      <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[96%] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(248, 250, 252, 0)" />
                <stop offset="100%" stopColor="rgba(248, 250, 252, 1)" />
              </linearGradient>
            </defs>
            <path
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="url(#wave-gradient)"
            />
            <path
              d="M0,96L48,90.7C96,85,192,75,288,74.7C384,75,480,85,576,90.7C672,96,768,96,864,90.7C960,85,1056,75,1152,69.3C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="rgba(248, 250, 252, 1)"
            />
          </svg>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-8 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Stats Overview */}
          <StatsCard
            totalRecords={stats.total}
            activeEmployees={stats.active}
            departments={stats.departments}
            lastUpdated={lastUpdated}
          />

          {/* Data Grid Section */}
          <DataGrid data={employees} onDataSourceChange={handleDataSourceChange} />
        </div>
      </main>

      {/* Premium Footer */}
      <footer className="relative mt-auto">
        <div className="glass-strong border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">FactWise Analytics</p>
                  <p className="text-xs text-slate-500">© 2025 All rights reserved</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg font-medium">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                  AG Grid Quartz
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg font-medium">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  React 18
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg font-medium">
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                  TypeScript
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
