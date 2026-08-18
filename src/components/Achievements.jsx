import React from 'react';
import { motion } from 'framer-motion';
import { achievementsData } from '../data/portfolioData';
import { Quote } from 'lucide-react';
import './Achievements.css';

// Container stagger controls
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.35, // Deliberate, smooth 350ms gap between card 1 -> 2 -> 3 -> 4 -> 5
      delayChildren: 0.15,
    },
  },
};

// Smooth sequential card entrance variant
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.25, 0.1, 0.25, 1.0], // Smooth cubic bezier curve
    },
  },
};

const Achievements = () => {
  return (
    <section className="achievements" id="achievements">
      <div className="achievements__container">
        {/* Section Header */}
        <motion.div
          className="achievements__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-overline">{achievementsData.overline}</p>
          <h2 className="section-title achievements__title">{achievementsData.title}</h2>
        </motion.div>

        {/* 3-Grid Cards Container with Sequential Staggered Scroll Animation */}
        <motion.div
          className="achievements__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {achievementsData.items.map((item) => (
            <motion.div
              key={item.id}
              className="achievement-card"
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Top Quote Icon */}
              <div className="achievement-card__quote">
                <Quote size={24} />
              </div>

              {/* Achievement Title */}
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
