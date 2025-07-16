
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Calendar, FileText, Upload, Eye, Edit, Trash2 } from 'lucide-react';

interface MeetingFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
}

interface Meeting {
  id: string;
  round: number;
  title: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  agenda: string;
  participants: string[];
  files: MeetingFile[];
}

export const MeetingHistory: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      round: 1,
      title: '프로젝트 킥오프 미팅',
      date: '2024-01-15',
      time: '14:00',
      status: 'completed',
      agenda: '프로젝트 개요 및 일정 논의',
      participants: ['김철수', '이영희', '박민수'],
      files: [
        { id: '1', name: '프로젝트_개요서.pdf', type: 'PDF', size: '2.3MB', uploadedAt: '2024-01-15 13:30' },
        { id: '2', name: '일정표.xlsx', type: 'Excel', size: '1.1MB', uploadedAt: '2024-01-15 13:45' }
      ]
    },
    {
      id: '2',
      round: 2,
      title: '특허 분석 결과 검토',
      date: '2024-01-22',
      time: '15:30',
      status: 'completed',
      agenda: '1차 특허 분석 결과 발표 및 피드백',
      participants: ['김철수', '이영희', '정혜진'],
      files: [
        { id: '3', name: '특허분석_보고서_v1.pdf', type: 'PDF', size: '5.7MB', uploadedAt: '2024-01-22 15:00' }
      ]
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const getStatusBadge = (status: Meeting['status']) => {
    const statusConfig = {
      scheduled: { label: '예정', variant: 'outline' as const },
      completed: { label: '완료', variant: 'default' as const },
      cancelled: { label: '취소', variant: 'destructive' as const }
    };
    
    return (
      <Badge variant={statusConfig[status].variant}>
        {statusConfig[status].label}
      </Badge>
    );
  };

  const handleCreateMeeting = () => {
    setIsCreateDialogOpen(true);
  };

  const handleViewMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">미팅 히스토리</h2>
          <p className="text-slate-600 mt-1">프로젝트 미팅 기록 및 자료 관리</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateMeeting} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              새 미팅 등록
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>새 미팅 등록</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="round">회차</Label>
                  <Input id="round" type="number" placeholder="1" />
                </div>
                <div>
                  <Label htmlFor="date">날짜</Label>
                  <Input id="date" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="title">미팅 제목</Label>
                <Input id="title" placeholder="미팅 제목을 입력하세요" />
              </div>
              <div>
                <Label htmlFor="time">시간</Label>
                <Input id="time" type="time" />
              </div>
              <div>
                <Label htmlFor="status">상태</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">예정</SelectItem>
                    <SelectItem value="completed">완료</SelectItem>
                    <SelectItem value="cancelled">취소</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="agenda">안건</Label>
                <Textarea id="agenda" placeholder="미팅 안건을 입력하세요" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">등록</Button>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  취소
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>미팅 목록</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>회차</TableHead>
                <TableHead>제목</TableHead>
                <TableHead>일시</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>자료 수</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell className="font-medium">{meeting.round}회차</TableCell>
                  <TableCell>{meeting.title}</TableCell>
                  <TableCell>{meeting.date} {meeting.time}</TableCell>
                  <TableCell>{getStatusBadge(meeting.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      <FileText className="h-3 w-3 mr-1" />
                      {meeting.files.length}개
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewMeeting(meeting)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 미팅 상세보기 다이얼로그 */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedMeeting && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <span>{selectedMeeting.round}회차 - {selectedMeeting.title}</span>
                  {getStatusBadge(selectedMeeting.status)}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-700">일시</Label>
                    <p className="text-slate-900">{selectedMeeting.date} {selectedMeeting.time}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-700">참석자</Label>
                    <p className="text-slate-900">{selectedMeeting.participants.join(', ')}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-slate-700">안건</Label>
                  <p className="text-slate-900 mt-1">{selectedMeeting.agenda}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-sm font-medium text-slate-700">미팅 자료</Label>
                    <Button size="sm" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      파일 업로드
                    </Button>
                  </div>
                  
                  {selectedMeeting.files.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>파일명</TableHead>
                          <TableHead>타입</TableHead>
                          <TableHead>크기</TableHead>
                          <TableHead>업로드일시</TableHead>
                          <TableHead>작업</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedMeeting.files.map((file) => (
                          <TableRow key={file.id}>
                            <TableCell className="font-medium">{file.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{file.type}</Badge>
                            </TableCell>
                            <TableCell>{file.size}</TableCell>
                            <TableCell>{file.uploadedAt}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>업로드된 파일이 없습니다.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
