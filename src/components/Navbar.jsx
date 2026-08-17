import React, { useState, useEffect } from 'react';
import { navLinks } from '../data/portfolioData';
import apoorvaImg from '../assets/apoorva.jpg';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (id) => {
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner">
                {/* Logo / Avatar */}
                <button className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="navbar__avatar">
                        <img src={apoorvaImg} alt="Apoorva" className="navbar__avatar-img" />
                    </div>
                </button>

                {/* Desktop Navigation */}
                <ul className="navbar__links">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <button className="navbar__link" onClick={() => handleNavClick(link.id)}>
                                {link.title}
                            </button>
                        </li>
                    ))}
                    <li>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="navbar__resume-btn"
                        >
                            Resume
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </a>
                    </li>
                </ul>

                {/* Mobile Hamburger */}
                <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <span className={menuOpen ? 'open' : ''}></span>
                    <span className={menuOpen ? 'open' : ''}></span>
                    <span className={menuOpen ? 'open' : ''}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="navbar__mobile-menu">
                    {navLinks.map((link) => (
                        <button key={link.id} className="navbar__mobile-link" onClick={() => handleNavClick(link.id)}>
                            {link.title}
                        </button>
                    ))}
                    <a href="/resume.pdf" target="_blank" rel="noreferrer" className="navbar__resume-btn mobile">
                        Resume
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
