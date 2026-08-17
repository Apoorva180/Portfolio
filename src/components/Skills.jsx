import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillsData } from '../data/portfolioData';
import './Skills.css';

// Authentic Official Tech Logos
const HtmlIcon = () => (
    <svg viewBox="0 0 24 24" width="30" height="30">
        <path d="M1.5 0h21l-1.91 21.563L11.99 24.5 2.41 21.563z" fill="#E34F26" />
        <path d="M12 2.188v19.988l7.633-2.34L21.2 2.188z" fill="#EF652A" />
        <path d="M12 9.426H8.053l-.273-3.1h8.44V3.882H4.966l.078.892.744 8.434H12zm0 6.643l-.01.003-3.69-.997-.236-2.67H5.613l.47 5.297 5.914 1.64.003.001z" fill="#ECECEC" />
        <path d="M12 9.426v2.444h4.153l-.392 4.417-3.761 1.015v2.483l5.918-1.64.085-.964.67-7.553.078-.892zM12 3.882v2.444h8.483l.078-.892.137-1.552z" fill="#FFF" />
    </svg>
);

const CssIcon = () => (
    <svg viewBox="0 0 24 24" width="30" height="30">
        <path d="M1.5 0h21l-1.91 21.563L11.99 24.5 2.41 21.563z" fill="#1572B6" />
        <path d="M12 2.188v19.988l7.633-2.34L21.2 2.188z" fill="#33A9DC" />
        <path d="M12 9.426H8.053l-.273-3.1h8.44V3.882H4.966l.078.892.744 8.434H12zm0 6.643l-.01.003-3.69-.997-.236-2.67H5.613l.47 5.297 5.914 1.64.003.001z" fill="#ECECEC" />
        <path d="M12 9.426v2.444h4.153l-.392 4.417-3.761 1.015v2.483l5.918-1.64.085-.964.67-7.553.078-.892zM12 3.882v2.444h8.483l.078-.892.137-1.552z" fill="#FFF" />
    </svg>
);

const JsIcon = () => (
    <svg viewBox="0 0 24 24" width="30" height="30">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M6.9 19.5c.9 0 1.6-.5 1.6-1.7v-7.3H6.8v7.2c0 .4-.2.6-.5.6-.2 0-.6-.1-.9-.3l-.5 1.1c.5.3 1.2.4 2 .4zm7.4 0c2.1 0 3.3-1.1 3.3-2.7 0-1.4-.9-2.2-2.4-2.8l-.6-.2c-.7-.3-1-.6-1-1.1 0-.6.5-1 1.3-1 .8 0 1.4.3 1.8.8l.9-.9c-.6-.7-1.5-1.1-2.7-1.1-1.8 0-3 1.1-3 2.6 0 1.3.8 2.1 2.2 2.6l.6.2c.8.3 1.2.6 1.2 1.2 0 .7-.6 1.2-1.6 1.2-.9 0-1.7-.4-2.2-1.1l-.9 1c.7 1.7 1.3 3.1 1.3z" fill="#000" />
    </svg>
);

const TsIcon = () => (
    <svg viewBox="0 0 24 24" width="30" height="30">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M11.6 12.3H8.7v7.2H6.9v-7.2H4.1V10.7h7.5v1.6zm2.4 7.2c.8 0 1.5-.3 2-1l-.9-.9c-.3.4-.7.6-1.1.6-.7 0-1.2-.4-1.2-1 0-.6.4-.9 1.1-1.1l.6-.2c1.3-.4 2.1-1 2.1-2.3 0-1.4-1.1-2.4-2.7-2.4-1.4 0-2.3.5-2.8 1.2l.9.8c.4-.5.9-.8 1.7-.8.8 0 1.3.4 1.3.9 0 .5-.3.8-1 .9l-.6.2c-1.3.4-2.1 1-2.1 2.3 0 1.5 1.1 2.8 2.7 2.8z" fill="#FFF" />
    </svg>
);

const ReactIcon = () => (
    <svg viewBox="0 0 24 24" width="32" height="32">
        <ellipse cx="12" cy="12" rx="9.5" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="9.5" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9.5" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
    </svg>
);

