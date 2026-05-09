import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import ModernTemplate from '../templates/ModernTemplate';
import { Button } from '../ui/Button';

const templateRegistry = {
  'modern': ModernTemplate,
};

export default function LivePreview() {
  const { resumeData, templateId } = useResumeStore();
  const componentRef = useRef(null);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${resumeData.personalInfo.firstName || 'My'}_Resume`,
    // pageStyle is injected to ensure printing removes margins added by browser
    pageStyle: `
      @page { size: auto; margin: 0mm; }
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
  });

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        // A4 width is roughly 794px. We use 820px to leave some margin.
        const containerWidth = containerRef.current.clientWidth;
        const newScale = Math.min(1, containerWidth / 820);
        setScale(newScale);
      }
    };

    // Use ResizeObserver for more accurate container resizing (e.g. sidebar toggles)
    const observer = new ResizeObserver(() => updateScale());
    if (containerRef.current) observer.observe(containerRef.current);
    
    updateScale();
    
    return () => observer.disconnect();
  }, []);

  const SelectedTemplate = templateRegistry[templateId] || ModernTemplate;

  // Calculate the height compensation for the scaled element 
  // so the container scrollbar perfectly matches the visible shrunk height
  const scaledHeightDiff = `calc(297mm * ${scale - 1})`;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 print:hidden">
        <h2 className="text-xl font-semibold text-slate-800">Live Preview</h2>
        <Button onClick={handlePrint} className="flex items-center gap-2 text-sm sm:text-base px-2 sm:px-4">
          <Download size={16} /> <span className="hidden sm:inline">Download PDF</span>
        </Button>
      </div>
      
      <div 
        ref={containerRef} 
        className="flex-1 overflow-auto bg-slate-100 p-2 sm:p-4 rounded-lg flex justify-center items-start border border-slate-200"
      >
        <div 
          className="bg-white shadow-lg print:shadow-none origin-top transition-transform duration-200"
          style={{ 
            width: '210mm', 
            minHeight: '297mm',
            transform: `scale(${scale})`,
            marginBottom: scale < 1 ? scaledHeightDiff : '0'
          }} 
        >
          <div ref={componentRef} className="h-full">
            <SelectedTemplate data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
