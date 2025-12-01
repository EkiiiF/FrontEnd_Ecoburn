import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Leaf, Mail, Lock, User, Building } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3BAA5C]/10 via-white to-[#3BAA5C]/5 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3BAA5C] mb-4">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 text-center">Buat Akun</h1>
          <p className="text-gray-600 text-center mt-2">Gabung Sistem Monitoring EcoBurn</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nama Lengkap</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="pl-10 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Alamat Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Komunitas</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="organization"
                name="organization"
                type="text"
                placeholder="Your Organization"
                value={formData.organization}
                onChange={handleChange}
                className="pl-10 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Kata Sandi</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-1 rounded border-gray-300" required />
            <span className="text-sm text-gray-600">
              I agree to the{' '}
              <Link to="#" className="text-[#3BAA5C] hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="#" className="text-[#3BAA5C] hover:underline">
                Privacy Policy
              </Link>
            </span>
          </div>

          <Button type="submit" className="w-full bg-[#3BAA5C] hover:bg-[#329450] rounded-lg">
            Buat Akun
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#3BAA5C] hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
