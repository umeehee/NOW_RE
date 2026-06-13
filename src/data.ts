/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProgramItem, CaseStudy } from './types';

export const programs: ProgramItem[] = [
  {
    id: 'freshmen',
    category: 'FRESHMEN',
    categoryName: '대학 신입생 및 팀빌딩',
    title: '팀빌딩/신입생 프로그램',
    description: '대학이라는 새로운 사회로 도약하는 새내기들의 안정적인 연착륙과 끈끈한 네트워크 형성을 지원하는 소속 가득 팀빌딩',
    features: [
      '어색함을 완벽히 허무는 마인드 오픈 아이스브레이킹',
      '나우리 시그니처 조별 팀워크 미션 및 챌린지',
      '선배·멘토들이 직수입해 전수하는 명품 대학생활 팁',
      '4개년 버킷리스트 및 우리조 3D 드림 캔버스 빌딩'
    ],
    durationRecommended: '2H부터 ~ 2박 3일 집중 코스',
    targetRecommended: '대학교 신입생, 예비 대학생, 학생회 간부진',
    syllabus: [
      { step: '1부', content: '웰컴 아이스브레이킹: 마음 벽 해제 스피드 조원 연결 게임 및 닉네임 교환' },
      { step: '2부', content: '나우리 협동 챌린지: 조별 만점 협동 교구 조립 및 아이디어 빌딩 대항전' },
      { step: '3부', content: '동행 타임 가치 보드게임: 협동심을 통해서만 최종 탈출이 가능한 시뮬레이션 게이미피케이션' },
      { step: '4부', content: '비전 선포식 및 우리들의 약속: 캠퍼스를 밝힐 조별 대형 드림 캔버스 콜라주 제작' }
    ]
  },
  {
    id: 'career-vision',
    category: 'CAREER & VISION',
    categoryName: '진로 & 취업',
    title: '취업/진로 프로그램',
    description: '자기 발견에서 강점 도출, 직무 맞춤형 취업전략까지 원스톱 성공 가이드',
    features: [
      '자기탐색 및 역량진단 컨설팅',
      '실전 모의면접 & 자소서 첨삭',
      '진로 로드맵 설계 워크숍',
      '1:1 진로 매칭 멘토링'
    ],
    durationRecommended: '2H부터 ~ 2박 3일 (조정 가능)',
    targetRecommended: '대학교 1~4학년 및 구직 예정자',
    syllabus: [
      { step: '1부', content: '직무적성 검사 및 고유 강점 분석 (DISC/MBTI/LIFO 기반)' },
      { step: '2부', content: '스토리텔링 기반 맞춤형 입사지원서 작성 코칭' },
      { step: '3부', content: '실제 인사담당자 출신 면접관 연계 심층 모의면접 및 피드백' },
      { step: '4부', content: '개인별 커리어 액션 플랜 작성 및 비전 선포식' }
    ]
  },
  {
    id: 'communication',
    category: 'COMMUNICATION',
    categoryName: '소통 & CS',
    title: 'CS / 소통 교육',
    description: '조직 대내외 신뢰를 형성하고 고객 가치를 극대화하는 커뮤니케이션 기술',
    features: [
      'CS 전문 교육 & 비즈니스 매너',
      '커뮤니케이션 스킬 강화',
      '고객 심리 분석 및 갈등 관리',
      '서비스 마인드 셋업'
    ],
    durationRecommended: '2H부터 ~ 8시간 프로그램',
    targetRecommended: '신입 사원, 서비스 직무 담당자, 사내 강사',
    syllabus: [
      { step: '1부', content: '비비드 이미지 메이킹 및 올바른 비즈니스 보이스/매너 실습' },
      { step: '2부', content: '경청과 공감의 3단계 스피치 및 맞춤 질문법' },
      { step: '3부', content: '블랙컨슈머 대처 시나리오 시뮬레이션 및 롤플레잉' },
      { step: '4부', content: '스트레스 완화 및 동기부여 피드백 세션' }
    ]
  },
  {
    id: 'corporate',
    category: 'CORPORATE',
    categoryName: '기업 워크숍',
    title: '동기부여 & 조직활성화',
    description: '단결과 성장을 촉진하고 소속감을 고취하는 액티비티형 워크숍',
    features: [
      '조직 활성화 프로그램',
      '리더십 강화 워크숍',
      '팀워크 향상 게이미피케이션',
      '기업 핵심가치 내재화'
    ],
    durationRecommended: '2H부터 ~ 1박 2일',
    targetRecommended: '부서원 전체, 중간 관리자, 임직원',
    syllabus: [
      { step: '1부', content: '아이스브레이킹 및 퍼스널 커넥팅 (서로의 다름을 인정하기)' },
      { step: '2부', content: '핵심가치 게이미피케이션 (협력을 통해서만 해결 가능한 과제 수행)' },
      { step: '3부', content: '리더와 팔로워의 역할 바꿈 경험 및 원활한 회의 문화 수립' },
      { step: '4부', content: '감사 칭찬 릴레이 및 성장을 다짐하는 조별 타임캡슐' }
    ]
  },
  {
    id: 'tech',
    category: 'TECH',
    categoryName: 'AI·디지털',
    title: 'AI·디지털 교육',
    description: '디지털 전환 시대 필수 역량, 생성형 AI 및 데이터 분석 실전 마스터',
    features: [
      '생성형 AI (프롬프트 엔지니어링) 활용 실습',
      '디지털 리터러시 교육 및 툴 활용',
      '데이터 분석 기초 및 시각화',
      'AI 기반 업무 자동화 입문'
    ],
    durationRecommended: '2H부터 ~ 12시간 프로그램',
    targetRecommended: '대학생, 재직자, 공공기관 마케터 및 기획 담당자',
    syllabus: [
      { step: '1부', content: '인공지능 트렌드와 생성형 AI (ChatGPT, Gemini) 기초 동작 이해' },
      { step: '2부', content: '업무 기획서 및 보고서 초안 작성을 위한 실전 프롬프트 설계 실습' },
      { step: '3부', content: '이미지 생성형 모델 활용 카드뉴스 제작 및 시각 디자인 실습' },
      { step: '4부', content: 'AI 윤리 이해 및 협업 툴(슬랙, 노션, 캔바) 스마트 조합' }
    ]
  },
  {
    id: 'learning',
    category: 'LEARNING',
    categoryName: '학습역량',
    title: '학습역량 프로그램',
    description: '스스로 공부하는 힘을 기르는 자기주도적 성장의 발판',
    features: [
      '효율적 학습 전략 (노트 필기, 독서법)',
      '시간 관리 노하우 (우선순위 바인더 작성)',
      '메타인지 강화 및 시험 불안 해소',
      '목표 설정 이론과 실습'
    ],
    durationRecommended: '2H부터 ~ 8시간 프로그램',
    targetRecommended: '초·중·고등학생 및 대학 학습 기초가 부족한 신입생',
    syllabus: [
      { step: '1부', content: '나의 학습 스타일(VAK 모델) 진단 및 인지 스타일의 이해' },
      { step: '2부', content: '시간 도둑 잡기! 뽀모도로 테크닉과 스케줄러 황금비율 작성 실습' },
      { step: '3부', content: '출력(Output) 중심의 메타인지 인출 퀴즈 공부법 및 전교 1등 비밀 노트법' },
      { step: '4부', content: '멘탈 헬스케어: 시험 불안 다스리는 마인드 세팅과 호흡 가이드' }
    ]
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'pukyung-univ',
    title: '신입생 적응 및 팀빌딩 캠프',
    institution: '부산 지역 대학',
    category: 'FRESHMEN',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFhXQIiSnf4XZv5PEIeE8SBoli4tgA_aXZOnzvtSuJJqeHhQv52r2Y2lihrm4AFOdiWMA3Li3VhKrw2yiGhAAJNLyz66X-jSKRyQxeRIPCojIxiidn2XyhvBp11COOBsbTtKZjha9eGbXyux1GDHITo8pe1Wopr1QgeebARjHeJDb1ecCMipi8b7HhvOyrJ0rinj9qvboXXSeg4u6FcjcGVAilSktolE8EfuNGk3rjSdyKdbfCHfhr9y6CTGu-ds26pse3ZNIKD_c',
    satisfaction: 4.8,
    target: '신입생 150명',
    duration: '2박 3일',
    highlights: [
      '대학생활 밀착 멘토링 매뉴얼 제공',
      '자체 개발 게이미피케이션 솔루션 적용',
      '이탈률 0% 및 선후배 만족도 역대 최고 기록'
    ],
    feedback: '입학 전 대학 동기들을 대면하는 게 조심스러웠는데, 나우리 교육컨설팅의 친화형 팀빌딩 덕분에 빠르게 평생 갈 친구들을 사귀었습니다. 강력 추천합니다!',
    feedbackAuthor: '박*하 (26학번 신입생)',
    schedule: [
      { day: '1일차', title: '아이스브레이킹 & 대규모 팀빌딩 마당', desc: '팀명/팀가 선정 및 첫 만남 미니올림픽' },
      { day: '2일차', title: '대학생활 마스터 클래스 및 조별 프로젝트', desc: '스마트 학점 관리, 캠퍼스 보물찾기 게임' },
      { day: '3일차', title: '비전맵 선포 및 대규모 우수팀 포상', desc: '자신의 4년 로드맵을 3D 콜라주로 발표' }
    ]
  },
  {
    id: 'geoje-univ',
    title: '실전 취업캠프',
    institution: '경남 지역 대학',
    category: 'CAREER & VISION',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxL5T5nwruOvQfkwsl7waB5mzsjpFXnriaChlY_mzaUgS86H_Lju3EpQQE6UumVAeY5IhqHXBiydnn_kiLrZTv5AkX5iKoe3jpNBrXT8w-XD_ufb8vMxJ3rsGt6680nXF0m03w2BvSLNdWmhRTeOuhrddI5iWqkmp8DU8JMaBORUYrUM0oQpbUb8QQ817b9h0X1uIKQWevaerg310crtXUIyb7D7bkJmJJTv4hxkKP8BB10GjViQPxOlBuiZFbPtOOH_1WZbP7sCM',
    satisfaction: 4.9,
    target: '취준생 80명',
    duration: '1박 2일',
    highlights: [
      '대기업 출신 전문 가이드 배정',
      '실전 AI 역량 진단 및 무제한 질문 첨삭',
      '우수 참여자 15명 실제 취업 포트폴리오 완성'
    ],
    feedback: '자소서 한 줄도 못 쓰던 제가 캠프가 끝난 뒤 합격률을 대폭 상승시킨 명품 프로필을 완성했습니다! 컨설턴트분들이 밤늦게까지 꼼꼼히 봐주셨어요.',
    feedbackAuthor: '주*민 (기계공학과 졸업예정)',
    schedule: [
      { day: '1일차', title: '역량 중심 자기소개서 한판 작성', desc: '1:1 집중 피드백을 통해 뼈대 수정 및 작성 완수' },
      { day: '2일차', title: '실전 모의 압박면접 & AI 면접 시연', desc: '비디오 카메라 녹화 분석 및 개별 피드백 시트 제공' }
    ]
  },
  {
    id: 'corp-a',
    title: '조직활성화 워크숍',
    institution: 'A사 기업 워크숍',
    category: 'CORPORATE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsC_o8ti1LgOlsPmF2rP8Wfg3Ao0G4vJjHj7j04cmeDXV99GDHlSxQooIC-AlO02OEc2j_n22jz3ovgF6wUMMqSz4R6QkTEQAUMoSF7qgGjKp63F9d43mmI2QLlL7DGeLMO117WBh-4kADr2OcDWXZi73CU9V7yafT_UOGiDWS24Dan5sYQOh7vWDUit6IAHN_HqmLIQxv87IgrSrx1a7XqsC5CjKrTCDtyIFBp_5K_KKBuwHY9U0op6o__yRsjMo_EcgvLn_ELrg',
    satisfaction: 4.7,
    target: '임직원 60명',
    duration: '당일',
    highlights: [
      '팀별 경쟁을 뛰어넘어 전 임부서 대화합 성과',
      '조직 건강 진단 분석 보고서 경영진 제공',
      '업무 연계 몰입도 평가 역대 최고 수준 갱신'
    ],
    feedback: '흔한 한마당 체육대회일 줄 알았는데, 소통 장벽을 없애고 협업 효율을 대폭 끌어올려준 의미 가득한 시간이었습니다. 인사팀으로서 가장 대성공한 기획이었습니다.',
    feedbackAuthor: '이*현 (HRD 파트장)',
    schedule: [
      { day: '오전', title: '관계 혁신 아이스브레이킹', desc: '세대 격차 허물기, 경청 카드 놀이' },
      { day: '오후', title: '나눔과 비전의 콜라보레이션', desc: '미래 신호 보드게임, 감사 편지 교환' }
    ]
  }
];

export const trustedPartners: string[] = [
  '부산대학교',
  '부경대학교',
  '동서대학교',
  '경성대학교',
  '신라대학교'
];
