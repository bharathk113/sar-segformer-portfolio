import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { MetricData, SpeedData } from '../types';

const radarData: MetricData[] = [
  { metric: 'Water IoU', B0: 0.9580, B1: 0.9521, fullMark: 1 },
  { metric: 'Mean IoU', B0: 0.9719, B1: 0.9753, fullMark: 1 },
  { metric: 'Precision', B0: 0.9829, B1: 0.9812, fullMark: 1 },
  { metric: 'Recall', B0: 0.9742, B1: 0.9698, fullMark: 1 },
  { metric: 'Accuracy', B0: 0.9937, B1: 0.9928, fullMark: 1 },
];

const speedData: SpeedData[] = [
  { model: 'MiT-B0 (Ours)', time: 0.0237 },
  { model: 'MiT-B1 (Large)', time: 0.0350 },
];

export const PerformanceCharts: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Radar Chart */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Accuracy Metrics Comparison</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0.9, 1]} tick={false} />
              <Radar
                name="SegFormer-B0"
                dataKey="B0"
                stroke="#22d3ee"
                strokeWidth={2}
                fill="#22d3ee"
                fillOpacity={0.3}
              />
              <Radar
                name="SegFormer-B1"
                dataKey="B1"
                stroke="#94a3b8"
                strokeWidth={2}
                fill="#94a3b8"
                fillOpacity={0.1}
              />
              <Legend wrapperStyle={{ color: '#cbd5e1' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-center text-slate-500 mt-2">Values normalized. B0 outperforms or matches B1 in most metrics.</p>
      </div>

      {/* Speed Comparison */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg flex flex-col">
        <h3 className="text-lg font-semibold text-white mb-4">Inference Speed (sec/patch)</h3>
        <div className="h-64 w-full flex-grow">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={speedData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" domain={[0, 0.04]} stroke="#64748b" tick={{fontSize: 12}} />
              <YAxis dataKey="model" type="category" stroke="#94a3b8" width={100} tick={{fontSize: 12}} />
              <Tooltip
                cursor={{fill: '#1e293b'}}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
              />
              <Bar dataKey="time" fill="#22d3ee" barSize={30} radius={[0, 4, 4, 0]}>
                {/* Conditional coloring if supported, but generic fill works for now */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded">
          <p className="text-sm text-cyan-300 text-center font-medium">
            B0 is <span className="font-bold text-white">48% Faster</span> than B1
          </p>
        </div>
      </div>
    </div>
  );
};