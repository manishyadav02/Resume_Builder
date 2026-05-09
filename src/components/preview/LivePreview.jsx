import React, { useRef } from 'react';
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

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${resumeData.personalInfo.firstName || 'My'}_Resume`,
    // pageStyle is injected to ensure printing removes margins added by browser
    pageStyle: `
      @page { size: auto; margin: 0mm; }
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
  });

  const SelectedTemplate = templateRegistry[templateId] || ModernTemplate;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 print:hidden">
        <h2 className="text-xl font-semibold text-slate-800">Live Preview</h2>
        <Button onClick={handlePrint} className="flex items-center gap-2">
          <Download size={16} /> Download PDF
        </Button>
      </div>
      
      {/* 
        The scale wrapper is a common trick to fit an A4 page into a smaller preview pane. 
        For a more robust implementation we might dynamically calculate scale based on parent width.
      */}
      <div className="flex-1 overflow-auto bg-slate-100 p-4 rounded-lg flex justify-center items-start border border-slate-200">
        <div 
          className="bg-white shadow-lg print:shadow-none"
          style={{ width: '210mm', minHeight: '297mm' }} // Standard A4 size
        >
          <div ref={componentRef} className="h-full">
            <SelectedTemplate data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
