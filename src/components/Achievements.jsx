import React from 'react';
import { motion } from 'framer-motion';
import { achievementsData } from '../data/portfolioData';
import { Quote } from 'lucide-react';
import './Achievements.css';

const Achievements = () => {
  return (
    <section className="achievements" id="achievements">
      <div className="achievements__container">
        {/* Section Header */}
        <motion.div
          className="achievements__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-overline">{achievementsData.overline}</p>
          <h2 className="section-title achievements__title">{achievementsData.title}</h2>
        </motion.div>

        {/* 3-Grid Cards Container */}
        <div className="achievements__grid">
          {achievementsData.items.map((item, index) => (
            <motion.div
              key={item.id}
              className="achievement-card"
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.75,
                delay: index * 0.25, // Clear 250ms gap between each sequential card appearance: Card 1 -> Card 2 -> Card 3 -> Card 4 -> Card 5
                ease: [0.25, 0.1, 0.25, 1.0], // Smooth cubic bezier
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
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
        </div>
      </div>
    </section>
  );
};

export default Achievements;
