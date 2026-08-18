import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievementsData } from '../data/portfolioData';
import { Quote } from 'lucide-react';
import './Achievements.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
};

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="achievements" id="achievements">
      <div className="achievements__container" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="achievements__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-overline">{achievementsData.overline}</p>
          <h2 className="section-title achievements__title">{achievementsData.title}</h2>
        </motion.div>

        {/* 3-Grid Cards Container with Staggered Scroll Animation */}
        <motion.div
          className="achievements__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {achievementsData.items.map((item) => (
            <motion.div
              key={item.id}
              className="achievement-card"
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              {/* Top Quote Icon */}
              <div className="achievement-card__quote">
                <Quote size={28} />
              </div>

              {/* Achievement Content */}
              <p className="achievement-card__title">{item.title}</p>

              {/* Card Footer: Year & Institution & Badge */}
              <div className="achievement-card__footer">
                <div className="achievement-card__meta">
                  <span className="achievement-card__year">@ {item.year}</span>
                  <span className="achievement-card__inst">{item.institution}</span>
                </div>
                <div 
                  className="achievement-card__badge"
                  style={{ background: item.badgeColor }}
                >
                  <span>{item.badgeText}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
