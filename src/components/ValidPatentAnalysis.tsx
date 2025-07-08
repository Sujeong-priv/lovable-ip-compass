
import React, { useState } from 'react';
import { PatentAnalysisFilters } from '@/components/PatentAnalysisFilters';
import { PatentAnalysisStats } from '@/components/PatentAnalysisStats';
import { PatentAnalysisChart } from '@/components/PatentAnalysisChart';
import { PatentAnalysisTable } from '@/components/PatentAnalysisTable';

interface ValidPatentAnalysisProps {
  projectId: string;
  customerId: string;
}

export const ValidPatentAnalysis: React.FC<ValidPatentAnalysisProps> = ({ projectId, customerId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock data - 실제로는 Supabase에서 가져올 데이터
  const patents = [
    {
      id: 'pat-1',
      applicationNumber: '10-2023-0001234',
      title: 'AI 기반 이미지 처리 방법 및 시스템',
      status: '유효',
      category1: '1A',
      applicationDate: '2023-01-15',
      expiryDate: '2043-01-15',
      validityScore: 85
    },
    {
      id: 'pat-2',
      applicationNumber: '10-2022-0045678',
      title: '반도체 메모리 최적화 기술',
      status: '유효',
      category1: '1B',
      applicationDate: '2022-05-20',
      expiryDate: '2042-05-20',
      validityScore: 92
    },
    {
      id: 'pat-3',
      applicationNumber: '10-2023-0002345',
      title: '5G 통신 프로토콜 개선 방법',
      status: '심사중',
      category1: '1C',
      applicationDate: '2023-01-20',
      expiryDate: '2043-01-20',
      validityScore: 78
    },
    {
      id: 'pat-4',
      applicationNumber: '10-2021-0003456',
      title: '머신러닝 기반 데이터 분석',
      status: '무효',
      category1: '1A',
      applicationDate: '2021-03-10',
      expiryDate: '2041-03-10',
      validityScore: 45
    }
  ];

  const filteredPatents = patents.filter(patent => {
    const matchesSearch = searchTerm === '' || 
      patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patent.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || patent.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || patent.category1 === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <PatentAnalysisFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
      />

      <PatentAnalysisStats patents={patents} />

      <PatentAnalysisChart patents={patents} />

      <PatentAnalysisTable patents={filteredPatents} />
    </div>
  );
};
