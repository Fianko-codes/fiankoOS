import { motion } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export const AboutAppMobile = () => {
    const skills = [
        { name: 'React', level: 95, color: 'bg-[hsl(var(--ctp-sky))]' },
        { name: 'TypeScript', level: 90, color: 'bg-[hsl(var(--ctp-blue))]' },
        { name: 'Node.js', level: 85, color: 'bg-[hsl(var(--ctp-green))]' },
        { name: 'Python', level: 80, color: 'bg-[hsl(var(--ctp-yellow))]' },
        { name: 'Linux', level: 95, color: 'bg-[hsl(var(--ctp-mauve))]' },
        { name: 'C/C++', level: 90, color: 'bg-[hsl(var(--ctp-red))]' },
        { name: 'QBASIC', level: 85, color: 'bg-[hsl(var(--ctp-orange))]' },
    ];

    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4 text-center"
            >
                <div className="w-32 h-32 rounded-3xl relative bg-gradient-to-br from-[hsl(var(--ctp-mauve))] to-[hsl(var(--ctp-teal))] flex items-center justify-center overflow-hidden">
                    <span className="text-5xl font-bold text-[hsl(var(--ctp-crust))]">F</span>
                    <img
                        src="/pfp.jpg"
                        alt="Anubhav Prasai"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-[hsl(var(--ctp-text))] mb-1">Anubhav Prasai <br />(aka Fianko)</h1>
                    <p className="text-[hsl(var(--ctp-mauve))] font-medium mb-2">A high school student Overthinking the simplest things</p>
                    <div className="flex items-center justify-center gap-2 text-[hsl(var(--ctp-subtext0))] text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>Jhapa, Nepal</span>
                    </div>
                </div>
            </motion.div>

            {/* Bio */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h2 className="text-xl font-semibold text-[hsl(var(--ctp-text))] mb-3 flex items-center gap-2">
                    <span className="text-[hsl(var(--ctp-mauve))]">$</span> whoami
                </h2>
                <p className="text-[hsl(var(--ctp-subtext1))] leading-relaxed">
                    Hello! Welcome to my website. I'm Anubhav Prasai, also known as Fianko.
                    <br /><br />
                    I'm a high school student from Nepal who loves math & CS. I got into the world of coding through QBASIC when I was 12 year old but into the real world of coding when I was 14 years old through C/C++ and I have been trying my best to expand my knowledge ever since.
                    <br /><br />
                    The image above is of me visiting the beach for the first time when I attended IM²C awarding summit in Hongkong. You can find my contact informations below.
                    <br /><br />
                    Wishing you the best time here and a great journey ahead!
                </p>
            </motion.div>

            {/* Skills */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="text-xl font-semibold text-[hsl(var(--ctp-text))] mb-4 flex items-center gap-2">
                    <span className="text-[hsl(var(--ctp-mauve))]">$</span> pacman -Qi skills
                </h2>
                <div className="space-y-4">
                    {skills.map((skill, i) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                        >
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-[hsl(var(--ctp-text))] font-medium">{skill.name}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Contact */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h2 className="text-xl font-semibold text-[hsl(var(--ctp-text))] mb-4 flex items-center gap-2">
                    <span className="text-[hsl(var(--ctp-mauve))]">$</span> cat contact.txt
                </h2>
                <div className="grid grid-cols-4 gap-3">
                    {[
                        { icon: Mail, href: 'mailto:me@anubhavprasai.com.np', label: 'Email' },
                        { icon: Github, href: 'https://github.com/Fianko-codes', label: 'GitHub' },
                        { icon: Linkedin, href: 'https://linkedin.com/in/anubhavprasai', label: 'LinkedIn' },
                        { icon: Twitter, href: 'https://X.com/PrasaiAnubhav', label: 'Twitter' },
                        { icon: Instagram, href: 'https://www.instagram.com/__dear.honey__/', label: 'Instagram' },
                    ].map(({ icon: Icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-16 rounded-2xl bg-[hsl(var(--ctp-surface0))] flex flex-col items-center justify-center gap-1
                       text-[hsl(var(--ctp-subtext0))] hover:text-[hsl(var(--ctp-mauve))] hover:bg-[hsl(var(--ctp-surface1))]
                       transition-all duration-200 active:scale-95 touch-manipulation"
                        >
                            <Icon className="w-6 h-6" />
                            <span className="text-xs">{label}</span>
                        </a>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
