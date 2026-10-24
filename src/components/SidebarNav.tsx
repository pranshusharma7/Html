'use client';

import React from 'react';
import { 
  Plus, 
  Home, 
  Share2, 
  Building2, 
  Link as LinkIcon, 
  Globe, 
  MoreHorizontal, 
  BookOpen, 
  Rocket, 
  HelpCircle 
} from 'lucide-react';

interface SidebarNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, onTabChange }) => {
  const topNavItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'branches', icon: Share2, label: 'Branches' },
    { id: 'academics', icon: Building2, label: 'Academics' },
    { id: 'integrations', icon: LinkIcon, label: 'Integrations' },
    { id: 'portal', icon: Globe, label: 'Portals' },
    { id: 'more', icon: MoreHorizontal, label: 'More' },
  ];

  const bottomNavItems = [
    { id: 'library', icon: BookOpen, label: 'Library' },
    { id: 'innovations', icon: Rocket, label: 'AI Labs' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
  ];

  return (
    <aside className="w-[72px] bg-dark-pill rounded-[36px] flex flex-col items-center py-6 justify-between shadow-2xl flex-shrink-0 z-20">
      {/* Top Logo / Plus Icon inside Circle */}
      <div className="flex flex-col items-center gap-6">
        <button 
          onClick={() => onTabChange('dashboard')}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          title="Apex ERP Hub"
        >
          <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
        </button>

        {/* Primary Navigation Icons */}
        <nav className="flex flex-col items-center gap-3">
          {topNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (activeTab === 'dashboard' && item.id === 'academics');
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                title={item.label}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 relative ${
                  isActive 
                    ? 'bg-[#26292E] text-white shadow-inner' 
                    : 'text-white/45 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[1.75]" />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Nav Items & User Avatar */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                title={item.label}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                  isActive ? 'bg-[#26292E] text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        {/* User Profile Avatar Pill at bottom */}
        <div className="pt-2">
          <div className="relative cursor-pointer group">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-accent-lime transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Super Administrator"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent-lime rounded-full border-2 border-dark-pill" />
          </div>
        </div>
      </div>
    </aside>
  );
};
