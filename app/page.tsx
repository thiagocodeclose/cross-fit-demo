// @ts-nocheck
'use client';
import { useEffect, useState } from 'react';
import { siteData } from '@/lib/site-data';

const css = `
  :root {
    --cr-bg: #0A0A0A;
    --cr-surface: #141414;
    --cr-card: #1C1C1C;
    --cr-primary: #E8B100;
    --cr-primary-dark: #C49600;
    --cr-accent: #FFD740;
    --cr-text: #F5F5F0;
    --cr-muted: rgba(245,245,240,0.55);
    --cr-border: rgba(232,177,0,0.15);
    --font-display: var(--font-barlow-condensed), 'Barlow Condensed', sans-serif;
    --font-body: var(--font-barlow), 'Barlow', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--cr-bg); color: var(--cr-text); overflow-x: hidden; }

  /* NAV */
  .cr-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 66px;
    transition: background 0.3s, box-shadow 0.3s;
  }
  .cr-nav.scrolled {
    background: rgba(10,10,10,0.97);
    box-shadow: 0 1px 20px rgba(0,0,0,0.5);
    backdrop-filter: blur(12px);
  }
  .cr-nav-logo {
    font-family: var(--font-display);
    font-size: 1.5rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--cr-text); text-decoration: none;
  }
  .cr-nav-logo span { color: var(--cr-primary); }
  .cr-nav-links { display: flex; gap: 2rem; align-items: center; }
  .cr-nav-links a {
    font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--cr-muted); text-decoration: none; transition: color 0.2s;
  }
  .cr-nav-links a:hover { color: var(--cr-primary); }
  .cr-btn-nav {
    background: var(--cr-primary); color: var(--cr-bg);
    padding: 0.5rem 1.4rem;
    font-family: var(--font-display);
    font-size: 0.85rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; transition: background 0.2s;
  }
  .cr-btn-nav:hover { background: var(--cr-accent); }

  /* SPLIT HERO — left 55% video, right 45% copy */
  .cr-hero {
    display: grid;
    grid-template-columns: 55fr 45fr;
    min-height: 100vh;
  }
  .cr-hero-video {
    position: relative;
    overflow: hidden;
  }
  .cr-hero-video video {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; display: block;
  }
  .cr-hero-video-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(10,10,10,0) 70%, rgba(10,10,10,0.9) 100%),
                linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.1) 100%);
  }
  /* Yellow vertical stripe on the seam */
  .cr-hero-video::after {
    content: '';
    position: absolute; top: 0; right: 0; bottom: 0;
    width: 4px;
    background: var(--cr-primary);
  }
  .cr-hero-copy {
    background: var(--cr-bg);
    display: flex; flex-direction: column; justify-content: center;
    padding: 8rem 3.5rem 4rem 3rem;
  }
  .cr-hero-tag {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-family: var(--font-display);
    font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--cr-primary);
    margin-bottom: 1.5rem;
  }
  .cr-hero-tag::before { content: ''; display: inline-block; width: 20px; height: 2px; background: var(--cr-primary); }
  .cr-hero-title {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 5.5vw, 6.5rem);
    font-weight: 800; letter-spacing: 0.02em; text-transform: uppercase;
    color: var(--cr-text); line-height: 0.95;
    margin-bottom: 1.5rem;
  }
  .cr-hero-title span { color: var(--cr-primary); display: block; }
  .cr-hero-sub { font-size: 1rem; line-height: 1.75; color: var(--cr-muted); max-width: 380px; margin-bottom: 2.5rem; }
  .cr-hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 3rem; }
  .cr-btn-primary {
    background: var(--cr-primary); color: var(--cr-bg);
    padding: 0.9rem 2rem;
    font-family: var(--font-display);
    font-weight: 800; font-size: 1rem; letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; transition: background 0.2s, transform 0.2s;
  }
  .cr-btn-primary:hover { background: var(--cr-accent); transform: translateY(-2px); }
  .cr-btn-ghost {
    border: 2px solid rgba(245,245,240,0.2); color: var(--cr-muted);
    padding: 0.9rem 2rem;
    font-family: var(--font-display);
    font-weight: 700; font-size: 1rem; letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; transition: border-color 0.2s, color 0.2s;
  }
  .cr-btn-ghost:hover { border-color: var(--cr-primary); color: var(--cr-primary); }
  .cr-hero-stats { display: flex; gap: 2.5rem; }
  .cr-hero-stat-value {
    font-family: var(--font-display);
    font-size: 2rem; font-weight: 800; color: var(--cr-primary); margin-bottom: 0.15rem;
  }
  .cr-hero-stat-label { font-size: 0.7rem; font-weight: 600; color: var(--cr-muted); letter-spacing: 0.1em; text-transform: uppercase; }

  /* TICKER STRIP */
  .cr-ticker {
    background: var(--cr-primary);
    overflow: hidden; padding: 0.75rem 0;
  }
  .cr-ticker-inner {
    display: flex; gap: 3rem;
    animation: cr-scroll 30s linear infinite;
    white-space: nowrap;
  }
  @keyframes cr-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .cr-ticker-item {
    font-family: var(--font-display);
    font-size: 0.85rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--cr-bg); flex-shrink: 0;
    display: flex; align-items: center; gap: 1rem;
  }
  .cr-ticker-sep { color: rgba(10,10,10,0.35); }

  /* SECTIONS */
  section { padding: 6rem 2rem; }
  .cr-section-tag {
    font-family: var(--font-display);
    font-size: 0.78rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--cr-primary); margin-bottom: 0.5rem; display: inline-block;
  }
  .cr-section-title {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 4vw, 4rem);
    font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em;
    color: var(--cr-text); line-height: 0.95; margin-bottom: 1rem;
  }
  .cr-section-sub { font-size: 1rem; line-height: 1.75; color: var(--cr-muted); max-width: 540px; }

  /* MOVEMENTS */
  .cr-movements-section { background: var(--cr-surface); }
  .cr-movements-inner { max-width: 1200px; margin: 0 auto; }
  .cr-movements-top { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; flex-wrap: wrap; gap: 2rem; }
  .cr-movements-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(232,177,0,0.08); border: 1px solid rgba(232,177,0,0.08); }
  .cr-move-cell {
    background: var(--cr-card); padding: 2.5rem 2rem;
    transition: background 0.2s;
  }
  .cr-move-cell:hover { background: #222; }
  .cr-move-icon { font-size: 1.8rem; margin-bottom: 1rem; }
  .cr-move-name {
    font-family: var(--font-display);
    font-size: 1.2rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
    color: var(--cr-text); margin-bottom: 0.6rem;
  }
  .cr-move-desc { font-size: 0.88rem; line-height: 1.65; color: var(--cr-muted); }

  /* CLASSES */
  .cr-classes-section { background: var(--cr-bg); }
  .cr-classes-inner { max-width: 1200px; margin: 0 auto; }
  .cr-classes-header { margin-bottom: 3rem; }
  .cr-classes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(232,177,0,0.08); border: 1px solid rgba(232,177,0,0.08); }
  .cr-class-cell {
    background: var(--cr-card); padding: 2rem;
    transition: background 0.2s;
    position: relative;
  }
  .cr-class-cell:hover { background: #1F1F1F; }
  .cr-class-cell::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--cr-primary);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s;
  }
  .cr-class-cell:hover::before { transform: scaleX(1); }
  .cr-class-badges { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
  .cr-badge {
    font-family: var(--font-display);
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 0.25rem 0.65rem;
  }
  .cr-badge-level { background: rgba(232,177,0,0.12); color: var(--cr-primary); }
  .cr-badge-dur { background: rgba(245,245,240,0.06); color: var(--cr-muted); }
  .cr-class-name {
    font-family: var(--font-display);
    font-size: 1.25rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
    color: var(--cr-text); margin-bottom: 0.75rem;
  }
  .cr-class-desc { font-size: 0.88rem; line-height: 1.65; color: var(--cr-muted); }

  /* PRICING */
  .cr-pricing-section { background: var(--cr-surface); }
  .cr-pricing-inner { max-width: 1100px; margin: 0 auto; }
  .cr-pricing-header { text-align: center; margin-bottom: 3.5rem; }
  .cr-pricing-header .cr-section-sub { margin: 0 auto; }
  .cr-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(232,177,0,0.08); border: 1px solid rgba(232,177,0,0.08); }
  .cr-price-card {
    background: var(--cr-card); padding: 2.5rem 2rem;
    position: relative;
    transition: background 0.2s;
  }
  .cr-price-card.highlight { background: #1A1800; }
  .cr-price-card:hover { background: #1F1F1F; }
  .cr-price-card.highlight:hover { background: #221E00; }
  .cr-popular-badge {
    position: absolute; top: 0; left: 0; right: 0;
    background: var(--cr-primary);
    font-family: var(--font-display);
    font-size: 0.68rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--cr-bg); text-align: center; padding: 0.3rem;
  }
  .cr-price-name {
    font-family: var(--font-display);
    font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--cr-muted); margin-bottom: 0.75rem;
    margin-top: 1rem;
  }
  .cr-price-card.highlight .cr-price-name { margin-top: 2rem; }
  .cr-price-amount {
    font-family: var(--font-display);
    font-size: 3rem; font-weight: 800; color: var(--cr-primary); line-height: 1; margin-bottom: 0.2rem;
  }
  .cr-price-period { font-size: 0.82rem; color: var(--cr-muted); margin-bottom: 1.75rem; }
  .cr-price-features { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 2rem; }
  .cr-price-features li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.88rem; color: var(--cr-muted); }
  .cr-check { color: var(--cr-primary); flex-shrink: 0; font-weight: 700; }
  .cr-price-cta {
    display: block; text-align: center; padding: 0.9rem;
    font-family: var(--font-display);
    font-weight: 800; font-size: 0.9rem; letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; transition: all 0.2s;
  }
  .cr-price-card.highlight .cr-price-cta { background: var(--cr-primary); color: var(--cr-bg); }
  .cr-price-card.highlight .cr-price-cta:hover { background: var(--cr-accent); }
  .cr-price-card:not(.highlight) .cr-price-cta { border: 2px solid rgba(245,245,240,0.15); color: var(--cr-muted); }
  .cr-price-card:not(.highlight) .cr-price-cta:hover { border-color: var(--cr-primary); color: var(--cr-primary); }

  /* CTA */
  .cr-cta-section { background: var(--cr-bg); text-align: center; padding: 7rem 2rem; position: relative; overflow: hidden; }
  .cr-cta-section::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,177,0,0.07) 0%, transparent 100%);
  }
  .cr-cta-inner { max-width: 600px; margin: 0 auto; position: relative; }
  .cr-cta-tag {
    font-family: var(--font-display);
    font-size: 0.8rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--cr-primary); margin-bottom: 1rem; display: block;
  }
  .cr-cta-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 5vw, 5.5rem);
    font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em;
    color: var(--cr-text); line-height: 0.95; margin-bottom: 1.25rem;
  }
  .cr-cta-title span { color: var(--cr-primary); display: block; }
  .cr-cta-sub { font-size: 1rem; color: var(--cr-muted); margin-bottom: 2.5rem; line-height: 1.75; }
  .cr-btn-cta {
    background: var(--cr-primary); color: var(--cr-bg);
    padding: 1.1rem 3rem;
    font-family: var(--font-display);
    font-weight: 800; font-size: 1rem; letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; display: inline-block;
    transition: background 0.2s, transform 0.2s;
  }
  .cr-btn-cta:hover { background: var(--cr-accent); transform: translateY(-2px); }

  /* FOOTER */
  .cr-footer { background: #060606; padding: 4rem 2rem 2rem; }
  .cr-footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; }
  .cr-footer-logo {
    font-family: var(--font-display);
    font-size: 1.4rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em;
    color: var(--cr-text); margin-bottom: 0.75rem;
  }
  .cr-footer-logo span { color: var(--cr-primary); }
  .cr-footer-desc { font-size: 0.88rem; line-height: 1.6; color: var(--cr-muted); max-width: 280px; }
  .cr-footer-h {
    font-family: var(--font-display);
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(245,245,240,0.3); margin-bottom: 1rem;
  }
  .cr-footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }
  .cr-footer-links a { color: var(--cr-muted); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
  .cr-footer-links a:hover { color: var(--cr-primary); }
  .cr-footer-bottom {
    max-width: 1200px; margin: 2.5rem auto 0;
    padding-top: 2rem; border-top: 1px solid rgba(245,245,240,0.06);
    display: flex; justify-content: space-between; align-items: center;
    font-size: 0.78rem; color: var(--cr-muted); flex-wrap: wrap; gap: 0.5rem;
  }
  .cr-footer-brand { color: var(--cr-primary); text-decoration: none; font-weight: 700; }

  /* REVEAL */
  .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 900px) {
    .cr-hero { grid-template-columns: 1fr; }
    .cr-hero-video { min-height: 50vh; }
    .cr-hero-copy { padding: 4rem 1.5rem 3rem; }
    .cr-movements-grid { grid-template-columns: repeat(2, 1fr); }
    .cr-classes-grid { grid-template-columns: 1fr; }
    .cr-pricing-grid { grid-template-columns: 1fr; }
    .cr-footer-inner { grid-template-columns: 1fr; }
    .cr-nav-links { display: none; }
  }
`;

