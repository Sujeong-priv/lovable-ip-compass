
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Shield, 
  TrendingUp, 
  Grid3X3, 
  BarChart3,
  Calendar
} from 'lucide-react';
import { ApplicationProject } from '@/components/ApplicationProject';
import { ValidPatentAnalysis } from '@/components/ValidPatentAnalysis';
import { IPPortfolio } from '@/components/IPPortfolio';
import { TechFramework } from '@/components/TechFramework';
import { ProjectOverview } from '@/components/ProjectOverview';
import { MeetingHistory } from '@/components/MeetingHistory';

interface Customer {
  id: string;
  name: string;
  code: string;
}

interface Project {
  id: string;
  name: string;
  customer: string;
  features: string[];
  status: string;
}

interface ProjectTabsProps {
  currentProject: Project;
  customers: Customer[];
  selectedCustomer: string;
  selectedProject: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ProjectTabs: React.FC<ProjectTabsProps> = ({
  currentProject,
  customers,
  selectedCustomer,
  selectedProject,
  activeTab,
  onTabChange
}) => {
  return (
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

      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="inline-flex h-10 items-center justify-start w-auto bg-slate-100 p-1 rounded-md overflow-x-auto">
          <TabsTrigger value="overview" className="flex items-center space-x-2 whitespace-nowrap">
            <BarChart3 className="h-4 w-4" />
            <span>개요</span>
          </TabsTrigger>

          <TabsTrigger value="meeting" className="flex items-center space-x-2 whitespace-nowrap">
            <Calendar className="h-4 w-4" />
            <span>미팅</span>
          </TabsTrigger>
          
          {currentProject.features.includes('application') && (
            <TabsTrigger value="application" className="flex items-center space-x-2 whitespace-nowrap">
              <FileText className="h-4 w-4" />
              <span>출원 관리</span>
            </TabsTrigger>
          )}
          
          {currentProject.features.includes('valid-patent') && (
            <TabsTrigger value="valid-patent" className="flex items-center space-x-2 whitespace-nowrap">
              <Shield className="h-4 w-4" />
              <span>유효특허 분석</span>
            </TabsTrigger>
          )}
          
          {currentProject.features.includes('portfolio') && (
            <TabsTrigger value="portfolio" className="flex items-center space-x-2 whitespace-nowrap">
              <TrendingUp className="h-4 w-4" />
              <span>포트폴리오</span>
            </TabsTrigger>
          )}
          
          {currentProject.features.includes('framework') && (
            <TabsTrigger value="framework" className="flex items-center space-x-2 whitespace-nowrap">
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

        <TabsContent value="meeting" className="mt-6">
          <MeetingHistory />
        </TabsContent>

        {currentProject.features.includes('application') && (
          <TabsContent value="application" className="mt-6">
            <ApplicationProject 
              projectId={selectedProject}
              customerId={selectedCustomer}
            />
          </TabsContent>
        )}

        {currentProject.features.includes('valid-patent') && (
          <TabsContent value="valid-patent" className="mt-6">
            <ValidPatentAnalysis 
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
  );
};
