'use client';

import React, { forwardRef } from 'react';
import { useActiveCV } from '@/store/useCVStore';
import { getTemplateComponent } from '@/components/preview/templates/TemplateRegistry';

const ResumePreview = forwardRef<HTMLDivElement>((props, ref) => {
  const activeCV = useActiveCV();
  const data = activeCV?.data;
  const templateId = activeCV?.templateId || 'template-1';
  
  const [scale, setScale] = React.useState(1);
  const internalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      const el = (ref as React.RefObject<HTMLDivElement>)?.current || internalRef.current;
      if (el) {
        const containerWidth = el.parentElement?.clientWidth || 0;
        const padding = 64; // p-8 = 32px * 2
        const availableWidth = containerWidth - padding;
        const resumeWidth = 794; // 210mm in pixels at 96 DPI
        
        if (availableWidth < resumeWidth) {
          setScale(availableWidth / resumeWidth);
        } else {
          setScale(1);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  if (!data) return null;

  const TemplateComponent = getTemplateComponent(templateId);

  return (
    <div 
      id="resume-preview-root"
      ref={ref || internalRef}
      className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm origin-top transition-all duration-300 print:shadow-none print:m-0 print:transform-none print:static"
      style={{ transform: `scale(${scale})` }}
    >
      <TemplateComponent data={data} />
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
