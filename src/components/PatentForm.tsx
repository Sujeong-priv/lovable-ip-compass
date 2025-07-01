
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface PatentFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export const PatentForm: React.FC<PatentFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    piRef: initialData?.piRef || '',
    clientRef: initialData?.clientRef || '',
    status: initialData?.status || '신규출원',
    workingTitle: initialData?.workingTitle || '',
    inventionTitle: initialData?.inventionTitle || '',
    applicationNumber: initialData?.applicationNumber || '',
    applicationDate: initialData?.applicationDate || '',
    registrationNumber: initialData?.registrationNumber || '',
    registrationDate: initialData?.registrationDate || '',
    category1: initialData?.category1 || '',
    category2: initialData?.category2 || '',
    inventors: initialData?.inventors || ['']
  });

  const [newInventor, setNewInventor] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addInventor = () => {
    if (newInventor.trim()) {
      setFormData(prev => ({
        ...prev,
        inventors: [...prev.inventors.filter(inv => inv.trim()), newInventor.trim()]
      }));
      setNewInventor('');
    }
  };

  const removeInventor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      inventors: prev.inventors.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Mock classification data
  const category1Options = [
    { value: '1A', label: '1A - 인공지능' },
    { value: '1B', label: '1B - 반도체' },
    { value: '1C', label: '1C - 통신' },
    { value: '1D', label: '1D - 디스플레이' }
  ];

  const category2Options = [
    { value: '2A', label: '2A - 하드웨어' },
    { value: '2B', label: '2B - 소프트웨어' },
    { value: '2C', label: '2C - 시스템' },
    { value: '2D', label: '2D - 방법론' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 기본 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="piRef">PI IP Ref. (필수)</Label>
              <Input
                id="piRef"
                value={formData.piRef}
                onChange={(e) => handleInputChange('piRef', e.target.value)}
                placeholder="PI-2024-001"
                required
              />
            </div>

            <div>
              <Label htmlFor="clientRef">고객사 관리번호</Label>
              <Input
                id="clientRef"
                value={formData.clientRef}
                onChange={(e) => handleInputChange('clientRef', e.target.value)}
                placeholder="SEC-AI-001"
              />
            </div>

            <div>
              <Label htmlFor="status">상태정보</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="보유">보유</SelectItem>
                  <SelectItem value="신규출원">신규출원</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="workingTitle">가제</Label>
              <Input
                id="workingTitle"
                value={formData.workingTitle}
                onChange={(e) => handleInputChange('workingTitle', e.target.value)}
                placeholder="AI 기반 이미지 처리"
              />
            </div>

            <div>
              <Label htmlFor="inventionTitle">발명의 명칭</Label>
              <Textarea
                id="inventionTitle"
                value={formData.inventionTitle}
                onChange={(e) => handleInputChange('inventionTitle', e.target.value)}
                placeholder="AI 기반 이미지 처리 방법 및 시스템"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* 출원/등록 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>출원/등록 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="applicationNumber">출원번호</Label>
              <Input
                id="applicationNumber"
                value={formData.applicationNumber}
                onChange={(e) => handleInputChange('applicationNumber', e.target.value)}
                placeholder="10-2024-0001234"
              />
            </div>

            <div>
              <Label htmlFor="applicationDate">출원일</Label>
              <Input
                id="applicationDate"
                type="date"
                value={formData.applicationDate}
                onChange={(e) => handleInputChange('applicationDate', e.target.value)}
              />
            </div>

            {formData.status === '보유' && (
              <>
                <div>
                  <Label htmlFor="registrationNumber">등록번호</Label>
                  <Input
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                    placeholder="10-2456789"
                  />
                </div>

                <div>
                  <Label htmlFor="registrationDate">등록일</Label>
                  <Input
                    id="registrationDate"
                    type="date"
                    value={formData.registrationDate}
                    onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 기술 분류 */}
        <Card>
          <CardHeader>
            <CardTitle>기술 분류 (필수)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="category1">1축 기술분류</Label>
              <Select value={formData.category1} onValueChange={(value) => handleInputChange('category1', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="1축 분류 선택" />
                </SelectTrigger>
                <SelectContent>
                  {category1Options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category2">2축 기술분류</Label>
              <Select value={formData.category2} onValueChange={(value) => handleInputChange('category2', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="2축 분류 선택" />
                </SelectTrigger>
                <SelectContent>
                  {category2Options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 발명자 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>발명자 정보 (1인 이상 필수)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {formData.inventors.filter(inv => inv.trim()).map((inventor, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Badge variant="secondary" className="flex-1 justify-between">
                    <span>{inventor}</span>
                    <button
                      type="button"
                      onClick={() => removeInventor(index)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <Input
                value={newInventor}
                onChange={(e) => setNewInventor(e.target.value)}
                placeholder="발명자 이름"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInventor())}
              />
              <Button type="button" onClick={addInventor} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          취소
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          저장
        </Button>
      </div>
    </form>
  );
};
