'use client';

import React from 'react';
import { 
  Search, 
  Bell, 
  LogOut, 
  ChevronDown
} from 'lucide-react';
import { AuthUser, DEMO_USERS, PortalRole, ROLE_DEFINITIONS } from '@/lib/auth';

interface AppNavbarProps {
  user: AuthUser;
  onLogout: () => void;
  onSwitchPortal: (role: PortalRole) => void;
  onOpenNotifications?: () => void;
}

export const AppNavbar: React.FC<AppNavbarProps> = ({
  user,
  onLogout,
  onSwitchPortal,
  onOpenNotifications,
}) => {
  const currentMeta = ROLE_DEFINITIONS[user.role];

  return (
    <header className="h-16 border-b border-card-border bg-white px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Quick Search */}
      <div className="flex items-center gap-4 flex-grow max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search students, staff, roll numbers, or notices... (⌘K)"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-card-surface/70 border border-card-border text-xs text-text-main outline-none focus:border-dark-pill focus:bg-white transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Right: Academic Session, 16-Role Switcher & Profile */}
      <div className="flex items-center gap-3">
        {/* Session Chip */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-surface border border-card-border text-[11px] font-bold text-text-muted">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>Session 2026-27 (CBSE)</span>
        </div>

        {/* 16-Role Quick Switcher Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-pill text-white text-xs font-bold shadow-xs hover:bg-dark-hover transition-colors cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-accent-lime inline-block" />
            <span className="max-w-[140px] truncate">{currentMeta?.title.split('(')[0]}</span>
            <ChevronDown className="w-3 h-3 text-white/60" />
          </button>

          {/* Switch Dropdown Menu - 16 Roles Organized */}
          <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-card-border rounded-2xl shadow-2xl py-2 hidden group-hover:block z-50 animate-in fade-in max-h-[480px] overflow-y-auto">
            <div className="px-3.5 py-1.5 border-b border-card-border flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold text-text-muted tracking-wider">
                Switch Between 16 Roles:
              </span>
              <span className="text-[9px] font-bold bg-accent-lime text-dark-pill px-2 py-0.5 rounded-full">
                16 RBAC
              </span>
            </div>

            {/* Role List Grouped */}
            <div className="p-1 space-y-1">
              {Object.entries(DEMO_USERS).map(([idKey, entry]) => {
                const isActive = user.role === entry.user.role;
                return (
                  <button
                    key={idKey}
                    onClick={() => onSwitchPortal(entry.user.role)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      isActive ? 'bg-card-surface font-bold text-dark-pill' : 'text-text-main hover:bg-card-surface/70'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-card-border flex-shrink-0">
                        <img src={entry.user.avatar} alt={entry.user.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-xs font-bold leading-tight">{entry.user.name}</div>
                        <div className="text-[10px] text-text-muted truncate font-mono">
                          ID: <strong className="text-dark-pill">{idKey}</strong> • {entry.user.role}
                        </div>
                      </div>
                    </div>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="w-9 h-9 rounded-full bg-card-surface border border-card-border flex items-center justify-center text-text-main hover:bg-black/5 transition-colors relative cursor-pointer"
          title="Circulars & Alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 border-2 border-white" />
        </button>

        {/* Logged in User Pill & Logout Button */}
        <div className="flex items-center gap-2 pl-2 border-l border-card-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-card-border flex-shrink-0">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-text-main leading-tight truncate max-w-[120px]">{user.name}</div>
              <div className="text-[10px] text-text-muted leading-tight font-medium font-mono">
                {user.identifier}
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
