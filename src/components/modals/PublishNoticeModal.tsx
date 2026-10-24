'use client';

import React, { useState } from 'react';
import { X, Bell } from 'lucide-react';
import { Notice } from '@/lib/types';

interface PublishNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (notice: Omit<Notice, 'id'>) => void;
}

export const PublishNoticeModal: React.FC<PublishNoticeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Academic' | 'Exam' | 'Event' | 'Holiday' | 'Urgent'>('Academic');
  const [priority, setPriority] = useState<'Urgent' | 'High' | 'Normal'>('Normal');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    onSubmit({
      title,
      category,
      priority,
      content,
      date: '24 Oct 2026',
      author: 'Principal Office',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
      <div className="bg-app-panel border border-card-border rounded-4xl p-7 max-w-md w-full shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-card-border mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent-lime flex items-center justify-center text-dark-pill">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main">Publish School Circular</h3>
              <p className="text-[11px] text-text-muted">Post notice to students, teachers & parents</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-card-surface hover:bg-black/10 flex items-center justify-center text-text-muted hover:text-text-main"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[11px] font-bold text-text-muted block mb-1">Circular Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Winter Break Schedule & Extra Classes"
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-card-border text-xs outline-none focus:border-dark-pill"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'Academic' | 'Exam' | 'Event' | 'Holiday' | 'Urgent')}
                className="w-full px-3 py-2 rounded-2xl bg-white border border-card-border text-xs outline-none"
              >
                <option value="Academic">Academic</option>
                <option value="Exam">Exam</option>
                <option value="Event">Event</option>
                <option value="Holiday">Holiday</option>
                <option value="Urgent">Urgent Alert</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'Urgent' | 'High' | 'Normal')}
                className="w-full px-3 py-2 rounded-2xl bg-white border border-card-border text-xs outline-none"
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-text-muted block mb-1">Announcement Details *</label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the full announcement text here..."
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-card-border text-xs outline-none focus:border-dark-pill resize-none"
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
              Publish to Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
