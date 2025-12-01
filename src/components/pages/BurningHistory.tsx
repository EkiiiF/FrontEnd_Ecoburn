import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import { Calendar, Filter } from 'lucide-react';

interface BurnRecord {
  id: number;
  date: string;
  time: string;
  wasteType: string;
  volume: number;
  temperature: number;
  duration: number;
  status: 'Completed' | 'In Progress' | 'Failed';
  operator: string;
}

const initialRecords: BurnRecord[] = [
  {
    id: 1,
    date: '2024-11-26',
    time: '08:30 AM',
    wasteType: 'Organic',
    volume: 450,
    temperature: 850,
    duration: 120,
    status: 'Completed',
    operator: 'John Smith',
  },
  {
    id: 2,
    date: '2024-11-26',
    time: '11:15 AM',
    wasteType: 'Plastic',
    volume: 320,
    temperature: 920,
    duration: 95,
    status: 'Completed',
    operator: 'Sarah Johnson',
  },
  {
    id: 3,
    date: '2024-11-25',
    time: '02:45 PM',
    wasteType: 'Mixed',
    volume: 580,
    temperature: 880,
    duration: 150,
    status: 'Completed',
    operator: 'Mike Williams',
  },
  {
    id: 4,
    date: '2024-11-25',
    time: '09:00 AM',
    wasteType: 'Organic',
    volume: 410,
    temperature: 840,
    duration: 110,
    status: 'Completed',
    operator: 'Emily Davis',
  },
  {
    id: 5,
    date: '2024-11-24',
    time: '01:30 PM',
    wasteType: 'Paper',
    volume: 290,
    temperature: 780,
    duration: 85,
    status: 'Failed',
    operator: 'Robert Brown',
  },
  {
    id: 6,
    date: '2024-11-24',
    time: '10:20 AM',
    wasteType: 'Plastic',
    volume: 360,
    temperature: 900,
    duration: 100,
    status: 'Completed',
    operator: 'John Smith',
  },
  {
    id: 7,
    date: '2024-11-23',
    time: '03:15 PM',
    wasteType: 'Mixed',
    volume: 520,
    temperature: 870,
    duration: 135,
    status: 'Completed',
    operator: 'Sarah Johnson',
  },
  {
    id: 8,
    date: '2024-11-23',
    time: '08:45 AM',
    wasteType: 'Organic',
    volume: 480,
    temperature: 860,
    duration: 125,
    status: 'Completed',
    operator: 'Mike Williams',
  },
];

export default function BurningHistory() {
  const [records] = useState<BurnRecord[]>(initialRecords);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filteredRecords = records.filter((record) => {
    const statusMatch = statusFilter === 'all' || record.status === statusFilter;
    const dateFromMatch = !dateFrom || record.date >= dateFrom;
    const dateToMatch = !dateTo || record.date <= dateTo;
    return statusMatch && dateFromMatch && dateToMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#3BAA5C]/10 text-[#3BAA5C]';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Riwayat Pembakaran</h1>
        <p className="text-gray-600 mt-1">View all waste burning records and operations</p>
      </div>

      {/* Filters */}
      <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Date From</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Date To</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Burns</p>
          <p className="mt-2 text-gray-900">{filteredRecords.length}</p>
        </Card>
        <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="mt-2 text-[#3BAA5C]">
            {filteredRecords.filter((r) => r.status === 'Completed').length}
          </p>
        </Card>
        <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Failed</p>
          <p className="mt-2 text-red-600">
            {filteredRecords.filter((r) => r.status === 'Failed').length}
          </p>
        </Card>
        <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Volume</p>
          <p className="mt-2 text-gray-900">
            {filteredRecords.reduce((sum, r) => sum + r.volume, 0)} kg
          </p>
        </Card>
      </div>

      {/* Records Table */}
      <Card className="rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Waste Type</TableHead>
                <TableHead>Volume (kg)</TableHead>
                <TableHead>Temperature (°C)</TableHead>
                <TableHead>Duration (min)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Operator</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>#{record.id}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.time}</TableCell>
                  <TableCell>{record.wasteType}</TableCell>
                  <TableCell>{record.volume}</TableCell>
                  <TableCell>{record.temperature}</TableCell>
                  <TableCell>{record.duration}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                  </TableCell>
                  <TableCell>{record.operator}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
