import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { aboutData } from '../data/portfolioData';
import './About.css';

const About = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.25 });

    // Parallax effect for image while scrolling down
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });
    const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.18, delayChildren: 0.1 }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 35 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1.0] }
        },
    };

    return (
        <section className="about" id="about" ref={sectionRef}>
            <div className="about__ambient-blur" />
            <div className="about__container">
                <motion.div
                    className="about__left"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <motion.p className="section-overline" variants={itemVariants}>
                        {aboutData.overline}
                    </motion.p>
                    <motion.h2 className="section-title about__title" variants={itemVariants}>
                        {aboutData.title}
                    </motion.h2>

                    <div className="about__text-list">
                        {aboutData.paragraphs.map((para, i) => (
                            <motion.p key={i} className="about__desc" variants={itemVariants}>
                                {para}
                            </motion.p>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="about__right"
                    style={{ y: imageY }}
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 40 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                >
                    <motion.div
                        className="about__photo-wrap"
                        whileHover={{ y: -8, scale: 1.015 }}
                        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                    >
                        <img src={aboutData.photo} alt="Apoorva" className="about__photo" />
                        <div className="about__photo-overlay" />
                        <div className="about__photo-glow" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
