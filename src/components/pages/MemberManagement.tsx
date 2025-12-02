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
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  subscription: 'Basic' | 'Premium' | 'Enterprise';
  status: 'Active' | 'Inactive';
  joinDate: string;
}

const initialMembers: Member[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 234-567-8901',
    subscription: 'Premium',
    status: 'Active',
    joinDate: '2024-01-15',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 234-567-8902',
    subscription: 'Basic',
    status: 'Active',
    joinDate: '2024-02-20',
  },
  {
    id: 3,
    name: 'Mike Williams',
    email: 'mike.w@example.com',
    phone: '+1 234-567-8903',
    subscription: 'Enterprise',
    status: 'Active',
    joinDate: '2024-03-10',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    phone: '+1 234-567-8904',
    subscription: 'Premium',
    status: 'Inactive',
    joinDate: '2024-04-05',
  },
  {
    id: 5,
    name: 'Robert Brown',
    email: 'robert.b@example.com',
    phone: '+1 234-567-8905',
    subscription: 'Basic',
    status: 'Active',
    joinDate: '2024-05-12',
  },
];

export default function MemberManagement() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    subscription: 'Basic',
  });

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = () => {
    const member: Member = {
      id: members.length + 1,
      ...newMember,
      subscription: newMember.subscription as 'Basic' | 'Premium' | 'Enterprise',
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
    };
    setMembers([...members, member]);
    setNewMember({ name: '', email: '', phone: '', subscription: 'Basic' });
    setIsAddDialogOpen(false);
  };

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'Basic':
        return 'bg-gray-100 text-gray-800';
      case 'Premium':
        return 'bg-[#3BAA5C]/10 text-[#3BAA5C]';
      case 'Enterprise':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Manajemen Anggota</h1>
          <p className="text-gray-600 mt-1">Kelola pelanggan dan keanggotaan Anda</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#3BAA5C] hover:bg-[#329450]">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Anggota
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Anggota Baru</DialogTitle>
              <DialogDescription>
                Isi detail anggota dan pilih paket langganan.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telephon</Label>
                <Input
                  id="phone"
                  placeholder="+62 123-456-789"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subscription">Paket Langganan</Label>
                <Select
                  value={newMember.subscription}
                  onValueChange={(value) => setNewMember({ ...newMember, subscription: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Dasar</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button
                onClick={handleAddMember}
                className="bg-[#3BAA5C] hover:bg-[#329450]"
              >
                Tambah Anggota
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card className="p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Cari anggota berdasarkan nama atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Members Table */}
      <Card className="rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Nomor Telephon</TableHead>
                <TableHead>Langganan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Bergabung</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>
                    <Badge className={getSubscriptionColor(member.subscription)}>
                      {member.subscription}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        member.status === 'Active'
                          ? 'bg-[#3BAA5C]/10 text-[#3BAA5C]'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
