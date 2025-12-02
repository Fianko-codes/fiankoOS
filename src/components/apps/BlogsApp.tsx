import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';

export const BlogsApp = () => {
  return (
    <div className="h-full p-6 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-full text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-32 h-32 rounded-2xl bg-gradient-to-br from-ctp-blue to-ctp-sapphire flex items-center justify-center mb-6"
        >
          <BookOpen className="w-16 h-16 text-ctp-crust" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-ctp-text mb-4"
        >
          My Blog
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-ctp-subtext1 text-lg mb-8 max-w-md"
        >
          Explorations of ideas possibly on any topic I might be interested in.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          href="https://blog.anubhavprasai.com.np"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-ctp-blue to-ctp-sapphire 
                     text-ctp-crust font-semibold hover:from-ctp-sapphire hover:to-ctp-blue
                     transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <span>Visit Blog</span>
          <ExternalLink className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </div>
  );
};

