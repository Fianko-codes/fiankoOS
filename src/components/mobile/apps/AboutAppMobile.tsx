import { motion } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin, Twitter } from 'lucide-react';

export const AboutAppMobile = () => {
    const skills = [
        { name: 'React', level: 95, color: 'bg-[hsl(var(--ctp-sky))]' },
        { name: 'TypeScript', level: 90, color: 'bg-[hsl(var(--ctp-blue))]' },
        { name: 'Node.js', level: 85, color: 'bg-[hsl(var(--ctp-green))]' },
        { name: 'Python', level: 80, color: 'bg-[hsl(var(--ctp-yellow))]' },
        { name: 'Rust', level: 70, color: 'bg-[hsl(var(--ctp-peach))]' },
        { name: 'Linux', level: 95, color: 'bg-[hsl(var(--ctp-mauve))]' },
    ];

    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4 text-center"
            >
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[hsl(var(--ctp-mauve))] to-[hsl(var(--ctp-teal))] 
                        flex items-center justify-center text-5xl font-bold text-[hsl(var(--ctp-crust))]">
                    F
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-[hsl(var(--ctp-text))] mb-1">Fianko</h1>
                    <p className="text-[hsl(var(--ctp-mauve))] font-medium mb-2">Full Stack Developer</p>
                    <div className="flex items-center justify-center gap-2 text-[hsl(var(--ctp-subtext0))] text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>San Francisco, CA</span>
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
                    Passionate developer with a love for clean code and beautiful interfaces.
                    I enjoy building tools that make developers' lives easier and exploring the
                    intersection of design and technology. When I'm not coding, you'll find me
                    customizing my Linux setup or contributing to open source projects.
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
                                <span className="text-[hsl(var(--ctp-subtext0))]">{skill.level}%</span>
                            </div>
                            <div className="h-3 bg-[hsl(var(--ctp-surface0))] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                                    className={`h-full ${skill.color} rounded-full`}
                                />
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
                        { icon: Mail, href: 'mailto:hello@fianko.dev', label: 'Email' },
                        { icon: Github, href: 'https://github.com', label: 'GitHub' },
                        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
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
