'use client';

import React, { useState } from 'react';
import { 
  Users, 
  CalendarCheck, 
  CreditCard, 
  Bus, 
  Printer, 
  Send, 
  FileText 
} from 'lucide-react';
import { AuthUser } from '@/lib/auth';
import { FeeInvoice } from '@/lib/types';

interface ParentPortalProps {
  user: AuthUser;
  feeInvoice?: FeeInvoice;
  onOpenReceipt: (invoice: FeeInvoice) => void;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({
  user,
  feeInvoice,
  onOpenReceipt,
}) => {
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveDate, setLeaveDate] = useState('2026-10-26');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Teacher (Dr. Alok Nath)', text: 'Hello Mr. Sharma, Aarav has performed exceptionally well in the Physics practicals today.', time: 'Yesterday, 03:30 PM' },
    { sender: 'You', text: 'Thank you Sir! We are supporting him for the upcoming Science Exhibition model as well.', time: 'Yesterday, 05:15 PM' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessages([
      ...messages,
      { sender: 'You', text: messageText, time: 'Just now' },
    ]);
    setMessageText('');
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason.trim()) return;
    setLeaveSubmitted(true);
    setTimeout(() => {
      alert(`Leave application submitted to Class Teacher for ${leaveDate}!`);
      setLeaveReason('');
      setLeaveSubmitted(false);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Parent & Ward Welcome Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-card-border shadow-card-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-dark-pill shadow-md flex-shrink-0">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-accent-lime text-dark-pill text-[10px] font-extrabold">
                Parent / Guardian Portal
              </span>
              <span className="text-xs text-text-muted font-semibold">Ward: Aarav Sharma (Roll #101)</span>
            </div>
            <h1 className="text-2xl font-extrabold text-text-main mt-1">Welcome, {user.name}!</h1>
            <p className="text-xs text-text-muted mt-0.5">
              Ward: <strong>Aarav Sharma</strong> • Class 10-A • Class Teacher: Dr. Alok Nath Mukherjee
            </p>
          </div>
        </div>

        {feeInvoice && (
          <button
            onClick={() => onOpenReceipt(feeInvoice)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-dark-pill text-white text-xs font-bold hover:bg-dark-hover transition-all shadow-xs cursor-pointer flex-shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download Fee Receipt</span>
          </button>
        )}
      </div>

      {/* Ward Status KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Arrival Status */}
        <div className="bg-white rounded-3xl p-5 border border-card-border shadow-card-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted">Today&apos;s Status</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-2xl font-extrabold text-emerald-600">Present (On-Time)</div>
            <p className="text-[11px] text-text-muted mt-0.5">RFID Check-in: 08:14 AM at Gate 2</p>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">● Safe inside campus</span>
        </div>

        {/* Overall Attendance */}
        <div className="bg-white rounded-3xl p-5 border border-card-border shadow-card-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted">Cumulative Attendance</span>
            <div className="w-8 h-8 rounded-full bg-accent-lime text-dark-pill flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-2xl font-extrabold text-text-main">96% Presence</div>
            <p className="text-[11px] text-text-muted mt-0.5">112 of 116 sessions attended</p>
          </div>
          <span className="text-[10px] text-text-muted font-semibold">Exceeds 75% CBSE requirement</span>
        </div>

        {/* Fee Balance */}
        <div className="bg-white rounded-3xl p-5 border border-card-border shadow-card-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted">Fee Balance</span>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-2xl font-extrabold text-emerald-600">₹0 Pending</div>
            <p className="text-[11px] text-text-muted mt-0.5">Session 2026-27 dues cleared</p>
          </div>
          <span className="text-[10px] text-text-muted">Next term due in Jan 2027</span>
        </div>

        {/* Bus GPS Tracking */}
        <div className="bg-white rounded-3xl p-5 border border-card-border shadow-card-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted">Transport Tracker</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <Bus className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-lg font-extrabold text-text-main">Bus Route #4</div>
            <p className="text-[11px] text-text-muted mt-0.5">Driver: Ramesh Kumar (+91 98765 11223)</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-600">● Live GPS: Campus Parking</span>
        </div>
      </div>

      {/* Main Bottom Section: Teacher Connect & Leave Application */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Direct Teacher Chat */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-card-border shadow-card-soft flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-card-border mb-4">
              <div>
                <h3 className="text-base font-bold text-text-main">Message Class Teacher</h3>
                <p className="text-xs text-text-muted">Dr. Alok Nath Mukherjee • Science & Physics PGT</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Online" />
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[240px] pr-2">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl max-w-[85%] text-xs ${
                    m.sender === 'You'
                      ? 'ml-auto bg-dark-pill text-white'
                      : 'bg-card-surface text-text-main border border-card-border/60'
                  }`}
                >
                  <div className="font-bold text-[10px] opacity-80 mb-0.5">{m.sender}</div>
                  <p>{m.text}</p>
                  <div className="text-[9px] opacity-60 text-right mt-1">{m.time}</div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-3 border-t border-card-border">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type message to teacher..."
              className="flex-grow px-4 py-2 rounded-full bg-card-surface border border-card-border text-xs outline-none focus:border-dark-pill"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-dark-pill text-white flex items-center justify-center hover:bg-dark-hover transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Apply Student Leave Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-card-border shadow-card-soft">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-dark-pill" />
            <div>
              <h3 className="text-base font-bold text-text-main">Submit Student Leave</h3>
              <p className="text-xs text-text-muted">Notify school administration in advance</p>
            </div>
          </div>

          <form onSubmit={handleApplyLeave} className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Leave Date</label>
              <input
                type="date"
                required
                value={leaveDate}
                onChange={(e) => setLeaveDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-2xl bg-card-surface border border-card-border text-xs outline-none focus:border-dark-pill font-bold"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Reason for Absence</label>
              <textarea
                required
                rows={3}
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
                placeholder="e.g. Fever / Family Function / Medical Checkup"
                className="w-full px-3.5 py-2 rounded-2xl bg-card-surface border border-card-border text-xs outline-none focus:border-dark-pill resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={leaveSubmitted}
              className="w-full py-2.5 rounded-full bg-dark-pill text-white text-xs font-bold hover:bg-dark-hover transition-colors shadow-xs cursor-pointer"
            >
              {leaveSubmitted ? 'Submitting...' : 'Submit Leave Application'}
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-card-border text-[11px] text-text-muted">
            <span>Next PTM (Parent-Teacher Meeting): <strong>05 Nov 2026, 09:00 AM</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
