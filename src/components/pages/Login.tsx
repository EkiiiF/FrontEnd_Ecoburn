import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Leaf, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3BAA5C]/10 via-white to-[#3BAA5C]/5 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex flex-col items-center mb-8">
          {/* <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3BAA5C] mb-4">
            <Leaf className="w-8 h-8 text-white" />
          </div> */}
          <div className="flex items-center justify-center w-[120px] h-[120px] mb-4">
              <img 
                src="/EcoBurn_Logo.png"
                alt="EcoBurn Logo"
                className="w-full h-full object-contain"
              />
          </div>
          <h1 className="text-gray-900 text-center">Selamat Datang di EcoBurn</h1>
          <p className="text-gray-600 text-center mt-2">Masuk ke Akun Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Alamat Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="admin@ecoburn.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                // type="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 rounded-lg"
                required
              />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-600">Ingat Saya?</span>
            </label>
            <Link to="#" className="text-sm text-[#3BAA5C] hover:underline">
              Lupa Kata Sandi?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-[#3BAA5C] hover:bg-[#329450] rounded-lg">
            Masuk
          </Button>

          <p className="text-center text-sm text-gray-600">
            Belum Mempunyai Akun?{' '}
            <Link to="/register" className="text-[#3BAA5C] hover:underline">
              Daftar Sekarang
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
