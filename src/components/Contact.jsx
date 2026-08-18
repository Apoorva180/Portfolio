import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { contactData } from '../data/portfolioData';
import { Send, CheckCircle2, Copy, Mail, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';
import './Contact.css';

// Canvas 2D Animated Vibrant Neon Planet matching Portfolio theme (#f11946 / #ff5e3a / #8b5cf6)
const CosmicPlanetCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animFrame;

        const resize = () => {
            const size = Math.min(canvas.offsetWidth, 480);
            canvas.width = size * 2;
            canvas.height = size * 2;
        };
        resize();
        window.addEventListener('resize', resize);

        let rot = 0;

        // Pre-generate colorful landmasses/magma terrain
        const terrain = Array.from({ length: 22 }, () => ({
            lat: (Math.random() - 0.5) * Math.PI * 0.85,
            lon: Math.random() * Math.PI * 2,
            rad: Math.random() * 0.38 + 0.18,
            color: Math.random() > 0.5 ? '#ff5e3a' : Math.random() > 0.2 ? '#f11946' : '#8b5cf6'
        }));

        // Orbiting stardust particles around planet
        const dust = Array.from({ length: 35 }, () => ({
            angle: Math.random() * Math.PI * 2,
            dist: Math.random() * 0.7 + 1.1,
            speed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
            size: Math.random() * 2.5 + 0.8,
            color: Math.random() > 0.5 ? '#ff5e3a' : '#8b5cf6'
        }));

        const draw = () => {
            rot += 0.007;
            const w = canvas.width;
            const h = canvas.height;
            const cx = w / 2;
            const cy = h / 2;
            const R = w * 0.28;

            ctx.clearRect(0, 0, w, h);

            // 1. Multi-layered Glowing Atmosphere Aura
            const aura = ctx.createRadialGradient(cx, cy, R * 0.75, cx, cy, R * 1.6);
            aura.addColorStop(0, 'rgba(241, 25, 70, 0.45)');
            aura.addColorStop(0.45, 'rgba(139, 92, 246, 0.25)');
            aura.addColorStop(0.8, 'rgba(255, 94, 58, 0.1)');
            aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(cx, cy, R * 1.6, 0, Math.PI * 2);
            ctx.fill();

            // 2. Back Orbiting Rings & Dust (behind planet)
            drawOrbitalRings(ctx, cx, cy, R, rot, true);
            drawStardust(ctx, cx, cy, R, dust, rot, true);

            // 3. Planet Sphere Base
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.clip();

            // Vibrant Crimson & Magenta Base Sphere
            const sphereGrad = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.1, cx, cy, R);
            sphereGrad.addColorStop(0, '#ff7b54');
            sphereGrad.addColorStop(0.35, '#f11946');
            sphereGrad.addColorStop(0.7, '#6b1130');
            sphereGrad.addColorStop(1, '#1a0515');
            ctx.fillStyle = sphereGrad;
            ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

            // Glowing Continents / Magma Textures
            terrain.forEach(c => {
                const currLon = c.lon + rot;
                const vis = Math.cos(currLon);
                if (vis > -0.25) {
                    const px = cx + Math.sin(currLon) * Math.cos(c.lat) * R;
                    const py = cy + Math.sin(c.lat) * R;
                    const pr = c.rad * R * Math.max(0, vis);

                    const landGrad = ctx.createRadialGradient(px, py, 0, px, py, pr);
                    landGrad.addColorStop(0, c.color);
                    landGrad.addColorStop(0.7, 'rgba(139, 92, 246, 0.6)');
                    landGrad.addColorStop(1, 'rgba(0,0,0,0)');

                    ctx.fillStyle = landGrad;
                    ctx.beginPath();
                    ctx.arc(px, py, pr, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // 3D Sphere Shading Shadow Overlay
            const shadow = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.4, R * 0.25, cx + R * 0.25, cy + R * 0.25, R * 1.08);
            shadow.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
            shadow.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
            shadow.addColorStop(0.85, 'rgba(15, 2, 10, 0.75)');
            shadow.addColorStop(1, 'rgba(5, 0, 8, 0.96)');
            ctx.fillStyle = shadow;
            ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

            ctx.restore();

            // 4. Front Orbiting Rings & Dust (swirling in front)
            drawOrbitalRings(ctx, cx, cy, R, rot, false);
            drawStardust(ctx, cx, cy, R, dust, rot, false);

            animFrame = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animFrame);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="cosmic-planet-wrapper">
            <canvas ref={canvasRef} className="cosmic-planet-canvas" />
        </div>
    );
};

// Helper: 3D Orbiting Glowing Neon Rings
function drawOrbitalRings(ctx, cx, cy, R, rot, isBack) {
    const rings = [
        { tilt: -0.4, speed: 0.9, scaleX: 1.55, scaleY: 0.45, color: '#f11946', width: 4 },
        { tilt: 0.35, speed: -0.7, scaleX: 1.65, scaleY: 0.5, color: '#ff5e3a', width: 3 },
        { tilt: -0.15, speed: 1.2, scaleX: 1.45, scaleY: 0.38, color: '#8b5cf6', width: 3.5 }
    ];

    rings.forEach((ring) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ring.tilt);

        const phase = rot * ring.speed;
        const startAngle = isBack ? Math.PI : 0;
        const endAngle = isBack ? Math.PI * 2 : Math.PI;

        ctx.beginPath();
        ctx.ellipse(0, 0, R * ring.scaleX, R * ring.scaleY, phase, startAngle, endAngle);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = ring.width;
        ctx.shadowColor = ring.color;
        ctx.shadowBlur = 18;
        ctx.stroke();

        ctx.restore();
    });
}

