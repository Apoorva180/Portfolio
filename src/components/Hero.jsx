import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { heroData } from '../data/portfolioData';
import './Hero.css';

const Hero = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animFrame;
        let time = 0;
        let mouseX = 0;
        let mouseY = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            targetMouseX = (e.clientX - rect.left) / canvas.width - 0.5;
            targetMouseY = (e.clientY - rect.top) / canvas.height - 0.5;
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        // Pre-generate particle seeds along curves
        const particles = Array.from({ length: 40 }, () => ({
            lineIndex: Math.floor(Math.random() * 32),
            progress: Math.random(),
            speed: 0.0005 + Math.random() * 0.001,
            size: 1.5 + Math.random() * 2,
            alpha: 0.3 + Math.random() * 0.6
        }));

        const draw = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            ctx.clearRect(0, 0, width, height);

            // Smooth mouse interpolation
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            const linesCount = 36;
            const baseFreq = 0.0035;

            // Draw multi-layered organic wave lines
            for (let i = 0; i < linesCount; i++) {
                const normalizedI = i / linesCount;
                ctx.beginPath();

                // Dynamic gradient stroke per line (purple -> pink/magenta -> cyan glow)
                const alpha = Math.sin(normalizedI * Math.PI) * 0.28 + 0.04;
                const r = Math.floor(130 + Math.sin(time * 0.5 + i * 0.1) * 80);
                const g = Math.floor(40 + Math.cos(time * 0.3 + i * 0.15) * 30);
                const b = Math.floor(220 + Math.sin(time * 0.4 + i * 0.05) * 35);

                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.lineWidth = 1 + Math.sin(normalizedI * Math.PI) * 1.2;

                const yCenter = height * 0.48 + (i - linesCount / 2) * (height * 0.022);

                for (let x = 0; x <= width; x += 4) {
                    // Complex multi-frequency wave equations for organic look
                    const wave1 = Math.sin(x * baseFreq + time + i * 0.18 + mouseX * 2) * 65;
                    const wave2 = Math.cos(x * baseFreq * 0.6 + time * 0.7 - i * 0.12) * 40;
                    const wave3 = Math.sin(x * baseFreq * 1.4 - time * 0.5 + mouseY * 3) * 20;

                    // Envelope function (stronger on right side, smooth falloff on left)
                    const envelope = Math.pow(x / width, 1.2);
                    const y = yCenter + (wave1 + wave2 + wave3) * envelope;

                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            // Draw floating energy particles along lines
            particles.forEach((p) => {
                p.progress += p.speed;
                if (p.progress > 1) p.progress = 0;

                const x = p.progress * width;
                const i = p.lineIndex;
                const yCenter = height * 0.48 + (i - linesCount / 2) * (height * 0.022);

                const wave1 = Math.sin(x * baseFreq + time + i * 0.18 + mouseX * 2) * 65;
                const wave2 = Math.cos(x * baseFreq * 0.6 + time * 0.7 - i * 0.12) * 40;
                const envelope = Math.pow(x / width, 1.2);
                const y = yCenter + (wave1 + wave2) * envelope;

                ctx.beginPath();
                ctx.arc(x, y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(241, 25, 70, ${p.alpha * envelope})`;
                ctx.shadowColor = '#f11946';
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            time += 0.014;
            animFrame = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animFrame);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section className="hero" id="hero">
            <canvas ref={canvasRef} className="hero__canvas" />

            {/* Ambient Lighting & Mesh Overlays */}
            <div className="hero__glow-sphere" />
            <div className="hero__overlay-left" />
            <div className="hero__overlay-bottom" />

            <div className="hero__content">
                <div className="hero__text-block">
                    <div className="hero__bar-layout">
                        {/* Red Accent Bar with Glowing Top Dot matching screenshot 1 */}
                        <div className="hero__bar-wrap">
                            <span className="hero__bar-dot" />
                            <span className="hero__bar-line" />
                        </div>

                        <div className="hero__headings-group">
                            <motion.h1
                                className="hero__heading"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                            >
                                {heroData.greeting}{' '}
                                <span className="hero__name">{heroData.name}</span>
                            </motion.h1>

                            <motion.div
                                className="hero__typewriter-row"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.15 }}
                            >
                                <TypeAnimation
                                    sequence={heroData.typewriterPhrases.flatMap((phrase) => [phrase, 2200])}
                                    wrapper="h2"
                                    speed={50}
                                    deletionSpeed={60}
                                    repeat={Infinity}
                                    className="hero__typewriter-heading"
                                />
                            </motion.div>

                            <motion.p
                                className="hero__description"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                            >
                                {heroData.description}
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Scroll Down mouse indicator */}
            <div className="hero__scroll-indicator">
                <div className="hero__scroll-mouse">
                    <span className="hero__scroll-wheel" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
