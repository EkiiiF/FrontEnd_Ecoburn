import type { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="mt-2 text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trendUp ? 'text-[#3BAA5C]' : 'text-red-500'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#3BAA5C]/10">
          <Icon className="w-6 h-6 text-[#3BAA5C]" />
        </div>
      </div>
    </Card>
  );
}
