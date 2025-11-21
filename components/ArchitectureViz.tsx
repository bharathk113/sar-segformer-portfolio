import React, { useState } from 'react';
import { Info, ArrowRight, Cpu } from 'lucide-react';

interface StageDetail {
  id: string;
  title: string;
  subtitle: string;
  specs: string[];
  desc: string;
}

const details: Record<string, StageDetail> = {
  input: {
    id: 'input',
    title: 'Multi-Modal Input',
    subtitle: 'H × W × 4',
    specs: ['SAR VV', 'SAR VH', 'DEM (Elevation)', 'Slope'],
    desc: 'A 4-channel stack created via per-scene normalization. Agnostic to radiometric calibration (Sigma/Beta/Gamma).'
  },
  stage1: {
    id: 'stage1',
    title: 'Encoder Stage 1',
    subtitle: '1/4 Scale',
    specs: ['Stride: 4', 'Channels: 32', 'Layers: 2'],
    desc: 'High-resolution feature extraction using Overlap Patch Embeddings to preserve local continuity.'
  },
  stage2: {
    id: 'stage2',
    title: 'Encoder Stage 2',
    subtitle: '1/8 Scale',
    specs: ['Stride: 8', 'Channels: 64', 'Layers: 2'],
    desc: 'Intermediate feature processing with Efficient Self-Attention mechanisms.'
  },
  stage3: {
    id: 'stage3',
    title: 'Encoder Stage 3',
    subtitle: '1/16 Scale',
    specs: ['Stride: 16', 'Channels: 160', 'Layers: 2'],
    desc: 'Deep semantic feature capture. The workhorse of the MiT-B0 backbone.'
  },
  stage4: {
    id: 'stage4',
    title: 'Encoder Stage 4',
    subtitle: '1/32 Scale',
    specs: ['Stride: 32', 'Channels: 256', 'Layers: 2'],
    desc: 'Lowest resolution, highest semantic abstraction. Captures global context.'
  },
  decoder: {
    id: 'decoder',
    title: 'MLP Decoder',
    subtitle: 'Feature Fusion',
    specs: ['All-MLP', 'Upsampling x4', 'Concat'],
    desc: 'Unifies multi-scale features. Projects all encoder outputs to common dimension and fuses them.'
  },
  output: {
    id: 'output',
    title: 'Segmentation Map',
    subtitle: 'H/4 × W/4 × 2',
    specs: ['Class: Water', 'Class: Background'],
    desc: 'Final binary prediction mask. Interpolated back to original resolution during post-processing.'
  }
};

export const ArchitectureViz: React.FC = () => {
  const [selected, setSelected] = useState<string>('decoder');

  const Block = ({ id, label, sub, color = "blue" }: { id: string, label: string, sub?: string, color?: "blue" | "cyan" | "green" }) => {
    const isSelected = selected === id;
    const baseClasses = "relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer shadow-lg";
    const colorClasses = isSelected 
      ? (color === "green" ? "bg-emerald-500/20 border-emerald-400 shadow-emerald-500/20" : "bg-cyan-500/20 border-cyan-400 shadow-cyan-500/20")
      : "bg-slate-800 border-slate-700 hover:border-slate-500 hover:bg-slate-750";

    return (
      <div onClick={() => setSelected(id)} className={`${baseClasses} ${colorClasses} w-full`}>
        <span className={`font-bold text-sm md:text-base ${isSelected ? 'text-white' : 'text-slate-300'}`}>{label}</span>
        {sub && <span className="text-xs text-slate-500 mt-1 font-mono">{sub}</span>}
        {isSelected && <div className="absolute -bottom-2 w-4 h-4 bg-slate-900 border-b-2 border-r-2 border-cyan-400 rotate-45 translate-y-full z-10 md:hidden"></div>}
      </div>
    );
  };

  const Arrow = () => (
    <div className="hidden md:flex items-center justify-center px-2 text-slate-600">
      <ArrowRight size={20} />
    </div>
  );

  return (
    <div className="w-full bg-slate-900/50 rounded-xl border border-slate-800 p-4 md:p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Cpu className="text-cyan-400 w-6 h-6" />
        <h3 className="text-xl font-bold text-white">SegFormer Architecture Flow</h3>
      </div>

      {/* Diagram Area */}
      <div className="grid md:grid-cols-12 gap-4 mb-8 relative">
        
        {/* Input */}
        <div className="md:col-span-2 flex flex-col justify-center">
          <Block id="input" label="Inputs" sub="4 Channels" color="blue" />
        </div>

        {/* Encoder Stack */}
        <div className="md:col-span-6 grid grid-cols-4 gap-2 relative p-4 bg-slate-950/50 rounded-xl border border-slate-800/50 border-dashed">
            <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs text-slate-500 font-mono uppercase">MiT-B0 Encoder</div>
            <div className="flex flex-col gap-2 h-full justify-end">
              <div className="h-16 w-0.5 bg-slate-700 mx-auto mb-2"></div>
              <Block id="stage1" label="Stage 1" sub="C=32" />
            </div>
            <div className="flex flex-col gap-2 h-full justify-end">
               <div className="h-10 w-0.5 bg-slate-700 mx-auto mb-2"></div>
               <Block id="stage2" label="Stage 2" sub="C=64" />
            </div>
            <div className="flex flex-col gap-2 h-full justify-end">
               <div className="h-6 w-0.5 bg-slate-700 mx-auto mb-2"></div>
               <Block id="stage3" label="Stage 3" sub="C=160" />
            </div>
            <div className="flex flex-col gap-2 h-full justify-end">
               <div className="h-2 w-0.5 bg-slate-700 mx-auto mb-2"></div>
               <Block id="stage4" label="Stage 4" sub="C=256" />
            </div>
        </div>

        {/* Decoder & Output */}
        <div className="md:col-span-4 flex flex-col gap-4 justify-center">
           <div className="flex items-center gap-2">
             <Arrow />
             <Block id="decoder" label="MLP Decoder" color="cyan" />
           </div>
           <div className="flex items-center justify-center h-8">
              <div className="w-0.5 h-full bg-gradient-to-b from-cyan-500 to-emerald-500"></div>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-8"></div>
             <Block id="output" label="Water Mask" color="green" />
           </div>
        </div>
      </div>

      {/* Details Panel */}
      <div className="bg-slate-950 rounded-lg border border-slate-800 p-6 animate-fadeIn">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-2xl font-bold text-white">{details[selected].title}</h4>
              <span className="bg-slate-800 text-cyan-400 text-xs px-2 py-1 rounded font-mono border border-slate-700">
                {details[selected].subtitle}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-2xl">{details[selected].desc}</p>
          </div>
          
          <div className="w-full md:w-auto bg-slate-900 p-4 rounded-lg border border-slate-800 min-w-[200px]">
            <h5 className="text-sm font-semibold text-slate-500 uppercase mb-3 tracking-wider flex items-center gap-2">
              <Info size={14} /> Specifications
            </h5>
            <ul className="space-y-2">
              {details[selected].specs.map((spec, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};