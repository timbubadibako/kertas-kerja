import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  preview?: React.ReactNode;
  resumeRef?: React.RefObject<HTMLDivElement | null>;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, preview, resumeRef }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="no-print">
        <Header resumeRef={resumeRef} />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="no-print">
          <Sidebar />
        </div>
        <main className="flex-1 flex overflow-hidden">
          {/* Split Screen Layout */}
          <div className="w-[40%] h-[calc(100vh-64px)] overflow-y-auto border-r border-gray-200 bg-white no-print">
            {/* Form Area - This is where the children (Editor) will go */}
            {children}
          </div>
          <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto bg-gray-100 p-8 flex justify-center print:p-0 print:bg-white print:overflow-visible">
            {/* Preview Area */}
            {preview || (
              <div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm p-12">
                <div className="animate-pulse flex flex-col gap-4">
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="mt-8 space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