const ReduxIcon = () => (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none">
        <path d="M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.043-.914-.796-1.635-1.756-1.635h-.05c-.987.043-1.743.884-1.7 1.825.045.463.235.85.522 1.13-1.11 2.16-2.794 3.744-5.328 5.054-1.714.89-3.51 1.22-5.26.978-1.458-.195-2.61-.83-3.322-1.874-.998-1.497-1.088-3.12-.24-4.73.612-1.16 1.566-2.02 2.168-2.44-.13-.43-.325-1.15-.42-1.675-4.614 3.367-4.138 7.914-2.736 10.054 1.045 1.57 3.17 2.547 5.488 2.547.63 0 1.261-.065 1.891-.196 4.04-.784 7.108-3.133 8.844-6.28zm5.306-2.905c-2.408-2.84-5.954-4.403-10.012-4.403h-.52c-.27-.57-.884-.978-1.586-.978h-.05c-.987.043-1.743.884-1.7 1.825.043.913.796 1.634 1.756 1.634h.05c.738-.03 1.37-.507 1.635-1.16h.565c2.405 0 4.68.7 6.748 2.084 1.587 1.056 2.723 2.43 3.37 4.085.544 1.324.52 2.614-.065 3.734-.898 1.713-2.408 2.636-4.408 2.636-1.283 0-2.502-.39-3.13-.674-.36.34-.985.903-1.43 1.248 1.386.63 2.798.978 4.152.978 3.088 0 5.37-1.713 6.24-3.4.933-1.842.88-4.99-1.21-7.41zM5.786 17.74c.044.914.796 1.635 1.757 1.635h.05c.986-.044 1.742-.884 1.7-1.826-.044-.912-.797-1.633-1.757-1.633h-.05c-.065 0-.152 0-.217.02-1.283-2.126-1.826-4.404-1.608-6.855.152-1.845.76-3.44 1.803-4.747.87-1.12 2.566-1.67 3.705-1.69 3.186-.063 4.526 3.916 4.625 5.497.433.1 1.15.325 1.655.52C17.097 3.1 13.7.587 10.07.587c-3.544 0-6.845 2.87-8.053 7.027-.75 2.626-.522 5.164.666 7.416-.13.303-.195.63-.195.956z" fill="#764ABC"/>
    </svg>
);

const TailwindIcon = () => (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="#06B6D4">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
    </svg>
);

const GitIcon = () => (
    <svg viewBox="0 0 24 24" width="30" height="30">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.44.516.515.655 1.258.428 1.9l2.747 2.747c.641-.227 1.384-.087 1.9.43.743.743.743 1.95 0 2.693-.743.743-1.95.743-2.693 0-.54-.54-.675-1.312-.403-1.977l-2.562-2.562v6.232c.16.084.31.196.442.327.743.743.743 1.95 0 2.693-.743.743-1.95.743-2.693 0-.743-.743-.743-1.95 0-2.693.167-.167.36-.29.566-.367v-6.32a1.862 1.862 0 01-.566-.367c-.54-.54-.675-1.312-.403-1.977l-2.73-2.73-6.19 6.19c-.604.604-.604 1.582 0 2.187l10.48 10.478c.604.604 1.582.604 2.187 0l10.48-10.478c.603-.604.603-1.582 0-2.187z" fill="#F05032" />
    </svg>
);

// Low-poly gem tile wrapper — unique faceted hexagon SVG frame (3D look via face shading)
const GemTile = ({ color, children }) => (
    <div className="gem-tile-wrap">
        <svg
            viewBox="0 0 90 90"
            xmlns="http://www.w3.org/2000/svg"
            className="gem-tile-svg"
        >
            {/* Base hexagon body */}
            <polygon points="45,4 78,22 78,68 45,86 12,68 12,22" fill="#1a1d2e" />
            {/* Top bright face — catches light */}
            <polygon points="45,4 78,22 45,38 12,22" fill="rgba(255,255,255,0.11)" />
            {/* Left face — slightly lighter */}
            <polygon points="12,22 45,38 45,86 12,68" fill="rgba(255,255,255,0.05)" />
            {/* Right face — darker shadow */}
            <polygon points="78,22 78,68 45,86 45,38" fill="rgba(0,0,0,0.22)" />
            {/* Subtle inner accent using the tech color */}
            <polygon points="45,20 66,31 66,59 45,70 24,59 24,31" fill={color} fillOpacity="0.08" />
            {/* Thin colored edge */}
            <polygon points="45,4 78,22 78,68 45,86 12,68 12,22" fill="none" stroke={color} strokeWidth="1.2" strokeOpacity="0.55" />
        </svg>
        {/* Icon centered over the polygon */}
        <div className="gem-tile-icon">
            {children}
        </div>
    </div>
);

const techIconsList = [
    { name: "HTML5",      color: "#E34F26", component: <HtmlIcon /> },
    { name: "CSS3",       color: "#1572B6", component: <CssIcon /> },
    { name: "JavaScript", color: "#F7DF1E", component: <JsIcon /> },
    { name: "TypeScript", color: "#3178C6", component: <TsIcon /> },
    { name: "ReactJS",    color: "#61DAFB", component: <ReactIcon /> },
    { name: "Redux",      color: "#764ABC", component: <ReduxIcon /> },
    { name: "Tailwind",   color: "#06B6D4", component: <TailwindIcon /> },
    { name: "Git",        color: "#F05032", component: <GitIcon /> }
];

const SkillGroup = ({ group, index }) => {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: false, amount: 0.3 });

    return (
        <motion.div
            ref={itemRef}
            className="skills__group"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1.0]
            }}
        >
            <h3 className="skills__group-title">{group.title}</h3>
            <p className="skills__group-value">{group.items}</p>
        </motion.div>
    );
};

