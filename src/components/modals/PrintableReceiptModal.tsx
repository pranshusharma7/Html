'use client';

import React from 'react';
import { X, Printer } from 'lucide-react';
import { FeeInvoice } from '@/lib/types';

interface PrintableReceiptModalProps {
  invoice: FeeInvoice | null;
  onClose: () => void;
}

export const PrintableReceiptModal: React.FC<PrintableReceiptModalProps> = ({
  invoice,
  onClose,
}) => {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-card-border rounded-4xl p-8 max-w-lg w-full shadow-2xl relative">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-card-border mb-6">
          <h3 className="text-lg font-bold text-text-main">Official Fee Receipt</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-card-surface hover:bg-black/10 flex items-center justify-center text-text-muted hover:text-text-main transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Area */}
        <div id="receipt-print-area" className="relative p-6 border border-card-border rounded-2xl bg-white mb-6">
          {/* PAID Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-8 -rotate-12">
            <span className="text-7xl font-black text-emerald-600 tracking-widest">PAID</span>
          </div>

          {/* School Letterhead */}
          <div className="text-center pb-4 border-b-2 border-dashed border-card-border mb-4">
            <h2 className="text-xl font-extrabold text-text-main">Apex International Academy</h2>
            <p className="text-[11px] text-text-muted">CBSE Affiliated • Institutional Area, Greater Noida, UP</p>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-1">Official Payment Voucher</p>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-3 text-xs mb-5">
            <div>
              <span className="text-[10px] text-text-muted block">Receipt No:</span>
              <strong className="text-text-main">{invoice.receiptNo || 'REC-2026-8801'}</strong>
            </div>
            <div>
              <span className="text-[10px] text-text-muted block">Payment Date:</span>
              <strong className="text-text-main">{invoice.lastPaymentDate || '24 Oct 2026'}</strong>
            </div>
            <div>
              <span className="text-[10px] text-text-muted block">Student Name:</span>
              <strong className="text-text-main">{invoice.studentName}</strong>
            </div>
            <div>
              <span className="text-[10px] text-text-muted block">Class & Section:</span>
              <strong className="text-text-main">Class {invoice.class}</strong>
            </div>
          </div>

          {/* Breakdown Table */}
          <table className="w-full text-xs mb-4">
            <thead>
              <tr className="border-b border-card-border text-[10px] text-text-muted uppercase font-bold text-left">
                <th className="py-1.5">Fee Component</th>
                <th className="py-1.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border/50">
              <tr>
                <td className="py-2 text-text-muted">Tuition & Term Fee</td>
                <td className="py-2 text-right font-medium">₹{(invoice.paidAmount * 0.7).toFixed(0)}</td>
              </tr>
              <tr>
                <td className="py-2 text-text-muted">IT, Library & Robotics Lab</td>
                <td className="py-2 text-right font-medium">₹{(invoice.paidAmount * 0.2).toFixed(0)}</td>
              </tr>
              <tr>
                <td className="py-2 text-text-muted">Sports & Cultural Fund</td>
                <td className="py-2 text-right font-medium">₹{(invoice.paidAmount * 0.1).toFixed(0)}</td>
              </tr>
              <tr className="font-extrabold text-sm border-t-2 border-dark-pill">
                <td className="pt-3 text-text-main">Total Paid</td>
                <td className="pt-3 text-right text-emerald-600">₹{invoice.paidAmount.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>

          {/* Stamp & Verification */}
          <div className="flex items-end justify-between pt-4 border-t border-dashed border-card-border text-[10px] text-text-muted">
            <div>
              <p>Payment Mode: <strong className="text-text-main">{invoice.paymentMethod || 'UPI'}</strong></p>
              <p>Generated electronically. Verified.</p>
            </div>
            <div className="px-3 py-1 rounded-lg border-2 border-dashed border-emerald-600 text-emerald-600 font-extrabold tracking-wider -rotate-3 text-[10px]">
              VERIFIED & PAID
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-card-surface text-text-main text-xs font-bold hover:bg-black/5"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-dark-pill text-white text-xs font-bold hover:bg-dark-hover transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
