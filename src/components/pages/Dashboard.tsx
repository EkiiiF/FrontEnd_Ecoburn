import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import StatCard from '../StatCard';
import { Trash2, DollarSign, Users, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const wasteDataDaily = [
  { date: 'Mon', volume: 450 },
  { date: 'Tue', volume: 520 },
  { date: 'Wed', volume: 380 },
  { date: 'Thu', volume: 610 },
  { date: 'Fri', volume: 550 },
  { date: 'Sat', volume: 420 },
  { date: 'Sun', volume: 390 },
];

const wasteDataWeekly = [
  { week: 'Week 1', volume: 2850 },
  { week: 'Week 2', volume: 3120 },
  { week: 'Week 3', volume: 2940 },
  { week: 'Week 4', volume: 3340 },
];

const wasteDataMonthly = [
  { month: 'Jan', volume: 12500 },
  { month: 'Feb', volume: 11800 },
  { month: 'Mar', volume: 13200 },
  { month: 'Apr', volume: 12900 },
  { month: 'May', volume: 14100 },
  { month: 'Jun', volume: 13600 },
];

const subscriberPrediction = [
  { month: 'Jul', subscribers: 145 },
  { month: 'Aug', subscribers: 158 },
  { month: 'Sep', subscribers: 172 },
  { month: 'Oct', subscribers: 185 },
  { month: 'Nov', subscribers: 198 },
  { month: 'Dec', subscribers: 212 },
];

export default function Dashboard() {
  const [wasteFilter, setWasteFilter] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const getWasteData = () => {
    switch (wasteFilter) {
      case 'daily':
        return wasteDataDaily;
      case 'weekly':
        return wasteDataWeekly;
      case 'monthly':
        return wasteDataMonthly;
      default:
        return wasteDataDaily;
    }
  };

  const getWasteXKey = () => {
    switch (wasteFilter) {
      case 'daily':
        return 'date';
      case 'weekly':
        return 'week';
      case 'monthly':
        return 'month';
      default:
        return 'date';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Selamat Datang di Sistem Monitoring EcoBurn</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Limbah yang Diproses"
          value="45.2 tons"
          icon={Trash2}
          trend="+12.5% dari bulan lalu"
          trendUp={true}
        />
        <StatCard
          title="Total Pendapatan"
          value="$28,450"
          icon={DollarSign}
          trend="+8.3% dari bulan lalu"
          trendUp={true}
        />
        <StatCard
          title="Pelanggan Aktif"
          value="145"
          icon={Users}
          trend="+5 dari bulan lalu"
          trendUp={true}
        />
      </div>

      {/* Waste Volume Statistics */}
      <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-gray-900">Statistik Volume Limbah</h2>
            <p className="text-sm text-gray-600 mt-1">Lacak pengolahan limbah dari waktu ke waktu</p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={wasteFilter === 'daily' ? 'default' : 'outline'}
              onClick={() => setWasteFilter('daily')}
              className={wasteFilter === 'daily' ? 'bg-[#3BAA5C] hover:bg-[#329450]' : ''}
            >
              Hari
            </Button>
            <Button
              size="sm"
              variant={wasteFilter === 'weekly' ? 'default' : 'outline'}
              onClick={() => setWasteFilter('weekly')}
              className={wasteFilter === 'weekly' ? 'bg-[#3BAA5C] hover:bg-[#329450]' : ''}
            >
              Minggu
            </Button>
            <Button
              size="sm"
              variant={wasteFilter === 'monthly' ? 'default' : 'outline'}
              onClick={() => setWasteFilter('monthly')}
              className={wasteFilter === 'monthly' ? 'bg-[#3BAA5C] hover:bg-[#329450]' : ''}
            >
              Bulan
            </Button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getWasteData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey={getWasteXKey()} stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="volume" fill="#3BAA5C" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Subscriber Prediction Chart */}
      <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-start gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#3BAA5C]/10">
            <TrendingUp className="w-5 h-5 text-[#3BAA5C]" />
          </div>
          <div>
            <h2 className="text-gray-900">Prediksi Pertumbuhan Pelanggan</h2>
            <p className="text-sm text-gray-600 mt-1">Perkiraan jumlah pelanggan untuk 6 bulan ke depan</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={subscriberPrediction}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="subscribers"
              stroke="#3BAA5C"
              strokeWidth={3}
              dot={{ fill: '#3BAA5C', r: 5 }}
              activeDot={{ r: 7 }}
              name="Perkiraan Pelanggan"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Pembakaran Hari Ini</p>
          <p className="mt-2 text-gray-900">12</p>
        </Card>
        <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Rata-rata Pembakaran</p>
          <p className="mt-2 text-gray-900">94.5%</p>
        </Card>
        <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Perawatan</p>
          <p className="mt-2 text-gray-900">3 items</p>
        </Card>
        <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Waktu Aktif Sistem</p>
          <p className="mt-2 text-gray-900">99.8%</p>
        </Card>
      </div>
    </div>
  );
}
