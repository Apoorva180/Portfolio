import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { journeyData } from '../data/portfolioData';
import './Work.css';

const TimelineCard = ({ item, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, amount: 0.3 });
    const isLeft = index % 2 === 0;

    return (
        <div className={`timeline__item ${isLeft ? 'timeline__item--left' : 'timeline__item--right'}`} ref={cardRef}>
            {/* Main Content Card with Zoom & Scale animation */}
            <motion.div
                className="timeline__card"
                initial={{ opacity: 0, scale: 0.82, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.82, x: isLeft ? -50 : 50 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
                <div className={`timeline__arrow ${isLeft ? 'timeline__arrow--left' : 'timeline__arrow--right'}`} />
                <h3 className="timeline__role">{item.title}</h3>
                <p className="timeline__company">{item.subtitle}</p>

                {item.points && item.points.length > 0 && (
                    <ul className="timeline__points">
                        {item.points.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                )}
            </motion.div>

            {/* Glowing Center Node Icon */}
            <motion.div
                className="timeline__node"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
            >
                <div className="timeline__node-inner" style={{ background: item.iconBg }}>
                    <span className="timeline__node-icon">{item.iconInitial}</span>
                </div>
            </motion.div>

            {/* Date Display */}
            <motion.div
                className="timeline__date"
                initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 30 : -30 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {item.date}
            </motion.div>
        </div>
    );
};

const Work = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

    return (
        <section className="work" id="work" ref={sectionRef}>
            <div className="work__ambient-glow" />
            <div className="work__container">
                <motion.div
                    className="work__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="section-overline">MY JOURNEY SO FAR</p>
                    <h2 className="section-title">
                        Work Experience and Eduction<span className="dot">.</span>
                    </h2>
                </motion.div>

                <div className="timeline">
                    <div className="timeline__line" />
                    {journeyData.map((item, index) => (
                        <TimelineCard key={item.id || index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Work;
