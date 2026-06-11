/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inquiry } from '../types';
import { useState } from 'react';
import { FileText, Trash2, Clock, CheckCircle2, User, HelpCircle, Eye, Printer, XSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InquiryDashboardProps {
  inquiries: Inquiry[];
  onDeleteInquiry: (id: string) => void;
}

export default function InquiryDashboard({ inquiries, onDeleteInquiry }: InquiryDashboardProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const getStatusBadge = (status: Inquiry['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3 h-3" /> 답변 완료
          </span>
        );
      case 'reviewing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 animate-pulse">
            <Clock className="w-3 h-3" /> 매칭 및 제안서 작성 중
          </span>
        );
      case 'assigned':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
            <User className="w-3 h-3" /> 담당 컨설턴트 매치
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3" /> 제안 접수 완료
          </span>
        );
    }
  };



  return (
    <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-8 mt-16" id="inquiry-dashboard-section">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-black text-brand-text flex items-center gap-2">
            <FileText className="text-brand-primary w-6 h-6" /> 내 맞춤 견적 신청 내역
          </h3>
          <p className="text-xs text-brand-text-muted mt-1">
            신청하신 상담 및 맞춤 커리큘럼 제안서를 실시간으로 추적 가능합니다. (브라우저 로컬 저장)
          </p>
        </div>
        <span className="text-xs font-bold bg-slate-200/80 text-brand-text px-3 py-1 rounded-lg">
          비공개 보관소 • 안전한 백업
        </span>
      </div>

      {inquiries.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center justify-center">
          <HelpCircle className="w-12 h-12 text-slate-300 mb-2" />
          <p className="text-sm font-bold text-brand-text">현재 등록된 맞춤 교육 문의가 없습니다.</p>
          <p className="text-xs text-brand-text-muted mt-1 max-w-sm">
            아래의 문의 양식을 작성하여 제출하시면 자동으로 이 관리 대시보드에 실시간 매칭 상태와 시안이 출력됩니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* List panel */}
          <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100">
            {inquiries.map((inq) => (
              <div 
                key={inq.id}
                onClick={() => setSelectedInquiry(inq)}
                className={`p-4 text-left cursor-pointer transition-all ${
                  selectedInquiry?.id === inq.id 
                    ? 'bg-brand-primary/5 border-l-4 border-brand-primary' 
                    : 'hover:bg-slate-50'
                }`}
                id={`inq-list-item-${inq.id}`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="text-sm font-extrabold text-brand-text">{inq.institutionName}</h4>
                    <p className="text-xs text-brand-text-muted mt-0.5">{inq.applicantName} 대표 • {inq.target} ({inq.estimatedCount}명)</p>
                  </div>
                  {getStatusBadge(inq.status)}
                </div>
                <div className="flex justify-between items-center mt-3 text-[10px] text-slate-400">
                  <span>신청일: {new Date(inq.createdAt).toLocaleDateString()}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('이 문의 건을 취소하시겠습니까? 신청하신 정보가 삭제됩니다.')) {
                        onDeleteInquiry(inq.id);
                        if (selectedInquiry?.id === inq.id) {
                          setSelectedInquiry(null);
                        }
                      }
                    }}
                    className="p-1 hover:bg-rose-50 rounded text-rose-500 hover:text-rose-700 transition-colors"
                    title="문의 삭제"
                    id={`delete-btn-${inq.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Details / Interactive simulator panel */}
          <div className="xl:col-span-7">
            <AnimatePresence mode="wait">
              {selectedInquiry ? (
                <motion.div
                  key={selectedInquiry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5"
                  id={`inq-detail-panel-${selectedInquiry.id}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-brand-secondary">실시간 맞춤 제안서 시안</span>
                      <h3 className="text-lg font-black text-brand-text mt-0.5">{selectedInquiry.institutionName}</h3>
                    </div>
                    {getStatusBadge(selectedInquiry.status)}
                  </div>

                  {/* Consultant card if matched */}
                  <div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-xl p-4 border border-brand-primary/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/15 flex items-center justify-center text-sm font-bold text-brand-primary">
                      {selectedInquiry.assignedConsultant ? selectedInquiry.assignedConsultant[0] : '유'}
                    </div>
                    <div>
                      <span className="block text-[10px] text-brand-text-muted">나우리 책임 교육 매치 메이커</span>
                      <span className="block text-xs font-bold text-brand-text mt-0.5">
                        {selectedInquiry.assignedConsultant || '유미희 대표이사 직할 컨설턴트'} 배정
                      </span>
                      <span className="block text-[10px] text-emerald-600 mt-0.5">
                        ✓ 24시간 이내에 기획안 초안 PDF를 유선 및 지면 전달해 드릴 예정입니다.
                      </span>
                    </div>
                  </div>

                  {/* Summary of what they asked */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="block text-slate-400">신청자/직책</span>
                      <span className="block font-bold text-brand-text mt-0.5">{selectedInquiry.applicantName}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="block text-slate-400">연락처/메일</span>
                      <span className="block font-bold text-brand-text mt-0.5">{selectedInquiry.phone} / {selectedInquiry.email}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="block text-slate-400">교육 대상군</span>
                      <span className="block font-bold text-brand-text mt-0.5">{selectedInquiry.target}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="block text-slate-400">예상 수강 인원</span>
                      <span className="block font-bold text-brand-primary mt-0.5">
                        {selectedInquiry.estimatedCount}명
                      </span>
                    </div>
                  </div>

                  {/* Message detail */}
                  <div>
                    <span className="block text-xs text-brand-text-muted mb-1.5">문의 세부 내용:</span>
                    <p className="bg-slate-50 text-xs p-3.5 rounded-xl border border-slate-100 text-brand-text leading-relaxed whitespace-pre-wrap">
                      {selectedInquiry.message || '상세 문의 내용이 비어 있습니다. 유선 상담을 원하셨습니다.'}
                    </p>
                  </div>

                  {/* Suggested Modules tailored dynamically to target */}
                  <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <span>✦ 나우리 AI 제안 필수 추천 모듈:</span>
                    </h4>
                    <p className="text-[11px] text-emerald-700 leading-relaxed">
                      {selectedInquiry.target.includes('신입') || selectedInquiry.target.includes('대학')
                        ? '1. [아이스브레이킹] 친밀감 형성을 위한 자체 카드게임 보드 챌린지 탑재 권고.\n2. [멘토링 연계] 대상에 최적화된 우수 선배 연계 퍼실리테이터를 임명하여 분반 수업 활성화.'
                        : '1. [핵심가치 융합] 기업 이념을 시나리오 게임에 녹인 기업 밀착 시나리오 리더십 강화를 추천.\n2. [업무 효율성] 최근 도입이 늘고 있는 인공지능 도구(Gemini) 조합 활용 실습 추가를 추천.'}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-brand-text px-4 py-2 rounded-xl text-xs font-bold transition-all"
                      id="print-proposal-btn"
                    >
                      <Printer className="w-3.5 h-3.5" /> 이 시안 인쇄하기
                    </button>
                    <button
                      onClick={() => setSelectedInquiry(null)}
                      className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
                      id="close-preview-btn"
                    >
                      미리보기 닫기
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full bg-white border border-slate-100 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-slate-400 shadow-sm min-h-[350px]">
                  <Clock className="w-12 h-12 text-slate-300 mb-3 animate-pulse-subtle" />
                  <p className="text-sm font-bold text-brand-text">문의 상세 및 제안 분석 모듈</p>
                  <p className="text-xs text-brand-text-muted mt-1 max-w-sm">
                    좌측 항목에서 문의 내용을 클릭하시면 신청 정보 확인, AI 추천 모듈 및 정식 제안 요청서 가이드라인이 표시됩니다.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
