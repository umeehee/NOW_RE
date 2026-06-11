/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaseStudy } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Calendar, Users, Award, MessageSquare, ListTodo, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
}

export default function ReviewModal({ isOpen, onClose, caseStudy }: ReviewModalProps) {
  const [likes, setLikes] = useState<number>(42);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  if (!caseStudy) return null;

  const handleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto"
          id="review-modal-container"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
            id={`case-modal-${caseStudy.id}`}
          >
            {/* Header image and overlay */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden shrink-0">
              <img 
                src={caseStudy.image} 
                alt={caseStudy.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
              
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
                aria-label="닫기"
                id="close-modal-btn"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 bg-brand-primary text-xs font-semibold rounded-full mb-2">
                  {caseStudy.category}
                </span>
                <p className="text-sm opacity-90 font-medium">{caseStudy.institution}</p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{caseStudy.title}</h2>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
              {/* Stat Pills */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-center flex flex-col items-center">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500 mb-1" />
                  <span className="text-xs text-brand-text-muted">강사 만족도</span>
                  <span className="text-base font-bold text-brand-text mt-0.5">{caseStudy.satisfaction} / 5.0</span>
                </div>
                <div className="text-center flex flex-col items-center border-x border-slate-200">
                  <Users className="w-5 h-5 text-brand-primary mb-1" />
                  <span className="text-xs text-brand-text-muted">교육 대상</span>
                  <span className="text-base font-bold text-brand-text mt-0.5">{caseStudy.target}</span>
                </div>
                <div className="text-center flex flex-col items-center">
                  <Calendar className="w-5 h-5 text-brand-secondary mb-1" />
                  <span className="text-xs text-brand-text-muted">진행 기간</span>
                  <span className="text-base font-bold text-brand-text mt-0.5">{caseStudy.duration}</span>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-lg font-bold text-brand-text flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-brand-primary" /> Key Highlights & 성과
                </h3>
                <ul className="space-y-2.5">
                  {caseStudy.highlights.map((hlt, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-brand-text-muted">
                      <span className="inline-flex w-5 h-5 bg-brand-primary/10 rounded-full items-center justify-center text-brand-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{hlt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Schedule / Timeline */}
              <div>
                <h3 className="text-lg font-bold text-brand-text flex items-center gap-2 mb-3">
                  <ListTodo className="w-5 h-5 text-brand-primary" /> 상세 교육 타임라인
                </h3>
                <div className="space-y-4 border-l border-slate-100 ml-2.5 pl-4">
                  {caseStudy.schedule.map((sch, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-7 top-[5px] w-2.5 h-2.5 rounded-full bg-brand-primary ring-4 ring-brand-primary/10" />
                      <div className="text-xs font-semibold text-brand-primary uppercase tracking-wider">{sch.day}</div>
                      <div className="text-sm font-bold text-brand-text mt-0.5">{sch.title}</div>
                      <div className="text-xs text-brand-text-muted mt-0.5">{sch.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Review Text */}
              <div className="bg-brand-surface-low p-5 rounded-2xl border border-brand-accent/20 italic relative">
                <MessageSquare className="absolute -top-3 -left-2 w-7 h-7 text-brand-accent/30 rotate-12 scale-150 pointer-events-none" />
                <span className="block text-sm text-brand-text relative z-10 leading-relaxed font-medium">
                  " {caseStudy.feedback} "
                </span>
                <span className="block text-right text-xs font-semibold text-brand-secondary mt-3 not-italic">
                  — {caseStudy.feedbackAuthor}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                  hasLiked 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-white hover:bg-slate-100 text-brand-text border border-slate-200'
                }`}
                id="like-case-btn"
              >
                <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                <span>도움이 되었어요 ({likes})</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-full text-xs font-bold transition-all"
                id="modal-confirm-btn"
              >
                확인
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