const Skills = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

    // Tech badges for floating right-side illustration
    const illustrationBadges = [
        { label: "HTML", color: "#f06529", x: 60, y: 110 },
        { label: "TS", color: "#3178c6", x: 120, y: 35 },
        { label: "JS", color: "#22c55e", x: 370, y: 55 },
        { label: "React", color: "#00e5ff", x: 410, y: 170 },
        { label: "Git", color: "#ff1744", x: 50, y: 260 },
        { label: "Redux", color: "#8e24aa", x: 90, y: 345 }
    ];

    return (
        <section className="skills" id="technologies" ref={sectionRef}>
            <div className="skills__ambient-blur" />

            <div className="skills__container">
                {/* Header */}
                <motion.div
                    className="skills__header"
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <p className="section-overline">CREATIVELY SOLVE, INNOVATE, DESIGN.</p>
                    <h2 className="section-title">My Skills</h2>
                </motion.div>

                {/* Main Body */}
                <div className="skills__body">
                    {/* Left: Skill Groups appearing one by one */}
                    <div className="skills__list">
                        {skillsData.map((group, i) => (
                            <SkillGroup key={i} group={group} index={i} />
                        ))}
                    </div>

                    {/* Right: Larger Developer Vector Artwork matching Screenshot 1 */}
                    <motion.div
                        className="skills__illustration-wrap"
                        initial={{ opacity: 0, x: 60, scale: 0.92 }}
                        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60, scale: 0.92 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
                    >
                        <div className="skills__illustration-card">
                            <svg viewBox="0 0 520 460" xmlns="http://www.w3.org/2000/svg" className="skills__svg">
                                <defs>
                                    <radialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#25164d" opacity="0.9" />
                                        <stop offset="100%" stopColor="#0d0a21" opacity="0" />
                                    </radialGradient>
                                </defs>

                                {/* Background Purple Aura Circle matching Screenshot 1 */}
                                <circle cx="260" cy="230" r="180" fill="url(#auraGlow)" />

                                {/* Desk Base */}
                                <rect x="90" y="365" width="340" height="12" rx="4" fill="#1a1c36" />
                                <rect x="130" y="377" width="16" height="60" fill="#121324" />
                                <rect x="370" y="377" width="16" height="60" fill="#121324" />

                                {/* Monitor */}
                                <rect x="150" y="210" width="220" height="140" rx="12" fill="#15172b" stroke="#2a2d4f" strokeWidth="3" />
                                <rect x="160" y="220" width="200" height="120" rx="8" fill="#0d0e1c" />

                                {/* Monitor Code Lines */}
                                <circle cx="175" cy="235" r="4" fill="#ff4b4b" />
                                <circle cx="187" cy="235" r="4" fill="#ffb830" />
                                <circle cx="199" cy="235" r="4" fill="#00e676" />

                                <rect x="175" y="252" width="70" height="7" rx="3.5" fill="#ff5722" />
                                <rect x="252" y="252" width="55" height="7" rx="3.5" fill="#29b6f6" />
                                <rect x="185" y="267" width="110" height="6" rx="3" fill="#b388ff" />
                                <rect x="185" y="280" width="80" height="6" rx="3" fill="#00e5ff" />
                                <rect x="200" y="293" width="95" height="6" rx="3" fill="#ff4081" />
                                <rect x="200" y="306" width="65" height="6" rx="3" fill="#00e676" />
                                <rect x="175" y="319" width="120" height="6" rx="3" fill="#ffb74d" />

                                {/* Stand */}
                                <rect x="248" y="350" width="24" height="15" fill="#121324" />

                                {/* Standing Developer Figure matching Screenshot 1 */}
                                <g transform="translate(325, 230)">
                                    <rect x="20" y="30" width="40" height="55" rx="10" fill="#3b82f6" />
                                    <rect x="20" y="85" width="40" height="50" rx="6" fill="#1e1b4b" />
                                    <circle cx="40" cy="12" r="18" fill="#fdba74" />
                                    <path d="M 22 10 C 22 -4, 58 -4, 58 10 Z" fill="#1e1b4b" />
                                    <rect x="0" y="48" width="28" height="12" rx="6" fill="#fdba74" />
                                </g>

                                {/* Floating Tech Badges */}
                                {illustrationBadges.map((badge, bIdx) => (
                                    <g key={bIdx} className={`skills__floating-badge b${bIdx + 1}`}>
                                        <rect x={badge.x} y={badge.y} width="60" height="60" rx="18" fill={badge.color} />
                                        <text x={badge.x + 30} y={badge.y + 36} textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
                                            {badge.label}
                                        </text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Row: Gem-tile marquee */}
                <motion.div
                    className="skills__marquee-section"
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
                >
                    <div className="skills__marquee-track">
                        {[0, 1].map((copyIdx) => (
                            <div key={copyIdx} className="skills__marquee-set" aria-hidden={copyIdx === 1}>
                                {techIconsList.map((tech, idx) => (
                                    <div key={idx} className="skills__tech-card">
                                        <GemTile color={tech.color}>
                                            {tech.component}
                                        </GemTile>
                                        <span className="skills__tech-card-name">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
