'use client';

import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { FeeInvoice } from '@/lib/types';

interface CollectPaymentModalProps {
  invoice: FeeInvoice | null;
  onClose: () => void;
  onConfirm: (invoiceId: string, amount: number, method: string) => void;
}

export const CollectPaymentModal: React.FC<CollectPaymentModalProps> = ({
  invoice,
  onClose,
  onConfirm,
}) => {
  const [payAmount, setPayAmount] = useState(invoice ? invoice.dueAmount : 0);
  const [method, setMethod] = useState('UPI');

  if (!invoice) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(invoice.id, Number(payAmount), method);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
      <div className="bg-app-panel border border-card-border rounded-4xl p-7 max-w-md w-full shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-card-border mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent-lime flex items-center justify-center text-dark-pill">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main">Collect Fee Payment</h3>
              <p className="text-[11px] text-text-muted">Student: {invoice.studentName}</p>
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
          <div className="p-3.5 rounded-2xl bg-white border border-card-border flex items-center justify-between">
            <span className="text-xs text-text-muted">Current Pending Due:</span>
            <span className="text-base font-extrabold text-rose-600">₹{invoice.dueAmount.toLocaleString('en-IN')}</span>
          </div>

          <div>
            <label className="text-[11px] font-bold text-text-muted block mb-1">Paying Amount (₹) *</label>
            <input
              type="number"
              required
              min="100"
              max={invoice.dueAmount}
              value={payAmount}
              onChange={(e) => setPayAmount(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-2xl bg-white border border-card-border text-sm font-bold text-text-main outline-none focus:border-dark-pill"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-text-muted block mb-1">Payment Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-3.5 py-2 rounded-2xl bg-white border border-card-border text-xs font-semibold text-text-main outline-none"
            >
              <option value="UPI">UPI (Google Pay, PhonePe, Paytm)</option>
              <option value="Net Banking">Net Banking / NEFT</option>
              <option value="Card">Debit / Credit Card</option>
              <option value="Cash">Cash at Reception Counter</option>
            </select>
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
              Confirm & Issue Receipt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
