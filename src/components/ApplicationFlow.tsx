
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Send, 
  Edit,
  ArrowRight,
  Calendar,
  User
} from 'lucide-react';

interface ApplicationFlowProps {
  patentId: string;
}

export const ApplicationFlow: React.FC<ApplicationFlowProps> = ({ patentId }) => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [assignee, setAssignee] = useState('');

  // 출원 프로세스 단계 정의
  const stages = [
    { id: 'preparation', name: '출원 준비', status: 'completed', date: '2024-01-10', assignee: '김변리사' },
    { id: 'prior-art', name: '선행기술조사서 송부', status: 'completed', date: '2024-01-12', assignee: '박조사원' },
    { id: 'specification', name: '명세서 작성', status: 'completed', date: '2024-01-15', assignee: '이작성자' },
    { id: 'spec-delivery', name: '명세서 송부', status: 'current', date: '2024-01-18', assignee: '김변리사' },
    { id: 'spec-revision', name: '명세서 수정', status: 'pending', date: '', assignee: '' },
    { id: 'application', name: '특허출원 완료', status: 'pending', date: '', assignee: '' },
    { id: 'oa-received', name: 'OA 발생', status: 'pending', date: '', assignee: '' },
    { id: 'oa-response', name: 'OA 대응안 송부', status: 'pending', date: '', assignee: '' },
    { id: 'oa-complete', name: 'OA 대응 완료', status: 'pending', date: '', assignee: '' },
    { id: 'decision', name: '특허결정 또는 취하/포기', status: 'pending', date: '', assignee: '' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'current':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">완료</Badge>;
      case 'current':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">진행중</Badge>;
      case 'pending':
        return <Badge variant="outline">대기</Badge>;
      default:
        return <Badge variant="outline">대기</Badge>;
    }
  };

  const updateStage = (stageId: string) => {
    console.log('Updating stage:', stageId, { note, assignee });
    // 실제로는 Supabase를 통해 업데이트
    setSelectedStage(null);
    setNote('');
    setAssignee('');
  };

  return (
    <div className="space-y-6">
      {/* 진행 상황 타임라인 */}
      <Card>
        <CardHeader>
          <CardTitle>출원 진행 상황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  {getStatusIcon(stage.status)}
                  {index < stages.length - 1 && (
                    <div className={`w-px h-8 mt-2 ${
                      stage.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-sm font-medium text-gray-900">{stage.name}</h4>
                      {getStatusBadge(stage.status)}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {stage.date && (
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{stage.date}</span>
                        </div>
                      )}
                      {stage.assignee && (
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <User className="h-4 w-4" />
                          <span>{stage.assignee}</span>
                        </div>
                      )}
                      {(stage.status === 'current' || stage.status === 'pending') && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedStage(stage.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          업데이트
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {stage.status === 'current' && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">현재 진행 중인 단계입니다.</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 단계 업데이트 폼 */}
      {selectedStage && (
        <Card>
          <CardHeader>
            <CardTitle>
              단계 업데이트: {stages.find(s => s.id === selectedStage)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="assignee">담당자</Label>
              <Input
                id="assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="담당자 이름"
              />
            </div>
            
            <div>
              <Label htmlFor="note">진행 상황 메모</Label>
              <Textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="이 단계의 진행 상황이나 특이사항을 입력하세요..."
                rows={3}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setSelectedStage(null)}
              >
                취소
              </Button>
              <Button
                onClick={() => updateStage(selectedStage)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                업데이트
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* OA 대응 히스토리 (OA 관련 단계가 있는 경우) */}
      <Card>
        <CardHeader>
          <CardTitle>OA 대응 히스토리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-900">1차 OA</span>
                  <Badge variant="outline" className="text-orange-600">대응 완료</Badge>
                </div>
                <span className="text-sm text-orange-600">2024-01-20</span>
              </div>
              <p className="text-sm text-orange-800">
                청구항 1-3에 대한 진보성 거절이유 통지. 선행기술 KR10-2023-1234567과의 차이점 보강 필요.
              </p>
            </div>
            
            <div className="text-center text-gray-500 text-sm">
              추가 OA 대응 내역이 없습니다.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
