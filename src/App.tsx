/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, Mail, MessageSquare, Share2, Heart, Sparkles, Users, GraduationCap, 
  ShieldCheck, ArrowRight, Star, Calendar, Clock, Smile, Send, CheckCircle2,
  ChevronRight, Building2, MapPin, Search, HelpCircle, FileCheck
} from 'lucide-react';
import { caseStudies } from './data';
import { CaseStudy, Inquiry } from './types';
import ReviewModal from './components/ReviewModal';
import ProgramSelector from './components/ProgramSelector';
import InquiryDashboard from './components/InquiryDashboard';

export default function App() {
  // State for initial local storage inquiries or sample mock data
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('nauri_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    // Return standard mock initial inquiries for rich user onboarding design
    return [
      {
        id: 'inq-sample-1',
        institutionName: '부산대학교 소프트웨어학과',
        applicantName: '김민준 학과장',
        phone: '010-1234-5678',
        email: 'minjun.kim@pusan.ac.kr',
        target: '학부 3,4학년 취업 준비생',
        estimatedCount: 45,
        message: '하반기 공채 대비 및 공공기관 적성고사 연계 모의 면접 워크숍 일정을 타진하고자 합니다. 2박 3일 과정 희망합니다.',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
        status: 'reviewing',
        assignedConsultant: '유미희 대표이사',
      },
      {
        id: 'inq-sample-2',
        institutionName: '주식회사 넷코스메틱',
        applicantName: '홍예원 주임',
        phone: '010-9876-5432',
        email: 'yewon_hong@netcos.co.kr',
        target: '마케팅본부 임직원 전원',
        estimatedCount: 28,
        message: '팀원 간 세대 갈등 해소 및 힐링을 겸한 하루 워크숍을 원합니다.',
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
        status: 'completed',
        assignedConsultant: '정재현 책임컨설턴트',
      }
    ];
  });

  // Persist inquiries
  useEffect(() => {
    localStorage.setItem('nauri_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Modals state
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Form State
  const [institutionName, setInstitutionName] = useState<string>('');
  const [applicantName, setApplicantName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [target, setTarget] = useState<string>('');
  const [estimatedCount, setEstimatedCount] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // General App State
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [totalLikes, setTotalLikes] = useState<number>(318);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showShareNotification, setShowShareNotification] = useState<boolean>(false);

  // Scroll logic for Sticky Header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Submit Inquiry handler
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institutionName || !applicantName || !phone || !email || !target) {
      alert('필수 기재 항목(* 표시)을 모두 채워주세요!');
      return;
    }

    const newInq: Inquiry = {
      id: `inq-${Date.now()}`,
      institutionName,
      applicantName,
      phone,
      email,
      target,
      estimatedCount: Number(estimatedCount) || 30,
      message,
      createdAt: new Date().toISOString(),
      status: 'pending',
      assignedConsultant: '유미희 대표이사 직할 컨설턴트'
    };

    setInquiries(prev => [newInq, ...prev]);
    setFormSubmitted(true);

    // Auto-reset helper after delay
    setTimeout(() => {
      setInstitutionName('');
      setApplicantName('');
      setPhone('');
      setEmail('');
      setTarget('');
      setEstimatedCount('');
      setMessage('');
      setFormSubmitted(false);
    }, 5000);
  };

  // Delete/Cancel Inquiry handler
  const handleInquiryDelete = (id: string) => {
    setInquiries(prev => prev.filter(x => x.id !== id));
  };

  const handleSelectCaseStudy = (cs: CaseStudy) => {
    setSelectedCase(cs);
    setIsModalOpen(true);
  };

  // Callback from Program selector to prefill contact form
  const handlePreFillProgram = (programTitle: string) => {
    setTarget(programTitle + ' 대상군');
    setMessage(`[선택 과정: ${programTitle}]\n해당 강의안을 바탕으로 맞춤 교육 조율을 요청합니다.`);
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareNotification(true);
    setTimeout(() => {
      setShowShareNotification(false);
    }, 3000);
  };

  const handleHeartClick = () => {
    if (isLiked) {
      setTotalLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setTotalLikes(prev => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="font-sans antialiased text-brand-text bg-brand-bg relative selection:bg-brand-primary selection:text-white" id="nauri-applet-root">
      
      {/* Top Banner Navigation bar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isSticky 
            ? 'py-3.5 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100' 
            : 'py-5 bg-transparent'
        }`}
        id="app-nav-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1 rounded-xl border border-slate-100 flex items-center justify-center h-10 w-10 shrink-0 shadow-sm">
              <img 
                alt="나우리 교육컨설팅 로고" 
                className="h-full w-full object-contain mix-blend-multiply filter contrast-[1.15] brightness-[1.10]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWN0X5uZOrrYxpqOwHM-lHavbDhAqF5dGfO6sdl61S_dKQY2xaWM_Ls-H8jrSJPZnhbKl34HJnYIRZgC-zmUpjITMmQGCPG9eG2pWpCKaxpjLaOHE6YjlgbyOiVt1i1FV7TbF-LoGABWMlYxXxUGYzHLa8FSMmVvN2Au-eOIxvG1KHDpeqR6V3Vn78QNfQcZOG0dnVccEjXb6s3jRPdx0qGPbMup4RJp127d9EFDsQWc70K3UCwe07wiwxVkpNI-x6YUl9HIJ3e_Y"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-lg tracking-tight text-brand-primary leading-none">나우리 교육컨설팅</span>
              <span className="text-[9px] text-brand-secondary font-bold tracking-wider mt-0.5 uppercase">Nauri Education</span>
            </div>
          </div>

          {/* Desktop Nav menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-text-muted">
            <a href="#about" className="hover:text-brand-primary transition-colors">회사소개</a>
            <a href="#curriculum" className="hover:text-brand-primary transition-colors">교육 프로그램</a>
            <a href="#cases" className="hover:text-brand-primary transition-colors">교육 실적</a>
            <a href="#contact" className="hover:text-brand-primary transition-colors">견적 문의</a>
          </nav>

          <a 
            href="#contact" 
            className="inline-flex items-center gap-1.5 bg-brand-primary hover:bg-brand-primary-hover active:scale-95 text-white text-xs font-bold px-4 sm:px-5 py-2.5 rounded-full shadow-lg shadow-brand-primary/10 transition-all"
            id="nav-consultation-shortcut-btn"
          >
            교육 문의하기
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gradient-to-b from-brand-primary/5 via-brand-bg to-brand-bg" id="hero-fold">
        {/* Subtle geometric circles */}
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-brand-primary/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-brand-accent/5 rounded-full filter blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Texts */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold ring-1 ring-brand-primary/20">
                <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse-subtle" />
                Customized Education Solution
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-text leading-tight tracking-tight">
                대학·기업·공공기관 <br />
                <span className="relative text-brand-primary inline-block">
                  맞춤형 프로그램
                  <span className="absolute left-0 bottom-1.5 w-full h-2.5 bg-brand-accent/20 -z-1" />
                </span>을 <br />
                기획하고 운영합니다.
              </h1>
              <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed max-w-xl">
                취업캠프, 진로캠프, 워크숍, 팀빌딩, 조직활성화, 생성형 AI 도구 활용 전문성 교육까지 <br className="hidden md:block" />
                요청 주체와 대상 만족도를 극대화하는 교육 정밀 분석 설계를 약속드립니다.
              </p>

              {/* Action grid button */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href="#curriculum" 
                  className="bg-brand-primary hover:bg-brand-primary-hover active:scale-[0.98] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-brand-primary/15 transition-all"
                  id="hero-see-curriculum-btn"
                >
                  프로그램 보기
                </a>
                <a 
                  href="#cases" 
                  className="bg-brand-surface border border-brand-border/80 hover:border-brand-primary/30 text-brand-text px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all shadow-sm"
                  id="hero-see-cases-btn"
                >
                  운영사례 보기
                </a>
              </div>
            </div>

            {/* Right Graphics and Float Indicator */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-500 border border-slate-100 max-w-lg mx-auto">
                <img 
                  alt="Professional educational workshop consulting scene" 
                  className="w-full h-auto object-cover aspect-[4/3]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB75Y52NFbjYYYBEj2hxCKNZI2QV7EQKAaAwfsXF1ZXsSPoZ1aZbj1WsZXUGsdKRPUjT8lHBQwwoiLBjfo6dk8xnMNmje6wRHEwVkTyiaxAck92o9wZJpzSjyD32wpRrOfBx-yH6-45Q_-SiA4X_p6DNBq5gTf7-4e0TZkKWjVPOYvo3BFuziyye0sXh8etS8zUzvX1HLrYK0xczdydPADnHRO3YquVaCmSJvguQ0TRP83_DyaHl0Eask0ZZ5rLbFJ5A07TbCWF0uE"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/5 hover:bg-transparent transition-colors duration-300" />
              </div>

              {/* Tiny floating success stats tag */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3 animate-float">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping shrink-0" />
                <div>
                  <p className="text-[10px] text-brand-text-muted font-bold">실시간 활성화 상태</p>
                  <p className="text-sm font-extrabold text-brand-text">14개 기관 커리큘럼 조율 중</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Achievement / Stats Grid section */}
      <section className="py-12 bg-white border-y border-brand-border/50 shadow-sm" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-brand-primary">15+</p>
              <p className="text-xs text-brand-text-muted font-semibold mt-1">교육 및 프로그램 운영 경력</p>
            </div>
            <div className="text-center border-l border-slate-100">
              <p className="text-3xl sm:text-4xl font-extrabold text-brand-primary">100+</p>
              <p className="text-xs text-brand-text-muted font-semibold mt-1">협력 기관 파트너십</p>
            </div>
            <div className="text-center border-l border-slate-100">
              <p className="text-3xl sm:text-4xl font-extrabold text-brand-primary">500+</p>
              <p className="text-xs text-brand-text-muted font-semibold mt-1">프로그램 기획 및 출강 건수</p>
            </div>
            <div className="text-center border-l border-slate-100">
              <p className="text-3xl sm:text-4xl font-extrabold text-brand-primary">20,000+</p>
              <p className="text-xs text-brand-text-muted font-semibold mt-1">강의 누적 참여 학습자</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mid Value Props: 왜 나우리인가? */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-brand-text">왜 나우리 교육컨설팅인가?</h2>
            <p className="text-xs sm:text-sm text-brand-text-muted mt-3">
              단순한 단편 지식의 주입식 고착 교육을 넘어선, 자가 동기 행동 변화를 유발하는 교육을 약속합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Box 1 */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-5 text-brand-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-brand-text">맞춤형 기획</h3>
              <p className="text-xs text-brand-text-muted mt-2 leading-relaxed">
                출강 기관의 근본적인 목적정의 및 교육 수강군의 특성을 정밀 분석하여 핵심 테스크에 일치하는 맞춤형 커리큘럼을 교부합니다.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-5 text-brand-primary">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-brand-text">참여형 액티브 운영</h3>
              <p className="text-xs text-brand-text-muted mt-2 leading-relaxed">
                일방적인 강의 전수를 철저히 배제하고, 워크숍 시뮬레이션, 조별 토론, 게이미피케이션 중심의 주도적 동행을 유도합니다.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-5 text-brand-primary">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-brand-text">검증된 전문 강사진</h3>
              <p className="text-xs text-brand-text-muted mt-2 leading-relaxed">
                실제 비즈니스 실무 레코드 및 대기업 인사, 교육공학, 현역 전문가 풀을 다이렉트 배치하여 고품질 직업전수가 가능합니다.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-5 text-brand-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-brand-text">체계적인 사후 노하우</h3>
              <p className="text-xs text-brand-text-muted mt-2 leading-relaxed">
                종료 후에도 활용 가능한 자가 진단 피드백 가이드북 제공 및 설문 결과 기반 성과 보고서를 인사담당자분에게 완벽 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Program Section */}
      <section className="py-20 bg-white" id="curriculum">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-brand-text">교육 프로그램</h2>
            <p className="text-xs sm:text-sm text-brand-text-muted mt-3">
              원하시는 테마를 클릭하시고 상세 커리큘럼 설계안을 확인해 보세요.
            </p>
          </div>

          <ProgramSelector onSelectProgram={handlePreFillProgram} />
        </div>
      </section>

      {/* Cases Section */}
      <section className="py-20 bg-slate-50" id="cases">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold text-brand-primary tracking-wider uppercase">Successful records</span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-text mt-1">교육 실적</h2>
              <p className="text-xs sm:text-sm text-brand-text-muted mt-2">나우리와 함께 높은 만족도 성취를 일구어낸 연간 대표 파트너 교육 사례입니다.</p>
            </div>
            <a 
              href="#contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary text-right hover:mr-1 transition-all"
            >
              성공 사례 바탕 문의 접수하기
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <div 
                key={cs.id}
                onClick={() => handleSelectCaseStudy(cs)}
                className="group bg-white rounded-2xl overflow-hidden border border-brand-border/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                id={`case-card-${cs.id}`}
              >
                {/* Cover with badge */}
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={cs.image} 
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-brand-primary text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg">
                    ★ 만족도 {cs.satisfaction} / 5.0
                  </div>
                </div>

                {/* Cover info */}
                <div className="p-6">
                  <p className="text-xs font-extrabold text-brand-primary">{cs.institution}</p>
                  <h3 className="text-base sm:text-lg font-black text-brand-text mt-1 group-hover:text-brand-primary transition-colors">
                    {cs.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-[11px] text-brand-text-muted">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-brand-primary" />
                      <span>{cs.target}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-secondary" />
                      <span>진행: {cs.duration}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCaseStudy(cs);
                    }}
                    className="w-full mt-4 py-2.5 bg-slate-50 hover:bg-brand-primary hover:text-white rounded-xl text-xs font-bold text-brand-text transition-all text-center flex items-center justify-center gap-1"
                    id={`view-detail-doc-${cs.id}`}
                  >
                    피드백 및 상세 커리큘럼 보기
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logowall Partners */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-black text-brand-text-muted tracking-widest uppercase mb-6">Our Trusted Partners (주요 협약 대학 및 기관)</p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-16 opacity-70">
            {['부산대학교', '부경대학교', '동서대학교', '경성대학교', '신라대학교'].map((pt, i) => (
              <span key={i} className="text-sm sm:text-base font-extrabold text-slate-400 hover:text-brand-primary transition-colors cursor-default">
                {pt}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main inquiry form structure */}
      <section className="py-20 bg-slate-100" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left instructions block */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="inline-flex py-1 px-3 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full">
                Quick Consulting request
              </span>
              <h2 className="text-3xl font-black text-brand-text leading-tight">
                성공적인 교육의 파트너,<br />
                지금 제안 요청을 남겨주세요.
              </h2>
              <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                귀사 또는 학급의 목표 인입, 대상, 희망 날짜를 간략 기재해주시면 담당 수석 컨설턴트가 24시간 이내 맞춤 포트폴리오 제안서 초안을 완성하여 직접 피드백드립니다.
              </p>

              {/* Direct clickable contact cards */}
              <div className="space-y-4 pt-4">
                {/* Tel */}
                <a 
                  href="tel:010-7238-0629" 
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:border-brand-primary/40 transition-all group"
                >
                  <div className="w-11 h-11 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-brand-text-muted font-bold">대표 긴급 직통 유선</span>
                    <span className="block text-base font-extrabold text-brand-text group-hover:text-brand-primary transition-colors">010-7238-0629</span>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:umeehee@naver.com" 
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:border-brand-primary/40 transition-all group"
                  id="email-contact-anchor"
                >
                  <div className="w-11 h-11 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[10px] text-brand-text-muted font-bold">공식 접수 전자 편지</span>
                    <span className="block text-sm sm:text-base font-extrabold text-brand-text group-hover:text-brand-primary transition-all truncate">umeehee@naver.com</span>
                  </div>
                </a>

                {/* Kakao */}
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
                  <div className="w-11 h-11 bg-[#FEE500]/20 text-yellow-800 rounded-xl flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-brand-text-muted font-bold">카카오톡 채널</span>
                    <span className="block text-base font-extrabold text-brand-text">나우리교육컨설팅</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right form submission element */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-10 space-y-4 flex flex-col items-center"
                      id="inquiry-success-animation-msg"
                    >
                      <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-extrabold text-brand-text">문의가 성공적으로 전달되었습니다!</h4>
                      <p className="text-xs text-brand-text-muted max-w-sm">
                        김민준 학과장 등과 상담을 마친 나우리 전담 컨설턴트진이 입력하신 연락처와 메일로 제안서 시안을 전달해 드리겠습니다.
                      </p>
                      <span className="text-[10px] text-brand-secondary bg-slate-100 px-3 py-1 rounded-full inline-block">
                        아래 대시보드에서 등록 과정을 바로 추적할 수 있습니다.
                      </span>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-4 text-left" id="nauri-consulting-form">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-brand-text mb-1.5">기관명 / 대학명 *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="기관/회사명/대학 학과명을 기입하십시오" 
                            value={institutionName}
                            onChange={(e) => setInstitutionName(e.target.value)}
                            className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary placeholder:text-slate-300"
                            id="form-institution-input"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-brand-text mb-1.5">신청 대표자명 *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="성명 및 직함 기입" 
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary placeholder:text-slate-300"
                            id="form-applicant-input"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-brand-text mb-1.5">휴대폰 / 연락처 *</label>
                          <input 
                            type="tel" 
                            required
                            placeholder="010-0000-0000" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary placeholder:text-slate-300"
                            id="form-phone-input"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-brand-text mb-1.5">회신 이메일 주소 *</label>
                          <input 
                            type="email" 
                            required
                            placeholder="example@email.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary placeholder:text-slate-300"
                            id="form-email-input"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-brand-text mb-1.5">교육 권장 대상자군 *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="기초 프로그램 패키지 선택 또는 수작업 기입" 
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary placeholder:text-slate-300"
                            id="form-target-input"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-brand-text mb-1.5">예상 수강 인원 (명)</label>
                          <input 
                            type="number" 
                            placeholder="단위 명 (예: 50)" 
                            value={estimatedCount}
                            onChange={(e) => setEstimatedCount(e.target.value)}
                            className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary placeholder:text-slate-300"
                            id="form-count-input"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-text mb-1.5">기타 세부 건의 사항 (원하는 캠프 일정 등)</label>
                        <textarea 
                          rows={4}
                          placeholder="교육 예정 시기, 대략적인 총 예산 캡 설정 한도, 기선호 희망 테마 등을 자유 기술해주시면 더욱 빠르게 처리됩니다." 
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary placeholder:text-slate-300 resize-none"
                          id="form-message-input"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full mt-4 bg-brand-primary hover:bg-brand-primary-hover text-white py-3.5 rounded-xl font-bold text-xs shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                        id="form-submit-btn"
                      >
                        <Send className="w-3.5 h-3.5" />
                        문의 정식 기획 제안 신청하기
                      </button>

                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Secure matching Inquiry dashboard */}
          <InquiryDashboard inquiries={inquiries} onDeleteInquiry={handleInquiryDelete} />

        </div>
      </section>

      {/* Footer block */}
      <footer className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and desc */}
            <div className="md:col-span-2 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <div className="bg-white p-1 rounded-xl border border-slate-100 flex items-center justify-center h-8 w-8 shrink-0 shadow-sm">
                  <img 
                    alt="나우리 교육컨설팅 로고 푸터" 
                    className="h-full w-full object-contain mix-blend-multiply filter contrast-[1.15] brightness-[1.10]" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWN0X5uZOrrYxpqOwHM-lHavbDhAqF5dGfO6sdl61S_dKQY2xaWM_Ls-H8jrSJPZnhbKl34HJnYIRZgC-zmUpjITMmQGCPG9eG2pWpCKaxpjLaOHE6YjlgbyOiVt1i1FV7TbF-LoGABWMlYxXxUGYzHLa8FSMmVvN2Au-eOIxvG1KHDpeqR6V3Vn78QNfQcZOG0dnVccEjXb6s3jRPdx0qGPbMup4RJp127d9EFDsQWc70K3UCwe07wiwxVkpNI-x6YUl9HIJ3e_Y"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-extrabold text-base tracking-tight text-brand-primary">나우리 교육컨설팅</span>
              </div>
              <p className="text-xs text-brand-text-muted leading-relaxed max-w-sm">
                사람을 향한 맞춤 설계, 미래를 밝히는 최강의 커리큘럼. 나우리는 모든 수강 학습자의 고유 가치 발굴과 지속 발전을 성원합니다.
              </p>
              
              {/* Engagement triggers */}
              <div className="flex items-center gap-3 pt-2">
                <button 
                  onClick={handleHeartClick}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-sm transition-all ${
                    isLiked 
                      ? 'bg-rose-50 border-rose-200 text-rose-600' 
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-brand-text-muted'
                  }`}
                  id="foot-like-btn"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>추천하기 ({totalLikes})</span>
                </button>

                <button 
                  onClick={handleShareClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-brand-text-muted shadow-sm transition-all"
                  id="foot-share-btn"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>주소 복사</span>
                </button>

                <AnimatePresence>
                  {showShareNotification && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0 }}
                      className="text-[10px] font-bold text-emerald-600"
                    >
                      ✓ URL 복사완료!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Link group 1 */}
            <div className="text-left">
              <h4 className="text-xs font-bold text-brand-text tracking-wider uppercase mb-4">교육 서비스</h4>
              <ul className="space-y-2 text-xs text-brand-text-muted">
                <li><a href="#about" className="hover:text-brand-primary transition-colors">회사소개</a></li>
                <li><a href="#curriculum" className="hover:text-brand-primary transition-colors">프로그램 목록</a></li>
                <li><a href="#cases" className="hover:text-brand-primary transition-colors">연간 운영 실적</a></li>
                <li><a href="#contact" className="hover:text-brand-primary transition-colors">맞춤 견적 문의</a></li>
              </ul>
            </div>

            {/* Link group 2 */}
            <div className="text-left">
              <h4 className="text-xs font-bold text-brand-text tracking-wider uppercase mb-4">이용 정보</h4>
              <ul className="space-y-2 text-xs text-brand-text-muted">
                <li><span className="hover:text-brand-primary transition-colors cursor-pointer">이용약관</span></li>
                <li><span className="font-bold text-brand-primary hover:underline cursor-pointer">개인정보처리방침</span></li>
                <li><a href="#contact" className="hover:text-brand-primary transition-colors">오시는 길</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 text-left">
            <p>© 2026 나우리 교육컨설팅. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <span>사업자등록번호: 639-22-01212</span>
              <span>대표이사: 유미희</span>
              <span>소재지: 대한민국 교육컨설팅 네트워크 영남본부</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Case review detail Modal view portal */}
      <ReviewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        caseStudy={selectedCase}
      />

    </div>
  );
}
