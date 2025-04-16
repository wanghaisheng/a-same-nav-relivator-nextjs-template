"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, FileText, Lock } from 'lucide-react';
import { Button } from '../../primitives/button';

export interface CurriculumSection {
  title: string;
  duration: number;
  preview: boolean;
  locked?: boolean;
}

export interface CourseCurriculumProps {
  sections: CurriculumSection[];
  onPlayPreview?: (sectionIndex: number) => void;
}

export function CourseCurriculum({ sections, onPlayPreview }: CourseCurriculumProps) {
  const [expandedSection, setExpandedSection] = useState<number | null>(0); // 默认展开第一个章节

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const handlePlayPreview = (index: number) => {
    if (onPlayPreview && sections[index].preview) {
      onPlayPreview(index);
    }
  };

  // 计算总时长
  const totalDuration = sections.reduce((total, section) => total + section.duration, 0);
  // 计算预览内容时长
  const previewDuration = sections
    .filter(section => section.preview)
    .reduce((total, section) => total + section.duration, 0);

  return (
    <div className="rounded-lg border">
      <div className="p-4 border-b bg-muted/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-semibold">课程大纲</h3>
          <div className="mt-2 sm:mt-0 text-sm text-muted-foreground">
            <span>{sections.length} 个章节</span>
            <span className="mx-2">•</span>
            <span>总时长 {totalDuration} 分钟</span>
            <span className="mx-2">•</span>
            <span>预览 {previewDuration} 分钟</span>
          </div>
        </div>
      </div>
      <div className="divide-y">
        {sections.map((section, index) => (
          <div key={index} className="overflow-hidden">
            <div 
              className={`flex items-center justify-between p-4 cursor-pointer hover:bg-accent ${expandedSection === index ? 'bg-accent/50' : ''}`}
              onClick={() => toggleSection(index)}
            >
              <div className="flex items-center gap-2">
                {section.preview ? <Play className="text-primary" /> : <FileText className="text-muted-foreground" />}
                <span className="font-medium">{section.title}</span>
                {section.locked && <Lock className="ml-1 w-4 h-4 text-muted-foreground" />}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{section.duration} 分钟</span>
                {expandedSection === index ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>
            {/* 章节内容展开区块，可根据实际业务扩展 */}
            {expandedSection === index && (
              <div className="p-4 bg-muted/30">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{section.preview ? '可预览' : '仅限付费'}</span>
                  {section.preview && (
                    <Button size="sm" variant="outline" onClick={() => handlePlayPreview(index)}>
                      试听/预览
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
