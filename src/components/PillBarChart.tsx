'use client';

import React, { useState } from 'react';
import { BarChart3, ChevronDown } from 'lucide-react';
import { CHART_PILL_DATA } from '@/lib/mockData';

export const PillBarChart: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1 (2026-27)');
  const yAxisTicks = ['100%', '90%', '80%', '70%', '60%', '50%', '40%', '30%', '20%', '10%'];

  const terms = ['Term 1 (2026-27)', 'Term 2 (2026-27)', 'Monthly View'];

  const toggleTerm = () => {
    const nextIdx = (terms.indexOf(selectedTerm) + 1) % terms.length;
    setSelectedTerm(terms[nextIdx]);
  };

  return (
    <div className="bg-card-surface rounded-3xl p-6 border border-card-border shadow-card-soft flex flex-col justify-between h-[360px]">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-text-main" />
            <div>
              <h3 className="text-xl font-bold tracking-tight text-text-main">Weekly Attendance Statistics</h3>
            </div>
          </div>

          {/* School ERP Legend */}
          <div className="flex items-center gap-4 text-xs font-medium text-text-muted">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-dark-pill inline-block" />
              <span>Present Students</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-lime inline-block" />
              <span>On-Time Arrival</span>
            </div>
          </div>
        </div>

        {/* Term Dropdown Pill */}
        <div className="relative">
          <button 
            onClick={toggleTerm}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-card-border text-xs font-semibold text-text-main hover:bg-white/80 transition-colors cursor-pointer shadow-xs"
          >
            <span>{selectedTerm}</span>
            <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
          </button>
        </div>
      </div>

      {/* Chart Body with Custom Dual-Pill Bars */}
      <div className="relative flex-grow flex flex-col justify-end pt-2 pb-1">
        {/* Horizontal Background Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-7">
          {yAxisTicks.map((tick) => (
            <div key={tick} className="flex items-center w-full">
              <span className="text-[10px] font-medium text-text-muted w-8 text-right pr-2">
                {tick}
              </span>
              <div className="flex-grow border-b border-black/[0.04]" />
            </div>
          ))}
        </div>

        {/* Vertical Bars Container */}
        <div className="relative flex items-end justify-between pl-10 pr-3 z-10 h-[210px] mb-2">
          {CHART_PILL_DATA.map((item, idx) => {
            if (!item.hasData) {
              // Dashed-outline placeholder bar (for school holidays/weekends)
              return (
                <div key={idx} className="flex flex-col items-center group cursor-pointer" title="School Holiday / No Classes">
                  <div className="relative w-8 h-[175px] rounded-full border-2 border-dashed border-black/15 flex flex-col items-center justify-start pt-2 group-hover:border-black/30 transition-colors">
                    {/* Top grey circle marker */}
                    <div className="w-2 h-2 rounded-full bg-black/25" />
                  </div>
                  <span className="text-[10px] font-medium text-text-muted mt-3 text-center truncate max-w-[55px]">
                    {item.date}
                  </span>
                </div>
              );
            }

            // Dual-segment pill bar: Dark top (Total Present) + Lime bottom (On-time)
            const totalHeightPx = 175 * item.total;
            const topHeightPx = (totalHeightPx * item.topHeight) / (item.topHeight + item.bottomHeight);
            const bottomHeightPx = totalHeightPx - topHeightPx;

            return (
              <div key={idx} className="flex flex-col items-center group relative cursor-pointer">
                {/* Floating tooltips (e.g. on Fri 24) */}
                {item.tooltip && (
                  <>
                    {/* Top Black Tooltip Pill */}
                    <div className="absolute -top-7 -right-6 z-20 bg-dark-pill text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md pointer-events-none animate-bounce">
                      {item.tooltip.top} Present
                    </div>
                    {/* Bottom Lime Tooltip Pill */}
                    <div className="absolute top-[80px] -left-8 z-20 bg-accent-lime text-dark-pill text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md pointer-events-none">
                      {item.tooltip.bottom} On-time
                    </div>
                  </>
                )}

                {/* The Pill Container */}
                <div 
                  className="w-8 rounded-full overflow-hidden flex flex-col relative transition-all duration-300 group-hover:scale-[1.03] shadow-sm"
                  style={{ height: `${totalHeightPx}px` }}
                >
                  {/* Top Segment: Dark Charcoal (Total Present) */}
                  <div 
                    className="w-full bg-dark-pill relative flex items-center justify-center"
                    style={{ height: `${topHeightPx}px` }}
                  >
                    {item.whiteDotPos === 'top' && (
                      <div className="w-2 h-2 rounded-full bg-white absolute top-2.5 shadow-sm" />
                    )}
                  </div>

                  {/* Transition White Dot (if in middle) */}
                  {item.whiteDotPos === 'middle' && (
                    <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black z-10" style={{ top: `${topHeightPx - 4}px` }} />
                  )}

                  {/* Bottom Segment: Vibrant Lime Yellow (On-time arrivals) */}
                  <div 
                    className="w-full bg-accent-lime relative flex items-center justify-center"
                    style={{ height: `${bottomHeightPx}px` }}
                  >
                    {item.whiteDotPos === 'bottom' && (
                      <div className="w-2 h-2 rounded-full bg-dark-pill absolute top-2.5 shadow-sm" />
                    )}
                  </div>
                </div>

                {/* Date Label on X-axis */}
                <span className={`text-[10px] mt-3 font-medium ${
                  item.date.includes('Fri 24') ? 'text-dark-pill font-bold underline' : 'text-text-muted'
                }`}>
                  {item.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
