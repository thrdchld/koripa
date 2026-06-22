'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  FileArchive,
  Download,
  AlertOctagon,
  MessageSquareWarning,
  RefreshCw,
  ArrowRight,
  TrendingUp,
  Plus
} from 'lucide-react';

const placeholderMetrics = [
  { name: 'Total Products', value: '1,420', change: '+12%', type: 'increase', icon: ShoppingBag, color: 'text-blue-500 bg-blue-500/10' },
  { name: 'Review Queue', value: '38', change: '8 pending', type: 'info', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
  { name: 'Published Products', value: '1,280', change: 'Live', type: 'success', icon: CheckCircle, color: 'text-emerald-500 bg-emerald-500/10' },
  { name: 'Archived Products', value: '102', change: 'Soft deleted', type: 'muted', icon: FileArchive, color: 'text-zinc-500 bg-zinc-500/10' },
  { name: 'Active Import Queue', value: '1', change: 'Processing batch', type: 'info', icon: RefreshCw, color: 'text-indigo-500 bg-indigo-500/10' },
  { name: 'Failed Imports', value: '3', change: 'Requires retry', type: 'danger', icon: AlertOctagon, color: 'text-rose-500 bg-rose-500/10' },
  { name: 'User Reports', value: '12', change: '4 new', type: 'warning', icon: MessageSquareWarning, color: 'text-orange-500 bg-orange-500/10' },
  { name: 'Imports Today', value: '45', change: 'Batch #12', type: 'success', icon: Download, color: 'text-cyan-500 bg-cyan-500/10' },
];

const quickActions = [
  { name: 'Import Products', desc: 'Add Shopee product URLs in bulk', href: '/admin/import', icon: Download, actionText: 'Import' },
  { name: 'Review Queue', desc: 'Moderate scraped product data & AI outputs', href: '/admin/review', icon: Clock, actionText: 'Review' },
  { name: 'Create Collection', desc: 'Group products into themed collections', href: '/admin/collections', icon: Plus, actionText: 'Create' },
];

const recentActivities = [
  { action: 'Product published', detail: 'Rak Sepatu Lipat Portable', time: '10 mins ago', user: 'admin@koripa.com' },
  { action: 'AI analysis completed', detail: 'Sapu Wiper Karet Silicon', time: '23 mins ago', user: 'system_ai' },
  { action: 'Import session completed', detail: 'Batch #14 (48 URLs)', time: '1 hour ago', user: 'admin@koripa.com' },
  { action: 'User report received', detail: 'Link broken for "Gantungan Baju Estetik"', time: '3 hours ago', user: 'public_user' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Overview Dashboard
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Selamat datang kembali. Berikut ringkasan performa knowledge base KORIPA hari ini.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Link
            href="/admin/import"
            className="flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white dark:bg-zinc-50 dark:hover:bg-zinc-100 dark:text-zinc-950 font-semibold text-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Import Produk Baru
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {placeholderMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.name}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  {metric.name}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${metric.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">
                  {metric.value}
                </span>
                <span className={`text-xs font-semibold ${
                  metric.type === 'success' || metric.type === 'increase'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : metric.type === 'danger'
                    ? 'text-rose-600 dark:text-rose-400'
                    : metric.type === 'warning'
                    ? 'text-orange-600 dark:text-orange-400'
                    : 'text-zinc-500 dark:text-zinc-450'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action and Activity Panel */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Quick Actions Panel */}
        <div className="lg:col-span-1 flex flex-col p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
          <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50 mb-1">
            Quick Actions
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
            Akses cepat ke alur kerja kurator produk utama.
          </p>
          
          <div className="space-y-3 flex-1">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {action.name}
                      </h3>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {action.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-zinc-50 transition-colors">
                    <span>{action.actionText}</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activities Panel */}
        <div className="lg:col-span-2 flex flex-col p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
              Audit Logs & Activity
            </h2>
            <Link
              href="/admin/logs"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              Lihat Semua Logs
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
            Aktivitas terbaru dari akun administrator dan pemicu sistem otomatis.
          </p>

          <div className="flex-1 divide-y divide-zinc-100 dark:divide-zinc-850">
            {recentActivities.map((act, i) => (
              <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      {act.action}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium">
                      ({act.user})
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {act.detail}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-550 shrink-0">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
