import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useState } from 'react';

export const ResumeApp = () => {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));
  const handleResetZoom = () => setZoom(100);

  return (
    <div className="h-full flex flex-col bg-ctp-crust">
      {/* Header */}
      <div className="h-12 bg-ctp-mantle border-b border-ctp-surface0 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-ctp-red" />
          <span className="text-sm font-medium text-ctp-text">Resume.pdf</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 px-2 py-1 bg-ctp-surface0 rounded-lg">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:bg-ctp-surface1 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5 text-ctp-text" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 text-xs text-ctp-text hover:text-ctp-mauve transition-colors"
              title="Reset Zoom"
            >
              {zoom}%
            </button>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-ctp-surface1 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5 text-ctp-text" />
            </button>
          </div>

          {/* Action Buttons */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs bg-ctp-blue text-ctp-crust rounded-lg hover:bg-ctp-sapphire transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open
          </a>
          <a
            href="/resume.pdf"
            download="Anubhav_Prasai_Resume.pdf"
            className="px-3 py-1.5 text-xs bg-ctp-surface1 text-ctp-text rounded-lg hover:bg-ctp-surface2 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-ctp-mantle p-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          <iframe
            src="/resume.pdf"
            className="w-full h-full"
            title="Resume PDF Viewer"
            style={{ minHeight: '100%', border: 'none' }}
          />
        </motion.div>
      </div>
    </div>
  );
};
