import { motion } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export const AboutApp = () => {
  const skills = [
    { name: 'React', level: 95, color: 'bg-ctp-sky' },
    { name: 'TypeScript', level: 90, color: 'bg-ctp-blue' },
    { name: 'Node.js', level: 85, color: 'bg-ctp-green' },
    { name: 'Python', level: 80, color: 'bg-ctp-yellow' },
    { name: 'Linux', level: 95, color: 'bg-ctp-mauve' },
    { name: 'C/C++', level: 90, color: 'bg-ctp-red' },
    { name: 'QBASIC', level: 85, color: 'bg-ctp-orange' },
  ];

  return (
    <div className="h-full p-6 overflow-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-6 mb-8"
      >
        {/* Profile Picture - Replace with your actual image */}
        <div className="relative group flex-shrink-0">
          {/* TODO: Replace /pfp.jpg with your actual profile picture path */}
          <img
            src="/pfp.jpg"
            alt="Anubhav Prasai Profile"
            className="w-24 h-24 rounded-2xl object-cover ring-2 ring-ctp-mauve/30 shadow-lg"
            onError={(e) => {
              // Fallback to gradient box if image doesn't exist
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling.style.display = 'flex';
            }}
          />
          {/* Fallback gradient (shown if image fails to load) */}
          <div
            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-ctp-mauve to-ctp-teal flex items-center justify-center text-4xl font-bold text-ctp-crust shadow-lg"
            style={{ display: 'none' }}
          >
            F
          </div>
          {/* Hover effect */}
          <div className="absolute inset-0 rounded-2xl bg-ctp-mauve/10 opacity-0 group-hover:opacity-100 transition-opacity" />
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