// Helper: Orbiting Stardust Particles
function drawStardust(ctx, cx, cy, R, dust, rot, isBack) {
    dust.forEach(p => {
        p.angle += p.speed;
        const z = Math.cos(p.angle);
        const inBack = z < 0;

        if (inBack === isBack) {
            const x = cx + Math.sin(p.angle) * R * p.dist;
            const y = cy + Math.sin(p.angle * 0.5) * (R * 0.4);
            const alpha = 0.4 + 0.6 * Math.abs(z);

            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.restore();
        }
    });
}

// Background Starfield with Twinkling & Shooting Stars
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
        window.addEventListener('resize', resize);

        const stars = Array.from({ length: 140 }, () => ({
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

        return () => {
            cancelAnimationFrame(animFrame);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="contact__canvas" />;
};

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('aapoorva481@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        try {
            // Send email directly via Web3Forms API to aapoorva481@gmail.com
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: 'e0df8502-3c22-44df-9cf8-b3287dbec02b', // Free Web3Forms public API key
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    subject: `Portfolio Contact from ${form.name}`,
                    to_email: 'aapoorva481@gmail.com'
                })
            });

            if (res.ok) {
                setSent(true);
                setForm({ name: '', email: '', message: '' });
            } else {
                throw new Error('Web submit error');
            }
        } catch {
            // Fallback: Open mailto client to aapoorva481@gmail.com
            const mailtoUrl = `mailto:aapoorva481@gmail.com?subject=${encodeURIComponent(
                `Portfolio Contact from ${form.name}`
            )}&body=${encodeURIComponent(
                `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
            )}`;
            window.location.href = mailtoUrl;
            setSent(true);
            setForm({ name: '', email: '', message: '' });
        } finally {
            setSending(false);
            setTimeout(() => setSent(false), 6000);
        }
    };

    return (
        <section className="contact" id="contact">
            <StarfieldCanvas />
            <div className="contact__container" ref={ref}>
                
                {/* Vibrant 3D Neon Cosmic Planet */}
                <motion.div
                    className="contact__globe"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    whileHover={{ scale: 1.04 }}
                >
                    <CosmicPlanetCanvas />
                </motion.div>

                {/* Form Card */}
                <motion.div
                    className="contact__form-wrap"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    <p className="section-overline">{contactData.overline}</p>
                    <h2 className="section-title contact__title">{contactData.title}</h2>
                    <p className="contact__subtitle">{contactData.subtitle}</p>

                    {/* Direct Email Card with One-Click Copy */}
                    <div className="contact__direct-email-card">
                        <div className="contact__email-info">
                            <Mail className="contact__email-icon" size={18} />
                            <div>
                                <span className="contact__email-label">Direct Email</span>
                                <span className="contact__email-val">aapoorva481@gmail.com</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleCopyEmail}
                            className="contact__copy-btn"
                        >
                            {copied ? (
                                <span className="text-[#22c55e] flex items-center gap-1 font-bold">
                                    <CheckCircle2 size={14} /> Copied!
                                </span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    <Copy size={14} /> Copy
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Sent Confirmation Toast */}
                    {sent && (
                        <motion.div 
                            className="contact__success-banner"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <CheckCircle2 size={20} className="text-[#22c55e] flex-shrink-0" />
                            <div>
                                <strong>Message Sent Successfully!</strong>
                                <p className="text-xs opacity-90">Apoorva will receive your message at aapoorva481@gmail.com and reply shortly.</p>
                            </div>
                        </motion.div>
                    )}

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
                            <label className="contact__label">Your Email</label>
                            <input
                                className="contact__input"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="What's your email address?"
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
                                placeholder="What would you like to discuss?"
                                rows={5}
                                required
                            />
                        </div>

                        <button type="submit" className="contact__submit" disabled={sending}>
                            {sending ? (
                                <span className="flex items-center gap-2">
                                    <Sparkles size={16} className="animate-spin" /> Sending to Apoorva...
                                </span>
                            ) : sent ? (
                                <span className="flex items-center gap-2 text-[#22c55e]">
                                    <CheckCircle2 size={16} /> Message Sent!
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Send size={16} /> Send Message
                                </span>
                            )}
                        </button>
                    </form>

                </motion.div>

            </div>
        </section>
    );
};

export default Contact;
