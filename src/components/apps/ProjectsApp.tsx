import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';

const projects = [
  {
    name: 'fiankoOS',
    description: 'A "riced" Arch Linux desktop environment running in the browser. Built with React, TypeScript, and Framer Motion.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Zustand'],
    stars: 128,
    forks: 23,
    color: 'from-ctp-mauve to-ctp-pink',
  },
  {
    name: 'terminal-ui',
    description: 'A beautiful terminal emulator component for React applications with full xterm.js integration.',
    tech: ['React', 'xterm.js', 'TypeScript'],
    stars: 89,
    forks: 15,
    color: 'from-ctp-teal to-ctp-green',
  },
  {
    name: 'dotfiles',
    description: 'My personal dotfiles for Arch Linux + Hyprland. Catppuccin Mocha themed everything.',
    tech: ['Shell', 'Lua', 'CSS'],
    stars: 256,
    forks: 67,
    color: 'from-ctp-blue to-ctp-sapphire',
  },
  {
    name: 'api-toolkit',
    description: 'A collection of utilities for building robust REST APIs with automatic documentation generation.',
    tech: ['Node.js', 'Express', 'OpenAPI'],
    stars: 45,
    forks: 8,
    color: 'from-ctp-peach to-ctp-yellow',
  },
];

export const ProjectsApp = () => {
  return (
    <div className="h-full p-6 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-xl font-bold text-ctp-text mb-2 flex items-center gap-2">
          <span className="text-ctp-mauve">~/</span>projects
        </h1>
        <p className="text-ctp-subtext0 text-sm">
          A collection of my open source work and side projects
        </p>
      </motion.div>
      
      <div className="grid gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-ctp-surface0/50 border border-ctp-surface1 hover:border-ctp-mauve/50 transition-all duration-300"
          >
            {/* Gradient accent */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color}`} />
            
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-ctp-text group-hover:text-ctp-mauve transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center gap-3">
                  <a 
                    href="#" 
                    className="text-ctp-subtext0 hover:text-ctp-text transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="text-ctp-subtext0 hover:text-ctp-text transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <p className="text-ctp-subtext1 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md bg-ctp-surface1 text-ctp-subtext0"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-ctp-subtext0">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-ctp-yellow" />
                    {project.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {project.forks}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
