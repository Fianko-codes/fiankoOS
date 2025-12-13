import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';

const projects = [
    {
        name: 'Schwarzschild',
        description: 'NASA SPACE APPS 2025 HACKATHON [GLOBAL NOMINEE] - A meteor tracking and visualization application built for the Meteor Madness challenge. Features real-time meteor data visualization using Cesium 3D globe.',
        tech: ['React', 'JavaScript', 'Node.js', 'Cesium', 'NASA API'],
        github: 'https://github.com/Fianko-codes/Schwarzschild',
        link: 'https://schwarzschild.anubhavprasai.com.np/',
        stars: 0,
        forks: 0,
        color: 'from-[hsl(var(--ctp-mauve))] to-[hsl(var(--ctp-pink))]',
    },
    {
        name: 'Portfolio Website',
        description: 'My personal portfolio website showcasing my projects, skills, and experience. Built with modern web technologies and featuring a clean, responsive design.',
        tech: ['React', 'TypeScript', 'Tailwind CSS'],
        github: 'https://github.com/Fianko-codes/fiankoOS',
        link: 'https://anubhavprasai.com.np',
        stars: 0,
        forks: 0,
        color: 'from-[hsl(var(--ctp-teal))] to-[hsl(var(--ctp-green))]',
    },
    {
    name: 'Blog Site',
    description: 'Longform explorations of ideas by me possibly on any topic I might be interested in.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/Fianko-codes/blog-site',
    link: 'https://blog.anubhavprasai.com.np',
    stars: 0,
    forks: 0,
    color: 'from-[hsl(var(--ctp-mauve))] to-[hsl(var(--ctp-pink))]',
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
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[hsl(var(--ctp-subtext0))] active:text-[hsl(var(--ctp-text))] 
                             transition-colors touch-manipulation p-2"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
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
