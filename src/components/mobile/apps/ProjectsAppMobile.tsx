import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';

const projects = [
    {
        name: 'fiankoOS',
        description: 'A "riced" Arch Linux desktop environment running in the browser. Built with React, TypeScript, and Framer Motion.',
        tech: ['React', 'TypeScript', 'Tailwind', 'Zustand'],
        stars: 128,
        forks: 23,
        color: 'from-[hsl(var(--ctp-mauve))] to-[hsl(var(--ctp-pink))]',
    },
    {
        name: 'terminal-ui',
        description: 'A beautiful terminal emulator component for React applications with full xterm.js integration.',
        tech: ['React', 'xterm.js', 'TypeScript'],
        stars: 89,
        forks: 15,
        color: 'from-[hsl(var(--ctp-teal))] to-[hsl(var(--ctp-green))]',
    },
    {
        name: 'dotfiles',
        description: 'My personal dotfiles for Arch Linux + Hyprland. Catppuccin Mocha themed everything.',
        tech: ['Shell', 'Lua', 'CSS'],
        stars: 256,
        forks: 67,
        color: 'from-[hsl(var(--ctp-blue))] to-[hsl(var(--ctp-sapphire))]',
    },
    {
        name: 'api-toolkit',
        description: 'A collection of utilities for building robust REST APIs with automatic documentation generation.',
        tech: ['Node.js', 'Express', 'OpenAPI'],
        stars: 45,
        forks: 8,
        color: 'from-[hsl(var(--ctp-peach))] to-[hsl(var(--ctp-yellow))]',
    },
];

export const ProjectsAppMobile = () => {
    return (
        <div className="p-6 space-y-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-2"
            >
                <h1 className="text-2xl font-bold text-[hsl(var(--ctp-text))] mb-2 flex items-center gap-2">
                    <span className="text-[hsl(var(--ctp-mauve))]">~/</span>projects
                </h1>
                <p className="text-[hsl(var(--ctp-subtext0))] text-sm">
                    A collection of my open source work and side projects
                </p>
            </motion.div>

            <div className="space-y-4">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative overflow-hidden rounded-2xl bg-[hsl(var(--ctp-surface0))]/50 
                     border border-[hsl(var(--ctp-surface1))] active:scale-[0.98] transition-transform"
                    >
                        {/* Gradient accent */}
                        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${project.color}`} />

                        <div className="p-5 space-y-3">
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-semibold text-[hsl(var(--ctp-text))]">
                                    {project.name}
                                </h3>
                                <div className="flex items-center gap-3">
                                    <a
                                        href="#"
                                        className="text-[hsl(var(--ctp-subtext0))] active:text-[hsl(var(--ctp-text))] 
                             transition-colors touch-manipulation p-2"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="#"
                                        className="text-[hsl(var(--ctp-subtext0))] active:text-[hsl(var(--ctp-text))] 
                             transition-colors touch-manipulation p-2"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>

                            <p className="text-[hsl(var(--ctp-subtext1))] text-sm leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 text-xs rounded-lg bg-[hsl(var(--ctp-surface1))] 
                             text-[hsl(var(--ctp-subtext0))]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-[hsl(var(--ctp-subtext0))] pt-2">
                                <span className="flex items-center gap-1.5">
                                    <Star className="w-4 h-4 text-[hsl(var(--ctp-yellow))]" />
                                    {project.stars}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <GitFork className="w-4 h-4" />
                                    {project.forks}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
