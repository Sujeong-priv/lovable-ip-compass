
import React, { useState } from 'react';
import { ApplicationStats } from '@/components/ApplicationStats';
import { ApplicationFilters } from '@/components/ApplicationFilters';
import { ApplicationTable } from '@/components/ApplicationTable';

interface ApplicationProjectProps {
  projectId: string;
  customerId: string;
}

export const ApplicationProject: React.FC<ApplicationProjectProps> = ({ projectId, customerId }) => {
  const [viewMode, setViewMode] = useState<'all' | 'owned' | 'new'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - 실제로는 Supabase에서 가져올 데이터
  const patents = [
    {
      id: 'pat-1',
      piRef: 'PI-2024-001',
      clientRef: 'SEC-AI-001',
      status: '신규출원',
      workingTitle: 'AI 기반 이미지 처리',
      inventionTitle: 'AI 기반 이미지 처리 방법 및 시스템',
      applicationNumber: '10-2024-0001234',
      applicationDate: '2024-01-15',
      registrationNumber: '',
      registrationDate: '',
      category1: '1A',
      category2: '2B',
      inventors: ['김철수', '이영희'],
      currentStage: '명세서 송부',
      flowStatus: 'in-progress'
    },
    {
      id: 'pat-2',
      piRef: 'PI-2023-045',
      clientRef: 'SEC-MEM-002',
      status: '보유',
      workingTitle: '메모리 최적화 기술',
      inventionTitle: '반도체 메모리 최적화 기술',
      applicationNumber: '10-2023-0045678',
      applicationDate: '2023-05-20',
      registrationNumber: '10-2456789',
      registrationDate: '2024-01-10',
      category1: '1B',
      category2: '2A',
      inventors: ['박민수', '정다영', '최준호'],
      currentStage: '등록 완료',
      flowStatus: 'completed'
    },
    {
      id: 'pat-3',
      piRef: 'PI-2024-002',
      clientRef: 'SEC-5G-001',
      status: '신규출원',
      workingTitle: '5G 통신 프로토콜',
      inventionTitle: '5G 통신 프로토콜 개선 방법',
      applicationNumber: '10-2024-0002345',
      applicationDate: '2024-01-20',
      registrationNumber: '',
      registrationDate: '',
      category1: '1C',
      category2: '2C',
      inventors: ['송민석'],
      currentStage: 'OA 대응',
      flowStatus: 'in-progress'
    }
  ];

  const filteredPatents = patents.filter(patent => {
    const matchesView = viewMode === 'all' || 
      (viewMode === 'owned' && patent.status === '보유') ||
      (viewMode === 'new' && patent.status === '신규출원');
    
    const matchesSearch = searchTerm === '' || 
      patent.inventionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patent.piRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patent.clientRef.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesView && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <ApplicationFilters
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <ApplicationStats patents={patents} />

      <ApplicationTable patents={filteredPatents} viewMode={viewMode} />
    </div>
  );
};
