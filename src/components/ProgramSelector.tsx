/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProgramItem } from '../types';
import { programs } from '../data';
import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Calendar, HelpCircle, ArrowRight, UserCheck, PlusCircle, Check } from 'lucide-react';

interface ProgramSelectorProps {
  onSelectProgram: (programName: string) => void;
}

export default function ProgramSelector({ onSelectProgram }: ProgramSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>('freshmen');

  const activeProgram = programs.find(p => p.id === selectedId) || programs[0];

  const handleSelectForInquiry = () => {
    // Call props to pass name, and scroll down
    onSelectProgram(activeProgram.title);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-brand-border shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12" id="program-selector-widget">
      {/* List Sidebar */}
      <div className="lg:col-span-4 bg-slate-50 p-6 border-r border-brand-border">
        <h3 className="text-sm font-bold text-brand-primary tracking-wider uppercase mb-4">교육 분야 선택</h3>
        <div className="space-y-2">
          {programs.map((prog) => {
            const isSelected = prog.id === selectedId;
            return (
              <button
                key={prog.id}
                onClick={() => setSelectedId(prog.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all flex items-start gap-3 ${
                  isSelected 
                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-[1.01]' 
                    : 'bg-white hover:bg-white/80 text-brand-text border border-brand-border/40 hover:border-brand-primary/40'
                }`}
                id={`btn-prog-${prog.id}`}
              >
                <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isSelected ? 'bg-white/20' : 'bg-brand-primary/10'}`}>
                  <BookOpen className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-brand-primary'}`} />
                </div>
                <div>
                  <span className={`block text-[11px] font-bold tracking-wider ${isSelected ? 'text-white/80' : 'text-brand-secondary'}`}>
                    {prog.category}
                  </span>
                  <span className="block text-sm font-bold mt-0.5">{prog.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Details Panel */}
      <div className="lg:col-span-8 p-6 md:p-8 flex flex-col justify-between space-y-8">
        <div>
          {/* Header */}
          <div className="border-b border-slate-100 pb-5">
            <span className="inline-block px-3 py-1 bg-brand-surface-low text-brand-primary text-xs font-bold rounded-full mb-3">
              {activeProgram.categoryName} 전문 솔루션
            </span>
            <h2 className="text-2xl font-bold text-brand-text">{activeProgram.title}</h2>
            <p className="text-sm text-brand-text-muted mt-2 leading-relaxed">{activeProgram.description}</p>
          </div>

          {/* Details & Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="text-xs font-bold text-brand-secondary tracking-widest uppercase mb-3">차별화 장점 / 혜택</h4>
              <ul className="space-y-2">
                {activeProgram.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-brand-text font-medium">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 space-y-2.5 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-xs text-brand-text-muted">
                  <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                  <span>권장일정: <strong>{activeProgram.durationRecommended}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-text-muted">
                  <UserCheck className="w-3.5 h-3.5 text-brand-secondary" />
                  <span>추천대상: <strong>{activeProgram.targetRecommended}</strong></span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-brand-secondary tracking-widest uppercase mb-3">표준 강의 설계안</h4>
              <div className="space-y-2.5">
                {activeProgram.syllabus.map((s, idx) => (
                  <div key={idx} className="flex gap-2.5">
                    <span className="text-[10px] font-bold bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded h-fit shrink-0 mt-0.5">
                      {s.step}
                    </span>
                    <span className="text-xs text-brand-text-muted leading-relaxed font-normal">
                      {s.content}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>



        {/* Call to Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <p className="text-xs text-brand-text-muted">
            해당 과정은 맞춤 세부 조율이 100% 가능하며 출강 지역, 강사진 배정에 따라 최적화됩니다.
          </p>
          <button
            onClick={handleSelectForInquiry}
            className="inline-flex items-center gap-1.5 bg-brand-primary hover:bg-brand-primary-hover active:scale-[0.98] text-white px-5 py-3 rounded-xl font-bold text-xs transition-all shadow-md shadow-brand-primary/10"
            id="fill-inquiry-shortcut"
          >
            이 프로그램으로 즉시 견적 문의하기
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
