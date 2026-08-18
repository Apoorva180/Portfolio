import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { contactData } from '../data/portfolioData';
import { Send, CheckCircle2, Code2, Sparkles, Mail, MapPin, Briefcase } from 'lucide-react';
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

// Attractive Large Developer Showcase Card replacing the old sphere
const DeveloperShowcaseCard = () => {
    return (
        <div className="dev-card">
            {/* Terminal Window Header */}
            <div className="dev-card__header">
                <div className="dev-card__dots">
                    <span className="dev-card__dot dev-card__dot--red" />
                    <span className="dev-card__dot dev-card__dot--yellow" />
                    <span className="dev-card__dot dev-card__dot--green" />
                </div>
                <div className="dev-card__title">
                    <Code2 className="dev-card__icon" size={14} />
                    <span>apoorva.developer.config.json</span>
                </div>
            </div>

            {/* Code Body */}
            <div className="dev-card__body">
                <pre className="dev-card__code">
<code>
<span className="code-keyword">const</span> <span className="code-var">engineer</span> = &#123;{'\n'}
{'  '}<span className="code-key">name</span>: <span className="code-str">"Apoorva"</span>,{'\n'}
{'  '}<span className="code-key">role</span>: <span className="code-str">"ReactJS & Software Engineer"</span>,{'\n'}
{'  '}<span className="code-key">experience</span>: <span className="code-str">"2.5+ Years"</span>,{'\n'}
{'  '}<span className="code-key">techStack</span>: [<span className="code-str">"React"</span>, <span className="code-str">"TypeScript"</span>, <span className="code-str">"Redux"</span>, <span className="code-str">"Tailwind"</span>],{'\n'}
{'  '}<span className="code-key">status</span>: <span className="code-str">"Available for Full-time Roles"</span>{'\n'}
&#125;;
</code>
                </pre>

                {/* Status Badges */}
                <div className="dev-card__badges">
                    <div className="dev-badge dev-badge--active">
                        <span className="dev-badge__ping" />
                        <span>Open for Work</span>
                    </div>
                    <div className="dev-badge">
                        <Briefcase size={13} />
                        <span>Frontend Specialist</span>
                    </div>
                </div>

                {/* Contact Email Quick Access */}
                <a href={`mailto:${contactData.email}`} className="dev-card__email-btn">
                    <Mail size={16} />
                    <span>apoorva@codewave.com</span>
                </a>
            </div>
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

        // Build mailto URL and trigger default mail client
        const mailtoUrl = `mailto:${contactData.email}?subject=${encodeURIComponent(
            `Portfolio Contact from ${form.name}`
        )}&body=${encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
        )}`;

        setTimeout(() => {
            window.location.href = mailtoUrl;
            setSending(false);
            setSent(true);
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => setSent(false), 5000);
        }, 600);
    };

    return (
        <section className="contact" id="contact">
            <StarfieldCanvas />
            <div className="contact__container" ref={ref}>
                
                {/* Large Developer Showcase Card */}
                <motion.div
                    className="contact__showcase"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <DeveloperShowcaseCard />
                </motion.div>

                {/* Form */}
                <motion.div
                    className="contact__form-wrap"
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    <p className="section-overline">{contactData.overline}</p>
                    <h2 className="section-title contact__title">{contactData.title}</h2>
                    <p className="contact__subtitle">{contactData.subtitle}</p>

                    {sent && (
                        <div className="contact__success-banner">
                            <CheckCircle2 size={18} />
                            <span>Opening your mail client... Message prepared!</span>
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
                                <span>Preparing Mail...</span>
                            ) : sent ? (
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 size={16} /> Sent!
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
