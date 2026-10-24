'use client';

import React, { useState } from 'react';
import { Search, Printer, CreditCard } from 'lucide-react';
import { FeeInvoice } from '@/lib/types';

interface FeesViewProps {
  fees: FeeInvoice[];
  onOpenReceipt: (invoice: FeeInvoice) => void;
  onCollectPayment: (invoice: FeeInvoice) => void;
}

export const FeesView: React.FC<FeesViewProps> = ({
  fees,
  onOpenReceipt,
  onCollectPayment,
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filtered = fees.filter((f) => {
    const matchesSearch =
      f.studentName.toLowerCase().includes(search.toLowerCase()) ||
      f.invoiceNo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || f.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-card-surface rounded-3xl p-6 border border-card-border shadow-card-soft">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-main">Fee Management & Invoicing</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Monitor term fees, pending dues, collect payments and issue printable official receipts
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoice number or student name..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-card-border text-xs text-text-main outline-none focus:border-dark-pill transition-colors shadow-xs"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-full bg-white border border-card-border text-xs font-semibold text-text-main outline-none cursor-pointer shadow-xs"
        >
          <option value="ALL">All Status</option>
          <option value="Paid">Fully Paid</option>
          <option value="Partial">Partially Paid</option>
          <option value="Unpaid">Unpaid / Due</option>
        </select>
      </div>

      {/* Invoices Table */}
      <div className="overflow-x-auto rounded-2xl border border-card-border bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-card-border bg-card-surface/50 text-text-muted font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Invoice #</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Class</th>
              <th className="py-3 px-4">Total Amount</th>
              <th className="py-3 px-4">Paid</th>
              <th className="py-3 px-4">Due</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border/60">
            {filtered.map((f) => (
              <tr key={f.id} className="hover:bg-card-surface/40 transition-colors">
                <td className="py-3 px-4 font-bold text-dark-pill">{f.invoiceNo}</td>
                <td className="py-3 px-4 font-bold text-text-main">{f.studentName}</td>
                <td className="py-3 px-4 text-text-muted">Class {f.class}</td>
                <td className="py-3 px-4 font-medium">₹{f.totalAmount.toLocaleString('en-IN')}</td>
                <td className="py-3 px-4 text-emerald-600 font-bold">₹{f.paidAmount.toLocaleString('en-IN')}</td>
                <td className="py-3 px-4 font-bold text-rose-600">
                  {f.dueAmount > 0 ? `₹${f.dueAmount.toLocaleString('en-IN')}` : '₹0'}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      f.status === 'Paid'
                        ? 'bg-accent-lime text-dark-pill'
                        : f.status === 'Partial'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {f.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {f.dueAmount > 0 && (
                      <button
                        onClick={() => onCollectPayment(f)}
                        className="px-2.5 py-1 rounded-full bg-dark-pill text-white text-[10px] font-bold hover:bg-dark-hover transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <CreditCard className="w-3 h-3" />
                        <span>Pay</span>
                      </button>
                    )}
                    {f.receiptNo !== '-' && (
                      <button
                        onClick={() => onOpenReceipt(f)}
                        className="w-7 h-7 rounded-full bg-card-surface hover:bg-black/10 flex items-center justify-center text-text-main transition-colors shadow-xs"
                        title="Print Official Receipt"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
