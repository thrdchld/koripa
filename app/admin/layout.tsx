'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@/services/supabase-browser.service';
import { useTheme } from '@/components/theme-provider';
import {
  LayoutDashboard,
  ShoppingBag,
  Download,
  FileCheck,
  FolderHeart,
  BookOpen,
  AlertTriangle,
  Settings,
  History,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  User,
  ChevronRight
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: ShoppingBag },
  { name: 'Import', href: '/admin/import', icon: Download },
  { name: 'Review Queue', href: '/admin/review', icon: FileCheck },
  { name: 'Collections', href: '/admin/collections', icon: FolderHeart },
  { name: 'Insights', href: '/admin/insights', icon: BookOpen },
  { name: 'Reports', href: '/admin/reports', icon: AlertTriangle },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Audit Logs', href: '/admin/logs', icon: History },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    // Get logged in admin email
    const getAdminUser = async () => {
      const supabase = createBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? 'Admin');
      }
    };
    getAdminUser();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.replace('/admin/login');
  };

  // Skip layout wrapper on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Get active menu name for breadcrumb
  const currentNav = navigationItems.find(item => item.href === pathname);
  const pageTitle = currentNav ? currentNav.name : 'Admin';

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 font-sans transition-colors duration-200">
      
      {/* 1. SIDEBAR (DESKTOP) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200/50 dark:border-zinc-800/50 h-full shrink-0">
        <div className="flex items-center gap-3 px-6 h-16 border-b border-zinc-200/50 dark:border-zinc-800/50">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
            K
          </div>
          <span className="font-bold text-base text-zinc-950 dark:text-zinc-50">KORIPA Admin</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-950 dark:hover:text-zinc-150'
                }`}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="flex items-center justify-between gap-3 mb-3 px-2">
            <div className="flex items-center gap-2 truncate">
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[120px]">
                {userEmail}
              </span>
            </div>
            
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center justify-center gap-2 w-full h-9 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 text-zinc-600 dark:text-zinc-400 text-xs font-semibold border border-zinc-200/60 dark:border-zinc-800 transition-colors disabled:opacity-50"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* 2. SIDEBAR (MOBILE OVERLAY) */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex flex-col w-64 bg-white dark:bg-zinc-900 h-full border-r border-zinc-200 dark:border-zinc-800 animate-slide-in">
            <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-200/50 dark:border-zinc-800/50">
              <span className="font-bold text-base text-zinc-950 dark:text-zinc-50">Menu Admin</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-zinc-150 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850 hover:text-zinc-950 dark:hover:text-zinc-150'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <div className="flex items-center justify-between gap-3 mb-3 px-2">
                <span className="text-xs text-zinc-500 truncate max-w-[150px]">{userEmail}</span>
                <button
                  onClick={toggleTheme}
                  className="w-8 h-8 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-colors"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full h-9 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 text-zinc-600 dark:text-zinc-400 text-xs font-semibold border border-zinc-200 dark:border-zinc-800 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 3. MAIN CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP BAR / NAVIGATION */}
        <header className="flex items-center justify-between px-4 lg:px-8 h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200/50 dark:border-zinc-800/50 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Title */}
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <span className="text-zinc-450 dark:text-zinc-550 hidden sm:inline">KORIPA</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 hidden sm:inline" />
              <span className="text-zinc-800 dark:text-zinc-200">{pageTitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg hover:bg-zinc-150 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
          </div>
        </header>

        {/* WORKSPACE AREA */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
