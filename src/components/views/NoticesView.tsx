'use client';

import React from 'react';
import { Plus, Calendar } from 'lucide-react';
import { Notice } from '@/lib/types';

interface NoticesViewProps {
  notices: Notice[];
  onAddNotice: () => void;
  onDeleteNotice: (id: string) => void;
}

export const NoticesView: React.FC<NoticesViewProps> = ({
  notices,
  onAddNotice,
  onDeleteNotice,
}) => {
  return (
    <div className="bg-card-surface rounded-3xl p-6 border border-card-border shadow-card-soft">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-main">Official School Notice Board</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Institutional announcements, CBSE exam datesheets, and urgent alerts for parents & students
          </p>
        </div>

        <button
          onClick={onAddNotice}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-pill text-white text-xs font-bold hover:bg-dark-hover transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Publish Notice</span>
        </button>
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {notices.map((n) => (
          <div
            key={n.id}
            className="bg-white rounded-2xl p-5 border border-card-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    n.priority === 'Urgent'
                      ? 'bg-rose-100 text-rose-800'
                      : n.priority === 'High'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-accent-lime text-dark-pill'
                  }`}
                >
                  {n.priority} Priority
                </span>
                <span className="text-[10px] font-semibold text-text-muted">{n.category}</span>
              </div>

              <h4 className="text-sm font-bold text-text-main mb-2 leading-snug">{n.title}</h4>
              <p className="text-xs text-text-muted leading-relaxed mb-4">{n.content}</p>
            </div>

            <div className="pt-3 border-t border-card-border/60 flex items-center justify-between text-[11px] text-text-muted">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {n.date}
              </span>
              <button
                onClick={() => onDeleteNotice(n.id)}
                className="text-[10px] text-rose-600 hover:underline font-bold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
