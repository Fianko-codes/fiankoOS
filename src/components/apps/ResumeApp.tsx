import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';

export const ResumeApp = () => {
  return (
    <div className="h-full flex flex-col bg-ctp-crust">
      {/* Header */}
      <div className="h-12 bg-ctp-mantle border-b border-ctp-surface0 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-ctp-red" />
          <span className="text-sm font-medium text-ctp-text">Resume.pdf</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs bg-ctp-blue text-ctp-crust rounded-lg hover:bg-ctp-sapphire transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open in New Tab
          </a>
          <a
            href="/resume.pdf"
            download
            className="px-3 py-1.5 text-xs bg-ctp-surface1 text-ctp-text rounded-lg hover:bg-ctp-surface2 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-ctp-mantle p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full max-w-5xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden"
        >
          <iframe
            src="/resume.pdf"
            className="w-full h-full min-h-[800px]"
            title="Resume PDF Viewer"
          />
        </motion.div>
      </div>
    </div>
  );
};

