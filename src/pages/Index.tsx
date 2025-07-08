
import React, { useState } from 'react';
import { AppHeader } from '@/components/AppHeader';
import { ProjectTabs } from '@/components/ProjectTabs';

const Index = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('customer-1');
  const [selectedProject, setSelectedProject] = useState('project-1');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - 실제로는 Supabase에서 가져올 데이터
  const customers = [
    { id: 'customer-1', name: '삼성전자', code: 'SEC' },
    { id: 'customer-2', name: 'LG전자', code: 'LGE' },
    { id: 'customer-3', name: 'SK하이닉스', code: 'SKH' }
  ];

  const projects = [
    { 
      id: 'project-1', 
      name: '반도체 IP 관리', 
      customer: 'customer-1',
      features: ['application', 'valid-patent', 'portfolio', 'framework'],
      status: 'active'
    },
    { 
      id: 'project-2', 
      name: '5G 통신 특허', 
      customer: 'customer-1',
      features: ['application', 'portfolio'],
      status: 'active'
    }
  ];

  const currentProject = projects.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader
        customers={customers}
        projects={projects}
        selectedCustomer={selectedCustomer}
        selectedProject={selectedProject}
        onCustomerChange={setSelectedCustomer}
        onProjectChange={setSelectedProject}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentProject && (
          <ProjectTabs
            currentProject={currentProject}
            customers={customers}
            selectedCustomer={selectedCustomer}
            selectedProject={selectedProject}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
