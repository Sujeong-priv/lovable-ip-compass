
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Users,
  Calendar,
  Award
} from 'lucide-react';

interface ProjectOverviewProps {
  projectId: string;
  customerId: string;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ projectId, customerId }) => {
  // Mock data - 실제로는 Supabase에서 가져올 데이터
  const stats = {
    totalPatents: 248,
    ownedPatents: 156,
    newApplications: 92,
    pendingApplications: 23,
    completedApplications: 69,
    recentActivity: [
      { type: 'application', title: 'AI 기반 이미지 처리 방법', status: '명세서 송부', date: '2024-01-15' },
      { type: 'registration', title: '반도체 메모리 최적화 기술', status: '등록 완료', date: '2024-01-14' },
      { type: 'oa', title: '5G 통신 프로토콜 개선', status: 'OA 대응 완료', date: '2024-01-13' },
    ]
  };

  const applicationProgress = (stats.completedApplications / (stats.completedApplications + stats.pendingApplications)) * 100;

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 특허 수</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatents}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              <Badge variant="secondary" className="text-xs">보유 {stats.ownedPatents}</Badge>
              <Badge variant="outline" className="text-xs">신규 {stats.newApplications}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">진행 중인 출원</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApplications}</div>
            <div className="text-xs text-muted-foreground mt-1">
              전체 출원 중 {Math.round((stats.pendingApplications / stats.newApplications) * 100)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">완료된 출원</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedApplications}</div>
            <div className="text-xs text-muted-foreground mt-1">
              성공률 {Math.round(applicationProgress)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">포트폴리오 강도</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <div className="text-xs text-muted-foreground mt-1">
              업계 평균 대비 +23%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 진행률 및 최근 활동 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>출원 진행률</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">전체 진행률</span>
                <span className="text-sm text-muted-foreground">{Math.round(applicationProgress)}%</span>
              </div>
              <Progress value={applicationProgress} className="w-full" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.completedApplications}</div>
                <div className="text-sm text-green-600">완료</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{stats.pendingApplications}</div>
                <div className="text-sm text-orange-600">진행중</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>최근 활동</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.type === 'application' && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {activity.type === 'registration' && (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    {activity.type === 'oa' && (
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {activity.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
