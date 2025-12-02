import { motion } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export const AboutApp = () => {
  const skills = [
    { name: 'React', level: 95, color: 'bg-ctp-sky' },
    { name: 'TypeScript', level: 90, color: 'bg-ctp-blue' },
    { name: 'Node.js', level: 85, color: 'bg-ctp-green' },
    { name: 'Python', level: 80, color: 'bg-ctp-yellow' },
    { name: 'Rust', level: 70, color: 'bg-ctp-peach' },
    { name: 'Linux', level: 95, color: 'bg-ctp-mauve' },
  ];
  
  return (
    <div className="h-full p-6 overflow-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-6 mb-8"
      >
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-ctp-mauve to-ctp-teal flex items-center justify-center text-4xl font-bold text-ctp-crust">
          F
        </div>
        <div>
          <h1 className="text-2xl font-bold text-ctp-text mb-1">Anubhav Prasai (aka Fianko)</h1>
          <p className="text-ctp-mauve font-medium mb-2">A high school student Overthinking the simplest things</p>
          <div className="flex items-center gap-2 text-ctp-subtext0 text-sm">
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
        className="mb-8"
      >
        <h2 className="text-lg font-semibold text-ctp-text mb-3 flex items-center gap-2">
          <span className="text-ctp-mauve">$</span> whoami
        </h2>
        <p className="text-ctp-subtext1 leading-relaxed">
          Hello! Welcome to my website. I'm Anubhav Prasai, also known as Fianko. 
          <br /><br />
          I'm a high school student from Nepal who loves math & CS. I got into the world of coding through QBASIC when I was 12 year old but into the real world of coding when I was 14 years old through C/C++ and I have been trying my best to expand my knowledge ever since.
        </p>
      </motion.div>
      
      {/* Skills */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-lg font-semibold text-ctp-text mb-4 flex items-center gap-2">
          <span className="text-ctp-mauve">$</span> pacman -Qi skills
        </h2>
        <div className="space-y-3">
          {skills.map((skill, i) => (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <div className="flex justify-between text-sm mb-1">
                <span className="text-ctp-text">{skill.name}</span>
                <span className="text-ctp-subtext0">{skill.level}%</span>
              </div>
              <div className="h-2 bg-ctp-surface0 rounded-full overflow-hidden">
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
        <h2 className="text-lg font-semibold text-ctp-text mb-4 flex items-center gap-2">
          <span className="text-ctp-mauve">$</span> cat contact.txt
        </h2>
        <div className="flex gap-3">
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
              className="w-10 h-10 rounded-lg bg-ctp-surface0 flex items-center justify-center
                       text-ctp-subtext0 hover:text-ctp-mauve hover:bg-ctp-surface1
                       transition-all duration-200 hover:scale-110"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
