import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';

export const BlogsAppMobile = () => {
    return (
        <div className="h-full p-6 flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center text-center"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-40 h-40 rounded-3xl bg-gradient-to-br from-[hsl(var(--ctp-blue))] to-[hsl(var(--ctp-sapphire))] 
                               flex items-center justify-center mb-8"
                >
                    <BookOpen className="w-20 h-20 text-[hsl(var(--ctp-crust))]" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold text-[hsl(var(--ctp-text))] mb-4"
                >
                    My Blog
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[hsl(var(--ctp-subtext1))] text-lg mb-10 max-w-sm leading-relaxed"
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
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl 
                               bg-gradient-to-r from-[hsl(var(--ctp-blue))] to-[hsl(var(--ctp-sapphire))]
                               text-[hsl(var(--ctp-crust))] font-semibold 
                               active:scale-95 transition-all duration-200 touch-manipulation shadow-lg"
                >
                    <span className="text-lg">Visit Blog</span>
                    <ExternalLink className="w-6 h-6" />
                </motion.a>
            </motion.div>
        </div>
    );
};

