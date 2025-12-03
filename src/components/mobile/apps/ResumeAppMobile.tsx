import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';

export const ResumeAppMobile = () => {
    return (
        <div className="h-full flex flex-col bg-[hsl(var(--ctp-mantle))]">
            {/* Header */}
            <div className="h-14 bg-[hsl(var(--ctp-crust))] border-b border-[hsl(var(--ctp-surface1))] flex items-center justify-between px-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[hsl(var(--ctp-red))]" />
                    <span className="text-sm font-medium text-[hsl(var(--ctp-text))]">Resume.pdf</span>
                </div>
                <div className="flex items-center gap-2">
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 text-xs bg-[hsl(var(--ctp-blue))] text-[hsl(var(--ctp-crust))] rounded-lg 
                                 active:scale-95 transition-all touch-manipulation flex items-center gap-1.5"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Open
                    </a>
                    <a
                        href="/resume.pdf"
                        download="Anubhav_Prasai_Resume.pdf"
                        className="px-3 py-2 text-xs bg-[hsl(var(--ctp-surface1))] text-[hsl(var(--ctp-text))] rounded-lg 
                                 active:scale-95 transition-all touch-manipulation flex items-center gap-1.5"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Download
                    </a>
                </div>
            </div>

            {/* PDF Viewer - Full Space Utilization */}
            <div className="flex-1 overflow-auto bg-[hsl(var(--ctp-mantle))] p-1">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden"
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
