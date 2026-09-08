import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      <section
        className="hero"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(79,70,229,0.88), rgba(30,27,75,0.85)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="hero-content">
          <span className="hero-eyebrow">Trusted by 10,000+ businesses</span>
          <h1>Find great work.<br />Hire great talent.</h1>
          <p>FreelanceHub connects clients with skilled freelancers for projects of any size — from a quick logo tweak to a full product build.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn-primary">Get Started</Link>
            <Link to="/freelancer/browse-jobs" className="btn-outline">Browse Jobs</Link>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="stat-item"><h3>12K+</h3><p>Jobs posted</p></div>
        <div className="stat-item"><h3>8K+</h3><p>Freelancers</p></div>
        <div className="stat-item"><h3>4.8★</h3><p>Average rating</p></div>
        <div className="stat-item"><h3>98%</h3><p>Job success rate</p></div>
      </section>

      <section className="features">
        <div className="section-heading">
          <h2>How FreelanceHub works</h2>
          <p>Everything you need to hire or get hired, in one place.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Post a Job</h3>
            <p>Clients can post job offers and review applications from qualified freelancers in minutes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Apply with Confidence</h3>
            <p>Freelancers build a profile, apply to jobs, and track every application's status in one dashboard.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Message Directly</h3>
            <p>Chat in real time with clients or freelancers to align on project details before work begins.</p>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <h2>Ready to get started?</h2>
        <p>Join thousands of clients and freelancers building great work together.</p>
        <Link to="/register" className="btn-primary btn-large">Create your free account</Link>
      </section>
    </div>
  );
}