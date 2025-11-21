import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ArchitectureViz } from './components/ArchitectureViz';
import { PerformanceCharts } from './components/PerformanceCharts';
import { CompareSlider } from './components/CompareSlider';
import { NeuralBackground } from './components/NeuralBackground';
import { ArrowRight, Download, Database, Zap, Droplets, Mountain, FileText } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Typewriter State
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  
  const words = ["Haze", "Clouds", "Speckle", "Rain"];

  // Typewriter Effect
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 150;
    const currentWord = words[wordIndex];

    if (!isDeleting && currentText === currentWord) {
      // Word complete, pause then delete
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentText === '') {
      // Delete complete, next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText(prev => 
        isDeleting ? currentWord.substring(0, prev.length - 1) : currentWord.substring(0, prev.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, wordIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'context', 'methodology', 'results', 'demo'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjusted detection range
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden scroll-mt-20">
        {/* Backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950 z-0" />
        <NeuralBackground />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Algorithm Theoretical Basis Document (ATBD)
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Mapping Water through the <span className="text-cyan-400 border-r-4 border-cyan-400 pr-2 animate-pulse">{currentText}</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl">
              A radiometrically agnostic SegFormer framework that fuses C-band SAR with topographic data to deliver state-of-the-art water segmentation accuracy, day or night.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('demo')} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-lg font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                Try Interactive Demo <ArrowRight size={20} />
              </button>
              {/* Relative path to assets */}
              <a href="assets/ATBD.pdf" download className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-bold transition-all flex items-center gap-2 border border-slate-700">
                Download ATBD <Download size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Context / Problem Section */}
      <section id="context" className="py-24 bg-slate-950 relative border-t border-slate-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Optical Sensors Fail <br />
                <span className="text-slate-500">When You Need Them Most.</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-slate-900 p-3 rounded-lg h-fit border border-slate-800">
                    <Droplets className="text-cyan-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">The Optical Limit</h3>
                    <p className="text-slate-400">
                      Landsat and Sentinel-2 are industry standards, but they rely on passive sunlight. Cloud cover and nighttime render them blind during critical flood events.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-slate-900 p-3 rounded-lg h-fit border border-slate-800">
                    <Zap className="text-cyan-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">The SAR Advantage</h3>
                    <p className="text-slate-400">
                      Synthetic Aperture Radar (SAR) sees through clouds and darkness. However, traditional thresholding struggles with signal noise (speckle) and complex terrain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Abstract Visualization Card */}
            <div className="relative bg-slate-900 rounded-2xl p-8 border border-slate-800 sar-noise">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-slate-800"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-32 bg-slate-800 rounded-lg animate-pulse border border-slate-700 flex items-center justify-center text-slate-600 text-xs font-mono">Optical (Cloudy)</div>
                  <div className="h-32 bg-slate-800 rounded-lg border border-slate-700 sar-noise flex items-center justify-center text-cyan-400/50 text-xs font-mono">SAR (Noisy)</div>
                </div>
                <div className="h-66 bg-slate-950 rounded-lg border-2 border-cyan-500/30 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-500/10"></div>
                  <span className="font-bold text-cyan-400 text-center">
                    SegFormer<br/>Optimization
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology / Architecture */}
      <section id="methodology" className="py-24 bg-slate-950 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Radiometrically Agnostic Architecture
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Adapting the lightweight SegFormer (MiT-B0) for multi-modal sensor fusion. 
              Our approach normalizes input scenes, making the model robust to different calibration levels.
            </p>
          </div>
          
          <ArchitectureViz />
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
             <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <div className="flex items-center gap-3 mb-3 text-white font-bold">
                   <Mountain size={20} className="text-cyan-400"/>
                   Topographic Fusion
                </div>
                <p className="text-sm text-slate-400">
                   Combines SAR backscatter with DEM and Slope data to differentiate water from shadow and flat terrain.
                </p>
             </div>
             <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <div className="flex items-center gap-3 mb-3 text-white font-bold">
                   <Database size={20} className="text-cyan-400"/>
                   Per-Scene Norm
                </div>
                <p className="text-sm text-slate-400">
                   Dynamic normalization enables the model to handle Sigma, Beta, or Gamma naught products without retraining.
                </p>
             </div>
             <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <div className="flex items-center gap-3 mb-3 text-white font-bold">
                   <Zap size={20} className="text-cyan-400"/>
                   Efficiency First
                </div>
                <p className="text-sm text-slate-400">
                   MiT-B0 backbone offers a 48% speed increase over B1 with negligible accuracy loss (0.958 vs 0.956 IoU).
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-24 bg-slate-950 border-t border-slate-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Performance Benchmarks
            </h2>
            <p className="text-slate-400">
              Evaluated on the S1S2-Water global dataset and internal EOS-04 imagery.
            </p>
           </div>
           <PerformanceCharts />
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-24 bg-slate-900 relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 left-0 w-full h-full sar-noise opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-2 block">Sample Visualization</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              See the Algorithm in Action
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Drag the slider to reveal the water segmentation mask generated by our SegFormer-B0 model.
              Notice how it captures small water bodies and handles noise.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-500/30">Fig 1</span>
                Complex scenario with thin ice-sheet over lakes
              </h3>
              {/* Using relative paths without leading slash */}
              <CompareSlider 
                labelBefore="Input SAR (EOS-04)" 
                labelAfter="Water Prediction" 
                beforeSrc="assets/fig3_sar.png"
                afterSrc="assets/fig3_mask.png"
              />
              <p className="mt-4 text-slate-400 text-sm">
                Demonstrates capability to extract lakes covered with thin layer of ICE and speckle noise.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                 <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-500/30">Fig 2</span>
                 Small Water Bodies
              </h3>
              <CompareSlider 
                labelBefore="Input SAR" 
                labelAfter="Water Prediction"
                beforeSrc="assets/fig5_sar.png"
                afterSrc="assets/fig5_mask.png"
              />
              <p className="mt-4 text-slate-400 text-sm">
                The Transformer backbone's global context allows it to identify fragmented water bodies that local CNN kernels often miss.
              </p>
            </div>
          </div>

          {/* Download CTA */}
          <div className="mt-24 bg-slate-800/50 rounded-2xl p-8 border border-slate-700 text-center max-w-3xl mx-auto backdrop-blur-sm">
            <FileText className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Read the Full Research</h3>
            <p className="text-slate-400 mb-8">
              Dive deeper into the training protocol, dual-stratified evaluation, and ablation studies in the Algorithm Theoretical Basis Document.
            </p>
            <a href="assets/ATBD.pdf" download className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-8 py-3 rounded-lg font-bold transition-colors">
              Download ATBD PDF <Download size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Model Coming Soon Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-4">
               <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
               <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">Coming Soon</span>
            </div>
            <p className="text-slate-300 text-lg">
              Pre-trained model weights and inference scripts will be made available for download here soon. <br className="hidden md:block"/> 
              <span className="text-white font-semibold">Stay tuned for updates!</span>
            </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="font-bold text-lg tracking-tight text-white">SAR<span className="text-cyan-400">SegFormer</span></span>
            <p className="text-slate-500 text-sm mt-1">Water Resources Group (WRG), NRSC</p>
          </div>
          <div className="text-slate-600 text-sm">
            &copy; 2025 Bharath Kumar Reddy K. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}