const TICKER_ITEMS = ['Strength', 'Power', 'Community', 'WOD', 'Barbell', 'Grit', 'PRs', 'Endurance', 'Technique', 'Results', 'Strength', 'Power', 'Community', 'WOD', 'Barbell', 'Grit', 'PRs', 'Endurance', 'Technique', 'Results'];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.10 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function CrossPage() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* NAV */}
      <nav className={`cr-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="cr-nav-logo">Cross<span>Iron</span></a>
        <div className="cr-nav-links">
          <a href="#classes">Classes</a>
          <a href="#movements">Training</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <a href="#foundations" className="cr-btn-nav">Start Free Trial</a>
        </div>
      </nav>

      {/* SPLIT HERO */}
      <section id="foundations" className="cr-hero">
        {/* LEFT: Full-height video */}
        <div className="cr-hero-video">
          <video autoPlay muted loop playsInline
            poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-man-doing-crossfit-exercises-in-gym-with-a-barbell-39954-large.mp4"
              type="video/mp4"
            />
          </video>
          <div className="cr-hero-video-overlay" />
        </div>

        {/* RIGHT: Copy */}
        <div className="cr-hero-copy">
          <div className="cr-hero-tag">Denver, CO — Est. 2016</div>
          <h1 data-cg-el="hero_headline_1" className="cr-hero-title">
            Built for<br /><span>Athletes.</span>
          </h1>
          <p data-cg-el="hero_subtitle" className="cr-hero-sub">
            Real coaching. Real programming. Real community. CrossIron is Denver&apos;s most results-driven CrossFit affiliate — where beginners become athletes and athletes break records.
          </p>
          <div className="cr-hero-actions">
            <a data-cg-el="hero_cta_primary" href="#pricing" className="cr-btn-primary">Free Foundations Class</a>
            <a data-cg-el="hero_cta_secondary" href="#classes" className="cr-btn-ghost">View Schedule</a>
          </div>
          <div className="cr-hero-stats">
            {siteData.stats.map((s) => (
              <div key={s.label}>
                <div className="cr-hero-stat-value">{s.value}</div>
                <div className="cr-hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="cr-ticker">
        <div className="cr-ticker-inner">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="cr-ticker-item">
              {item} <span className="cr-ticker-sep">✕</span>
            </span>
          ))}
        </div>
      </div>

      {/* MOVEMENTS */}
      <section id="movements" className="cr-movements-section">
        <div className="cr-movements-inner">
          <div className="cr-movements-top reveal">
            <div>
              <span className="cr-section-tag">What We Train</span>
              <h2 className="cr-section-title">The Four<br />Pillars</h2>
            </div>
            <p className="cr-section-sub">
              CrossFit is defined by constantly varied, functional movements at high intensity. Every pillar reinforces the others. No weak links.
            </p>
          </div>
          <div className="cr-movements-grid">
            {siteData.movements.map((m, i) => (
              <div key={m.name} className="cr-move-cell reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="cr-move-icon">{m.icon}</div>
                <div className="cr-move-name">{m.name}</div>
                <p className="cr-move-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section id="classes" className="cr-classes-section">
        <div className="cr-classes-inner">
          <div className="cr-classes-header reveal">
            <span className="cr-section-tag">Class Formats</span>
            <h2 className="cr-section-title">Every Level.<br />Every Goal.</h2>
            <p className="cr-section-sub">
              From your first class to competition prep — CrossIron has a program for exactly where you are.
            </p>
          </div>
          <div className="cr-classes-grid">
            {siteData.classes.map((c, i) => (
              <div key={c.name} className="cr-class-cell reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="cr-class-badges">
                  <span className="cr-badge cr-badge-level">{c.level}</span>
                  <span className="cr-badge cr-badge-dur">{c.duration}</span>
                </div>
                <div className="cr-class-name">{c.name}</div>
                <p className="cr-class-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="cr-pricing-section">
        <div className="cr-pricing-inner">
          <div className="cr-pricing-header reveal">
            <span className="cr-section-tag">Membership</span>
            <h2 className="cr-section-title">Choose Your<br />Program</h2>
            <p className="cr-section-sub">
              No initiation fee. No long-term contracts. Just show up, work hard, and see what happens.
            </p>
          </div>
          <div className="cr-pricing-grid">
            {siteData.pricing.map((p, i) => (
              <div key={p.name} className={`cr-price-card reveal${p.highlight ? ' highlight' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                {p.highlight && <span className="cr-popular-badge">Most Popular</span>}
                <div className="cr-price-name">{p.name}</div>
                <div className="cr-price-amount">{p.price}</div>
                <div className="cr-price-period">{p.period}</div>
                <ul className="cr-price-features">
                  {p.features.map((f) => (
                    <li key={f}><span className="cr-check">✕</span>{f}</li>
                  ))}
                </ul>
                <a href="#foundations" className="cr-price-cta">Get Started</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cr-cta-section">
        <div className="cr-cta-inner">
          <span className="cr-cta-tag reveal">Your First Class Is Free</span>
          <h2 className="cr-cta-title reveal">
            Stop<br /><span>Waiting.</span>
          </h2>
          <p className="cr-cta-sub reveal">
            Book your free Foundations class. No experience needed. Just show up ready to work — we&apos;ll handle the rest.
          </p>
          <a href="#pricing" className="cr-btn-cta reveal">Book Free Class</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="cr-footer">
        <div className="cr-footer-inner">
          <div>
            <div className="cr-footer-logo">Cross<span>Iron</span> Athletics</div>
            <p className="cr-footer-desc">
              {siteData.gym.address}<br />
              {siteData.gym.phone}<br />
              {siteData.gym.email}
            </p>
          </div>
          <div>
            <div className="cr-footer-h">Train</div>
            <ul className="cr-footer-links">
              <li><a href="#classes">Schedule</a></li>
              <li><a href="#movements">Our Training</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#">Barbell Club</a></li>
            </ul>
          </div>
          <div>
            <div className="cr-footer-h">Info</div>
            <ul className="cr-footer-links">
              <li><a href="#">New Member FAQ</a></li>
              <li><a href="#">Coaches</a></li>
              <li><a href="#">Competitions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="cr-footer-bottom">
          <span>© {new Date().getFullYear()} CrossIron Athletics. All rights reserved.</span>
          <span>Powered by <a href="https://garrison365.com" className="cr-footer-brand">Garrison365</a></span>
        </div>
      </footer>
    </>
  );
}
