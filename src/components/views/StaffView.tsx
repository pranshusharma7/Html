'use client';

import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, Building } from 'lucide-react';
import { Staff } from '@/lib/types';

interface StaffViewProps {
  staff: Staff[];
  onAddFaculty: () => void;
}

export const StaffView: React.FC<StaffViewProps> = ({ staff, onAddFaculty }) => {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  const filtered = staff.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.designation.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || s.department.includes(selectedDept);
    return matchesSearch && matchesDept;
  });

  return (
    <div className="bg-card-surface rounded-3xl p-6 border border-card-border shadow-card-soft">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-main">Faculty & Staff Members</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Teaching faculty, departmental coordinators, qualifications, and payroll status
          </p>
        </div>

        <button
          onClick={onAddFaculty}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-pill text-white text-xs font-bold hover:bg-dark-hover transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search faculty by name, department or subject..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-card-border text-xs text-text-main outline-none focus:border-dark-pill transition-colors shadow-xs"
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-4 py-2 rounded-full bg-white border border-card-border text-xs font-semibold text-text-main outline-none cursor-pointer shadow-xs"
        >
          <option value="ALL">All Departments</option>
          <option value="Science">Science & Physics</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Languages">Languages & English</option>
          <option value="Computer">Computer Science & AI</option>
          <option value="Social">Social Sciences</option>
        </select>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl p-5 border border-card-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-dark-pill text-white font-bold flex items-center justify-center text-xs">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-accent-lime/60 text-dark-pill text-[10px] font-bold">
                  {member.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-text-main">{member.name}</h4>
              <p className="text-[11px] font-medium text-text-muted">{member.designation}</p>

              <div className="my-3 py-2 border-y border-card-border/60 flex flex-col gap-1 text-[11px] text-text-muted">
                <div className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-text-main" />
                  <span className="font-semibold text-text-main">{member.department}</span>
                </div>
                <div>Experience: <strong>{member.experience}</strong></div>
                <div>Qualification: <strong>{member.qualification}</strong></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-[11px] text-text-muted">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {member.phone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {member.email.split('@')[0]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
