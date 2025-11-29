import React from 'react';
import { TrendingUp, Users, Activity, Zap } from 'lucide-react';

interface StatsCardProps {
  totalRecords: number;
  activeEmployees: number;
  departments: number;
  lastUpdated: Date;
}

const StatsCard: React.FC<StatsCardProps> = ({
  totalRecords,
  activeEmployees,
  departments,
}) => {
  const activePercentage = ((activeEmployees / totalRecords) * 100).toFixed(1);
  const avgPerDept = (totalRecords / departments).toFixed(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
      {/* Total Employees - Indigo Theme */}
      <div className="group relative glass-strong rounded-2xl p-6 overflow-hidden card-hover">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
              <Zap className="w-4 h-4 text-indigo-500 animate-pulse" />
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-600 tracking-tight">Total Employees</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-count">
                  {totalRecords.toLocaleString()}
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {avgPerDept} avg per department
              </p>
            </div>
          </div>
          
          {/* Floating Badge */}
          <div className="absolute top-4 right-4 px-2.5 py-1 bg-indigo-100/80 backdrop-blur-sm rounded-full">
            <span className="text-xs font-bold text-indigo-700">100%</span>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Active Employees - Emerald Theme */}
      <div className="group relative glass-strong rounded-2xl p-6 overflow-hidden card-hover">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-glow">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-glow" />
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-600 tracking-tight">Active Employees</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent animate-count">
                  {activeEmployees.toLocaleString()}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                    style={{ width: `${activePercentage}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-emerald-700">{activePercentage}%</span>
              </div>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100/80 backdrop-blur-sm rounded-full">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-emerald-700">Live</span>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Departments - Purple Theme */}
      <div className="group relative glass-strong rounded-2xl p-6 overflow-hidden card-hover">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-glow">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
              <div className="flex gap-0.5">
                <div className="w-1 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-5 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-600 tracking-tight">Departments</p>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent animate-count">
                  {departments}
                </h3>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 rounded-full">
                  <TrendingUp className="w-3 h-3 text-purple-600" />
                  <span className="text-xs font-bold text-purple-700">+2</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Across all locations
              </p>
            </div>
          </div>
          
          {/* Growth Indicator */}
          <div className="absolute top-4 right-4 px-2.5 py-1 bg-purple-100/80 backdrop-blur-sm rounded-full">
            <span className="text-xs font-bold text-purple-700">Growth</span>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};

export default StatsCard;