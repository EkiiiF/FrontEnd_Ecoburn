import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import { Plus, Wrench, Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

interface MaintenanceRecord {
  id: number;
  date: string;
  equipment: string;
  type: 'Routine' | 'Emergency' | 'Preventive';
  status: 'Completed' | 'Scheduled' | 'In Progress';
  technician: string;
  description: string;
  cost: number;
}

const initialRecords: MaintenanceRecord[] = [
  {
    id: 1,
    date: '2024-11-26',
    equipment: 'Insinerator Utama',
    type: 'Routine',
    status: 'Completed',
    technician: 'John Smith',
    description: 'Regular inspection and cleaning of combustion chamber',
    cost: 450,
  },
  {
    id: 2,
    date: '2024-11-28',
    equipment: 'Air Filter System',
    type: 'Preventive',
    status: 'Scheduled',
    technician: 'Sarah Johnson',
    description: 'Filter replacement and air quality check',
    cost: 320,
  },
  {
    id: 3,
    date: '2024-11-25',
    equipment: 'Temperature Sensor',
    type: 'Emergency',
    status: 'Completed',
    technician: 'Mike Williams',
    description: 'Sensor calibration after malfunction alert',
    cost: 180,
  },
  {
    id: 4,
    date: '2024-11-27',
    equipment: 'Conveyor Belt',
    type: 'Routine',
    status: 'In Progress',
    technician: 'Emily Davis',
    description: 'Belt tension adjustment and lubrication',
    cost: 150,
  },
  {
    id: 5,
    date: '2024-11-23',
    equipment: 'Control Panel',
    type: 'Preventive',
    status: 'Completed',
    technician: 'Robert Brown',
    description: 'Software update and system diagnostics',
    cost: 200,
  },
  {
    id: 6,
    date: '2024-12-01',
    equipment: 'Secondary Chamber',
    type: 'Routine',
    status: 'Scheduled',
    technician: 'John Smith',
    description: 'Monthly inspection and maintenance',
    cost: 380,
  },
];

export default function MaintenanceLog() {
  const [records, setRecords] = useState<MaintenanceRecord[]>(initialRecords);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    equipment: '',
    type: 'Routine',
    technician: '',
    description: '',
    cost: '',
    date: '',
  });

  const handleAddRecord = () => {
    const record: MaintenanceRecord = {
      id: records.length + 1,
      date: newRecord.date,
      equipment: newRecord.equipment,
      type: newRecord.type as 'Routine' | 'Emergency' | 'Preventive',
      status: 'Scheduled',
      technician: newRecord.technician,
      description: newRecord.description,
      cost: Number(newRecord.cost),
    };
    setRecords([record, ...records]);
    setNewRecord({
      equipment: '',
      type: 'Routine',
      technician: '',
      description: '',
      cost: '',
      date: '',
    });
    setIsAddDialogOpen(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'Scheduled':
        return <Clock className="w-4 h-4" />;
      case 'In Progress':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#3BAA5C]/10 text-[#3BAA5C]';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Routine':
        return 'bg-gray-100 text-gray-800';
      case 'Emergency':
        return 'bg-red-100 text-red-800';
      case 'Preventive':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalCost = records.reduce((sum, record) => sum + record.cost, 0);
  const completedCount = records.filter((r) => r.status === 'Completed').length;
  const scheduledCount = records.filter((r) => r.status === 'Scheduled').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Perawatan</h1>
          <p className="text-gray-600 mt-1">Lacak semua aktivitas dan jadwal pemeliharaan</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#3BAA5C] hover:bg-[#329450]">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Perawatan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Catatan Perawatan</DialogTitle>
              <DialogDescription>
                Jadwalkan atau catat aktivitas pemeliharaan untuk sistem.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="equipment">Peralatan</Label>
                <Input
                  id="equipment"
                  placeholder="e.g., Insinerator Utama"
                  value={newRecord.equipment}
                  onChange={(e) => setNewRecord({ ...newRecord, equipment: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipe Perawatan</Label>
                <Select
                  value={newRecord.type}
                  onValueChange={(value) => setNewRecord({ ...newRecord, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Routine">Rutinitas</SelectItem>
                    <SelectItem value="Emergency">Darurat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="technician">Teknisi</Label>
                <Input
                  id="technician"
                  placeholder="Teknisi yang ditugaskan"
                  value={newRecord.technician}
                  onChange={(e) => setNewRecord({ ...newRecord, technician: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal</Label>
                <Input
                  id="date"
                  type="date"
                  value={newRecord.date}
                  onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Estimasi Biaya ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  placeholder="0.00"
                  value={newRecord.cost}
                  onChange={(e) => setNewRecord({ ...newRecord, cost: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  placeholder="Deskripsi aktivitas pemeliharaan..."
                  value={newRecord.description}
                  onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button
                onClick={handleAddRecord}
                className="bg-[#3BAA5C] hover:bg-[#329450]"
              >
                Tambah Catatan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Catatan</p>
          <p className="mt-2 text-gray-900">{records.length}</p>
        </Card>
        <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Selesai</p>
          <p className="mt-2 text-[#3BAA5C]">{completedCount}</p>
        </Card>
        <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Dijadwalkan</p>
          <p className="mt-2 text-blue-600">{scheduledCount}</p>
        </Card>
        <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Biaya</p>
          <p className="mt-2 text-gray-900">Rp. {totalCost.toLocaleString()}</p>
        </Card>
      </div>

      {/* Maintenance Records List */}
      <div className="space-y-4">
        {records.map((record) => (
          <Card key={record.id} className="p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#3BAA5C]/10 flex-shrink-0">
                  <Wrench className="w-6 h-6 text-[#3BAA5C]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-gray-900">{record.equipment}</h3>
                    <Badge className={getTypeColor(record.type)}>{record.type}</Badge>
                    <Badge className={getStatusColor(record.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(record.status)}
                        {record.status}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{record.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {record.date}
                    </span>
                    <span>Teknisi: {record.technician}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 lg:flex-col lg:items-end">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Biaya</p>
                  <p className="text-gray-900">Rp. {record.cost}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
