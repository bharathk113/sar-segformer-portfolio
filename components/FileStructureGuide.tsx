import React from 'react';
import { Folder, FileImage, FileText } from 'lucide-react';

export const FileStructureGuide: React.FC = () => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-sm font-mono text-slate-400 shadow-2xl h-fit">
      <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
        <Folder className="text-cyan-400 w-4 h-4" /> 
        Required Asset Structure
      </h4>
      <div className="space-y-2 pl-1">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-yellow-500" />
          <span className="text-slate-300 font-bold">public/</span>
        </div>
        <div className="ml-3 space-y-2 border-l border-slate-700 pl-4 py-1">
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-yellow-500" />
            <span className="text-slate-300 font-bold">assets/</span>
          </div>
          <div className="ml-3 space-y-2 border-l border-slate-700 pl-4 py-1">
             <div className="flex items-center gap-2 group cursor-help" title="Input SAR image from Figure 3">
                <FileImage className="w-4 h-4 text-purple-400" />
                <span className="group-hover:text-cyan-300 transition-colors">fig3_sar.png</span>
             </div>
             <div className="flex items-center gap-2 group cursor-help" title="Water mask from Figure 3">
                <FileImage className="w-4 h-4 text-purple-400" />
                <span className="group-hover:text-cyan-300 transition-colors">fig3_mask.png</span>
             </div>
             <div className="flex items-center gap-2 group cursor-help" title="Input SAR image from Figure 5">
                <FileImage className="w-4 h-4 text-purple-400" />
                <span className="group-hover:text-cyan-300 transition-colors">fig5_sar.png</span>
             </div>
             <div className="flex items-center gap-2 group cursor-help" title="Water mask from Figure 5">
                <FileImage className="w-4 h-4 text-purple-400" />
                <span className="group-hover:text-cyan-300 transition-colors">fig5_mask.png</span>
             </div>
              <div className="flex items-center gap-2 group cursor-help" title="The ATBD PDF file">
                <FileText className="w-4 h-4 text-red-400" />
                <span className="group-hover:text-cyan-300 transition-colors">ATBD.pdf</span>
             </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-xs text-slate-500 bg-slate-950 p-3 rounded border border-slate-800">
        <span className="text-cyan-500 font-bold">Tip:</span> Create this folder structure in your project root to enable the interactive demos and PDF download.
      </div>
    </div>
  );
};