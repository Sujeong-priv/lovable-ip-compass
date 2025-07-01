
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  FileText, 
  Target, 
  TrendingUp, 
  Grid3X3, 
  Plus,
  Search,
  Filter,
  BarChart3
} from 'lucide-react';
import { ApplicationProject } from '@/components/ApplicationProject';
import { CompetitorAnalysis } from '@/components/CompetitorAnalysis';
import { IPPortfolio } from '@/components/IPPortfolio';
import { TechFramework } from '@/components/TechFramework';
import { ProjectOverview } from '@/components/ProjectOverview';

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
      features: ['application', 'competitor', 'portfolio', 'framework'],
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
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-slate-900">Lovable AI</span>
                <Badge variant="secondary" className="text-xs">IP Management</Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="고객사 선택" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(customer => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="프로젝트 선택" />
                </SelectTrigger>
                <SelectContent>
                  {projects
                    .filter(p => p.customer === selectedCustomer)
                    .map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                신규 프로젝트
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentProject && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{currentProject.name}</h1>
                <p className="text-slate-600">
                  {customers.find(c => c.id === selectedCustomer)?.name} | 
                  <Badge variant="outline" className="ml-2">
                    {currentProject.status === 'active' ? '진행중' : '완료'}
                  </Badge>
                </p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-slate-100">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>개요</span>
                </TabsTrigger>
                
                {currentProject.features.includes('application') && (
                  <TabsTrigger value="application" className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>출원 관리</span>
                  </TabsTrigger>
                )}
                
                {currentProject.features.includes('competitor') && (
                  <TabsTrigger value="competitor" className="flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>경쟁사 분석</span>
                  </TabsTrigger>
                )}
                
                {currentProject.features.includes('portfolio') && (
                  <TabsTrigger value="portfolio" className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>포트폴리오</span>
                  </TabsTrigger>
                )}
                
                {currentProject.features.includes('framework') && (
                  <TabsTrigger value="framework" className="flex items-center space-x-2">
                    <Grid3X3 className="h-4 w-4" />
                    <span>기술 프레임</span>
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <ProjectOverview 
                  projectId={selectedProject}
                  customerId={selectedCustomer}
                />
              </TabsContent>

              {currentProject.features.includes('application') && (
                <TabsContent value="application" className="mt-6">
                  <ApplicationProject 
                    projectId={selectedProject}
                    customerId={selectedCustomer}
                  />
                </TabsContent>
              )}

              {currentProject.features.includes('competitor') && (
                <TabsContent value="competitor" className="mt-6">
                  <CompetitorAnalysis 
                    projectId={selectedProject}
                    customerId={selectedCustomer}
                  />
                </TabsContent>
              )}

              {currentProject.features.includes('portfolio') && (
                <TabsContent value="portfolio" className="mt-6">
                  <IPPortfolio 
                    projectId={selectedProject}
                    customerId={selectedCustomer}
                  />
                </TabsContent>
              )}

              {currentProject.features.includes('framework') && (
                <TabsContent value="framework" className="mt-6">
                  <TechFramework 
                    projectId={selectedProject}
                    customerId={selectedCustomer}
                  />
                </TabsContent>
              )}
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
