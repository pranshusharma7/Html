'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Student } from '@/lib/types';

interface NewAdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Omit<Student, 'id'>) => void;
}

export const NewAdmissionModal: React.FC<NewAdmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    rollNo: string;
    class: string;
    section: string;
    gender: 'Male' | 'Female' | 'Other';
    dob: string;
    guardian: string;
    phone: string;
    email: string;
  }>({
    name: '',
    rollNo: '',
    class: '10',
    section: 'A',
    gender: 'Male',
    dob: '2010-05-14',
    guardian: '',
    phone: '',
    email: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNo || !formData.guardian) return;

    onSubmit({
      ...formData,
      admissionNo: `ADM-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Active',
      attendancePct: 100,
      feeStatus: 'Unpaid',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-app-panel border border-card-border rounded-4xl p-7 max-w-lg w-full shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-card-border mb-5">
          <div>
            <h3 className="text-xl font-bold text-text-main">New Student Admission</h3>
            <p className="text-xs text-text-muted mt-0.5">Enter academic and guardian records</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-card-surface hover:bg-black/10 flex items-center justify-center text-text-muted hover:text-text-main transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Aarav Sharma"
                className="w-full px-3.5 py-2 rounded-2xl bg-white border border-card-border text-xs outline-none focus:border-dark-pill"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Roll Number *</label>
              <input
                type="text"
                required
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                placeholder="e.g. 109"
                className="w-full px-3.5 py-2 rounded-2xl bg-white border border-card-border text-xs outline-none focus:border-dark-pill"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Class *</label>
              <select
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="w-full px-3 py-2 rounded-2xl bg-white border border-card-border text-xs outline-none"
              >
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Section *</label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full px-3 py-2 rounded-2xl bg-white border border-card-border text-xs outline-none"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Gender *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' | 'Other' })}
                className="w-full px-3 py-2 rounded-2xl bg-white border border-card-border text-xs outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Parent / Guardian Name *</label>
              <input
                type="text"
                required
                value={formData.guardian}
                onChange={(e) => setFormData({ ...formData, guardian: e.target.value })}
                placeholder="Parent Name"
                className="w-full px-3.5 py-2 rounded-2xl bg-white border border-card-border text-xs outline-none focus:border-dark-pill"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Contact Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 00000"
                className="w-full px-3.5 py-2 rounded-2xl bg-white border border-card-border text-xs outline-none focus:border-dark-pill"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-text-muted block mb-1">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="student@apexacademy.edu"
              className="w-full px-3.5 py-2 rounded-2xl bg-white border border-card-border text-xs outline-none focus:border-dark-pill"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-card-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-card-surface text-text-main text-xs font-bold hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-dark-pill text-white text-xs font-bold hover:bg-dark-hover transition-colors shadow-sm"
            >
              Enroll Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
