import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { contactData } from '../data/portfolioData';
import './Contact.css';

// Starfield canvas background
const StarfieldCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animFrame;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();

        const stars = Array.from({ length: 120 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.3,
            alpha: Math.random(),
            speed: Math.random() * 0.008 + 0.003,
            phase: Math.random() * Math.PI * 2,
        }));

        const draw = (t) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((star) => {
                const alpha = 0.3 + 0.5 * Math.sin(t * star.speed * 60 + star.phase);
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${alpha})`;
                ctx.fill();
            });
            animFrame = requestAnimationFrame(draw);
        };
        animFrame = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animFrame);
    }, []);

    return <canvas ref={canvasRef} className="contact__canvas" />;
};

// Animated 3D-looking globe SVG
const GlobeSVG = () => {
    return (
        <div className="globe-wrap">
            <div className="globe-scene">
                <div className="globe-sphere">
                    {/* Animated rings */}
                    <div className="globe-ring globe-ring--1" />
                    <div className="globe-ring globe-ring--2" />
                    <div className="globe-ring globe-ring--3" />
                    <div className="globe-core" />
                </div>
            </div>
            <p className="globe-label">Based anywhere in the world</p>
        </div>
    );
};

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        // Simulate send (integrate EmailJS here)
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => setSent(false), 4000);
        }, 1500);
    };

    return (
        <section className="contact" id="contact">
            <StarfieldCanvas />
            <div className="contact__container" ref={ref}>
                {/* Globe */}
                <motion.div
                    className="contact__globe"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                >
                    <GlobeSVG />
                </motion.div>

                {/* Form */}
                <motion.div
                    className="contact__form-wrap"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <p className="section-overline">{contactData.overline}</p>
                    <h2 className="section-title contact__title">{contactData.title}</h2>
                    <p className="contact__subtitle">{contactData.subtitle}</p>

                    <form className="contact__form" onSubmit={handleSubmit}>
                        <div className="contact__field">
                            <label className="contact__label">Your Name</label>
                            <input
                                className="contact__input"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="What's your good name?"
                                required
                            />
                        </div>
                        <div className="contact__field">
                            <label className="contact__label">Your email</label>
                            <input
                                className="contact__input"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="What's your web address?"
                                required
                            />
                        </div>
                        <div className="contact__field">
                            <label className="contact__label">Your Message</label>
                            <textarea
                                className="contact__input contact__textarea"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="What you want to say?"
                                rows={6}
                                required
                            />
                        </div>
                        <button type="submit" className="contact__submit" disabled={sending}>
                            {sending ? 'Sending...' : sent ? '✓ Sent!' : 'Send'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
