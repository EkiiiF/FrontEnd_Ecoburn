import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Flame, 
  FileText, 
  Wrench,
  Menu,
  LogOut,
  Leaf
} from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { Outlet } from "react-router-dom";


const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Manajemen Anggota', href: '/members', icon: Users },
  { name: 'Riwayat Pembakaran', href: '/burning-history', icon: Flame },
  { name: 'Laporan', href: '/reports', icon: FileText },
  { name: 'Perawatan', href: '/maintenance', icon: Wrench },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-200">
            {/* <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#3BAA5C]">
              <Leaf className="w-6 h-6 text-white" />
            </div> */}
            <div className="flex items-center justify-center w-15 h-15">
              <img 
                src="/EcoBurn_Logo.png"
                alt="EcoBurn Logo"
                className="w-20 h-20 object-contain"
              />
            </div>

            <div>
              <h1 className="text-gray-900">EcoBurn</h1>
              <p className="text-sm text-gray-500">Sistem Monitoring</p>
            </div>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#3BAA5C]/10 text-[#3BAA5C]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-700 hover:text-red-600 hover:bg-red-50 cursor-pointer"
              onClick={() => window.location.href = '/login'}
            >
              <LogOut className="w-5 h-5" />
              Keluar
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 backdrop-blur-sm bg-white/10" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
            <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-200">
              {/* <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#3BAA5C]">
                <Leaf className="w-6 h-6 text-white" />
              </div> */}
              <div className="flex items-center justify-center w-15 h-15">
                <img 
                  src="/EcoBurn_Logo.png"
                  alt="EcoBurn Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>

              <div>
                <h1 className="text-gray-900">EcoBurn</h1>
                <p className="text-sm text-gray-500">Sistem Monitoring</p>
              </div>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#3BAA5C]/10 text-[#3BAA5C]'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-gray-200">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-gray-700 hover:text-red-600 hover:bg-red-50"
                onClick={() => window.location.href = '/login'}
              >
                <LogOut className="w-5 h-5" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="md:pl-64">
        <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 md:justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-4 cursor-pointer">
            <div className="hidden sm:block text-right">
              <p className="text-m text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@ecoburn.com</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#3BAA5C] flex items-center justify-center text-white">
              AU
            </div>
          </div>
        </header>
        <main className="p-6">
          {children}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
