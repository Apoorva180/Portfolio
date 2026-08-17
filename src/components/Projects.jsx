import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/portfolioData';
import './Projects.css';

const ProjectCard = ({ project, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const card = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - card.left) / card.width - 0.5) * 14;
        const y = ((e.clientY - card.top) / card.height - 0.5) * -14;
        setTilt({ x, y });
    };
    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    const tagColors = ['#00bcd4', '#4caf50', '#f11946', '#ff9800', '#9c27b0', '#2196f3'];

    return (
        <motion.div
            ref={ref}
            className="project-card"
            style={{ transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Image area */}
            <div className="project-card__image-wrap">
                {project.image ? (
                    <img src={project.image} alt={project.name} className="project-card__image" />
                ) : (
                    <div className="project-card__image-placeholder" style={{ background: project.gradient }}>
                        <div className="project-card__placeholder-inner">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                <line x1="8" y1="21" x2="16" y2="21" />
                                <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                            <p>Add project screenshot</p>
                        </div>
                    </div>
                )}
                {/* GitHub link badge */}
                <a href={project.github} target="_blank" rel="noreferrer" className="project-card__github">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                </a>
            </div>

            {/* Content */}
            <div className="project-card__body">
                <h3 className="project-card__name">{project.name}</h3>
                <p className="project-card__desc">{project.description}</p>
                <div className="project-card__tags">
                    {project.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="project-card__tag"
                            style={{ color: tagColors[i % tagColors.length] }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="projects" id="projects">
            <div className="projects__container">
                <motion.div
                    ref={ref}
                    className="projects__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-overline">MY WORK</p>
                    <h2 className="section-title">
                        Projects<span className="dot">.</span>
                    </h2>
                    <p className="projects__subtitle">
                        The following projects showcase my skills through real-world examples.
                        Each project reflects my ability to build end-to-end solutions.
                    </p>
                </motion.div>

                <div className="projects__grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
