import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { contactData } from '../data/portfolioData';
import { Send, CheckCircle2 } from 'lucide-react';
import './Contact.css';

// Canvas 2D Animated 3D Cosmic Planet with Swirling Cloud Ribbons
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

        // Pre-generate continent noise points
        const continents = Array.from({ length: 18 }, () => ({
            lat: (Math.random() - 0.5) * Math.PI * 0.8,
            lon: Math.random() * Math.PI * 2,
            rad: Math.random() * 0.35 + 0.2,
            color: Math.random() > 0.4 ? '#1b4332' : '#2d6a4f'
        }));

        const draw = () => {
            rot += 0.006;
            const w = canvas.width;
            const h = canvas.height;
            const cx = w / 2;
            const cy = h / 2;
            const R = w * 0.28;

            ctx.clearRect(0, 0, w, h);

            // 1. Ambient Outer Atmosphere Glow
            const aura = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 1.55);
            aura.addColorStop(0, 'rgba(59, 130, 246, 0.35)');
            aura.addColorStop(0.5, 'rgba(139, 92, 246, 0.15)');
            aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(cx, cy, R * 1.55, 0, Math.PI * 2);
            ctx.fill();

            // 2. Back Cloud Ribbons (orbiting behind planet)
            drawCloudRibbons(ctx, cx, cy, R, rot, true);

            // 3. Planet Base Sphere (Ocean)
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.clip();

            // Base Ocean Gradient
            const oceanGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
            oceanGrad.addColorStop(0, '#3a86ff');
            oceanGrad.addColorStop(0.4, '#004e92');
            oceanGrad.addColorStop(0.85, '#000428');
            oceanGrad.addColorStop(1, '#00010d');
            ctx.fillStyle = oceanGrad;
            ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

            // Continents Terrain
            continents.forEach(c => {
                const currLon = c.lon + rot;
                const vis = Math.cos(currLon);
                if (vis > -0.2) {
                    const px = cx + Math.sin(currLon) * Math.cos(c.lat) * R;
                    const py = cy + Math.sin(c.lat) * R;
                    const pr = c.rad * R * Math.max(0, vis);

                    const contGrad = ctx.createRadialGradient(px, py, 0, px, py, pr);
                    contGrad.addColorStop(0, '#52b788');
                    contGrad.addColorStop(0.6, '#2d6a4f');
                    contGrad.addColorStop(0.9, '#1b4332');
                    contGrad.addColorStop(1, 'rgba(27,67,50,0)');

                    ctx.fillStyle = contGrad;
                    ctx.beginPath();
                    ctx.arc(px, py, pr, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // 3D Sphere Shading / Night Shadow overlay
            const shadow = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.2, cx + R * 0.2, cy + R * 0.2, R * 1.05);
            shadow.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
            shadow.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
            shadow.addColorStop(0.85, 'rgba(0, 5, 20, 0.7)');
            shadow.addColorStop(1, 'rgba(0, 2, 10, 0.95)');
            ctx.fillStyle = shadow;
            ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

            ctx.restore();

            // 4. Front Cloud Ribbons (swirling in front of planet)
            drawCloudRibbons(ctx, cx, cy, R, rot, false);

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

// Helper to draw 3D orbital cloud ribbons wrapping around planet
function drawCloudRibbons(ctx, cx, cy, R, rot, isBack) {
    const ribbons = [
        { tilt: -0.35, speed: 0.8, scaleX: 1.4, scaleY: 0.45, color: 'rgba(243, 229, 245, 0.85)', width: 14 },
        { tilt: 0.25, speed: -0.6, scaleX: 1.5, scaleY: 0.5, color: 'rgba(224, 242, 254, 0.75)', width: 10 },
        { tilt: -0.1, speed: 1.1, scaleX: 1.35, scaleY: 0.4, color: 'rgba(255, 240, 245, 0.9)', width: 12 }
    ];

    ribbons.forEach((rib, i) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rib.tilt);

        const phase = rot * rib.speed;
        const startAngle = isBack ? Math.PI : 0;
        const endAngle = isBack ? Math.PI * 2 : Math.PI;

        ctx.beginPath();
        ctx.ellipse(0, 0, R * rib.scaleX, R * rib.scaleY, phase, startAngle, endAngle);
        ctx.strokeStyle = rib.color;
        ctx.lineWidth = rib.width;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        ctx.shadowBlur = 12;
        ctx.stroke();

        ctx.restore();
    });
}

// Background Starfield
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

        const mailtoUrl = `mailto:${contactData.email}?subject=${encodeURIComponent(
            `Portfolio Message from ${form.name}`
        )}&body=${encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
        )}`;

        setTimeout(() => {
            window.location.href = mailtoUrl;
            setSending(false);
            setSent(true);
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => setSent(false), 5000);
        }, 500);
    };

    return (
        <section className="contact" id="contact">
            <StarfieldCanvas />
            <div className="contact__container" ref={ref}>
                
                {/* 3D Spinning Cosmic Planet Visual */}
                <motion.div
                    className="contact__globe"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                >
                    <CosmicPlanetCanvas />
                </motion.div>

                {/* Form */}
                <motion.div
                    className="contact__form-wrap"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    <p className="section-overline">{contactData.overline}</p>
                    <h2 className="section-title contact__title">{contactData.title}</h2>
                    <p className="contact__subtitle">{contactData.subtitle}</p>

                    {sent && (
                        <div className="contact__success-banner">
                            <CheckCircle2 size={18} />
                            <span>Opening email client... Message ready to send!</span>
                        </div>
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
                                rows={5}
                                required
                            />
                        </div>
                        <button type="submit" className="contact__submit" disabled={sending}>
                            {sending ? (
                                <span>Preparing...</span>
                            ) : sent ? (
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 size={16} /> Sent!
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Send size={16} /> Send
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
