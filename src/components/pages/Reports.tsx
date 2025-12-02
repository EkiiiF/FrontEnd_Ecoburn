import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { FileText, Download, FileSpreadsheet } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const monthlyData = [
  { month: 'Jan', waste: 12500, revenue: 18750, burns: 145 },
  { month: 'Feb', waste: 11800, revenue: 17700, burns: 138 },
  { month: 'Mar', waste: 13200, revenue: 19800, burns: 156 },
  { month: 'Apr', waste: 12900, revenue: 19350, burns: 151 },
  { month: 'May', waste: 14100, revenue: 21150, burns: 165 },
  { month: 'Jun', waste: 13600, revenue: 20400, burns: 159 },
  { month: 'Jul', waste: 14500, revenue: 21750, burns: 170 },
  { month: 'Aug', waste: 13900, revenue: 20850, burns: 163 },
  { month: 'Sep', waste: 14800, revenue: 22200, burns: 174 },
  { month: 'Oct', waste: 15200, revenue: 22800, burns: 178 },
  { month: 'Nov', waste: 14600, revenue: 21900, burns: 171 },
  { month: 'Dec', waste: 15500, revenue: 23250, burns: 182 },
];

const summaryStats = [
  { label: 'Total Limbah yang Diproses', value: '168.6 tons', change: '+15.2%' },
  { label: 'Total Pendapatan yang Dihasilkan', value: '$252,900', change: '+12.8%' },
  { label: 'Total Operasi Pembakaran', value: '1,952', change: '+8.5%' },
  { label: 'Efisiensi Rata-rata', value: '94.3%', change: '+2.1%' },
];

export default function Reports() {
  const handleExportPDF = () => {
    alert('Mengekspor laporan sebagai PDF...');
  };

  const handleExportExcel = () => {
    alert('Mengekspor laporan sebagai Excel...');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Laporan</h1>
          <p className="text-gray-600 mt-1">Analitik menyeluruh dan ekspor data</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Unduh Excel
          </Button>
          <Button
            className="bg-[#3BAA5C] hover:bg-[#329450] gap-2"
            onClick={handleExportPDF}
          >
            <Download className="w-4 h-4" />
            Unduh PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => (
          <Card key={index} className="p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="mt-2 text-gray-900">{stat.value}</p>
                <p className="text-sm text-[#3BAA5C] mt-2">{stat.change} dari tahun lalu</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#3BAA5C]/10">
                <FileText className="w-5 h-5 text-[#3BAA5C]" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Monthly Waste Processing Chart */}
      <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="mb-6">
          <h2 className="text-gray-900">Pengolahan Sampah Bulanan</h2>
          <p className="text-sm text-gray-600 mt-1">Total limbah yang diproses per bulan (kg)</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyData}>
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
            <Bar dataKey="waste" fill="#3BAA5C" radius={[8, 8, 0, 0]} name="Pembakaran (kg)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Monthly Revenue Chart */}
      <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="mb-6">
          <h2 className="text-gray-900">Tren Pendapatan Bulanan</h2>
          <p className="text-sm text-gray-600 mt-1">Pendapatan yang dihasilkan dari operasi (Rp)</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyData}>
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
              dataKey="revenue"
              stroke="#3BAA5C"
              strokeWidth={3}
              dot={{ fill: '#3BAA5C', r: 5 }}
              activeDot={{ r: 7 }}
              name="Pendapatan (Rp)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Monthly Operations Chart */}
      <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="mb-6">
          <h2 className="text-gray-900">Operasi Pembakaran Bulanan</h2>
          <p className="text-sm text-gray-600 mt-1">Jumlah operasi pembakaran per bulan</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyData}>
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
            <Bar dataKey="burns" fill="#2563eb" radius={[8, 8, 0, 0]} name="Operasi" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Detailed Report Summary */}
      <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-gray-900 mb-4">Laporan Ringkasan Akhir Tahun</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Pada Bulan (Pembakaran)</p>
              <p className="mt-1 text-gray-900">December - 15,500 kg</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Pada Bulan (Pendapatan)</p>
              <p className="mt-1 text-gray-900">December - $23,250</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Rata-rata Pembakaran Bulanan</p>
              <p className="mt-1 text-gray-900">14,050 kg</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Rata-rata Pendapatan Bulanan</p>
              <p className="mt-1 text-gray-900">$21,075</p>
            </div>
          </div>
          <div className="p-4 bg-[#3BAA5C]/5 rounded-lg border border-[#3BAA5C]/20">
            <p className="text-sm text-gray-600">Performa Sistem</p>
            <p className="mt-1 text-gray-900">
              Sistem EcoBurn mempertahankan efisiensi rata-rata yang sangat baik sebesar 94,3% sepanjang tahun, dengan pertumbuhan yang konsisten dalam kapasitas pengolahan limbah dan penghasilan.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
