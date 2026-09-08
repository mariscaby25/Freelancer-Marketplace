USE freelancer_marketplace;

-- Passwords below are bcrypt hashes of "password123" (for demo/testing only)
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@marketplace.com', '$2b$10$e0NRZTvR6Xz6qkS0N1P0DOeQjXjLh1x9wq1s8s0e2p1r6r6r6r6r6', 'admin'),
('Ama Owusu', 'ama.client@example.com', '$2b$10$e0NRZTvR6Xz6qkS0N1P0DOeQjXjLh1x9wq1s8s0e2p1r6r6r6r6r6', 'client'),
('Kwame Mensah', 'kwame.client@example.com', '$2b$10$e0NRZTvR6Xz6qkS0N1P0DOeQjXjLh1x9wq1s8s0e2p1r6r6r6r6r6', 'client'),
('Efua Boateng', 'efua.dev@example.com', '$2b$10$e0NRZTvR6Xz6qkS0N1P0DOeQjXjLh1x9wq1s8s0e2p1r6r6r6r6r6', 'freelancer'),
('Kojo Asante', 'kojo.designer@example.com', '$2b$10$e0NRZTvR6Xz6qkS0N1P0DOeQjXjLh1x9wq1s8s0e2p1r6r6r6r6r6', 'freelancer');

INSERT INTO freelancers (user_id, title, bio, skills, hourly_rate, portfolio_url, location, years_experience) VALUES
(4, 'Full-Stack Developer', 'I build fast, reliable web applications with React and Node.js.', 'React,Node.js,MySQL,Express,JavaScript', 35.00, 'https://efua.dev', 'Accra, Ghana', 5),
(5, 'UI/UX Designer', 'Passionate about crafting clean, user-centered digital experiences.', 'Figma,UI Design,UX Research,Adobe XD', 28.00, 'https://kojo.design', 'Kumasi, Ghana', 3);

INSERT INTO jobs (client_id, title, description, category, skills_required, budget_min, budget_max, budget_type, deadline, status) VALUES
(2, 'Build an e-commerce website', 'Need a full online store with payment integration and admin dashboard.', 'Web Development', 'React,Node.js,MySQL', 800.00, 1500.00, 'fixed', '2026-10-15', 'open'),
(3, 'Redesign mobile app UI', 'Looking for a designer to refresh our fintech app UI/UX.', 'Design', 'Figma,UI Design', 400.00, 700.00, 'fixed', '2026-09-30', 'open'),
(2, 'Ongoing backend maintenance', 'Need a developer for weekly backend maintenance and bug fixes.', 'Web Development', 'Node.js,Express,MySQL', 20.00, 40.00, 'hourly', '2026-12-31', 'in_progress');

INSERT INTO applications (job_id, freelancer_id, cover_letter, proposed_rate, status) VALUES
(1, 4, 'I have built 6 e-commerce platforms in the last 2 years and can deliver this in 4 weeks.', 1200.00, 'pending'),
(2, 5, 'I would love to redesign your fintech app — here is my relevant portfolio.', 550.00, 'shortlisted'),
(3, 4, 'Available immediately for ongoing maintenance work.', 30.00, 'accepted');

INSERT INTO messages (sender_id, receiver_id, job_id, content, is_read) VALUES
(2, 4, 1, 'Hi Efua, thanks for applying! Can you share more about your past e-commerce projects?', TRUE),
(4, 2, 1, 'Of course! I recently built a store handling 10k+ monthly orders using React and Node.', FALSE),
(3, 5, 2, 'Hi Kojo, we loved your portfolio. When can you start?', TRUE),
(5, 3, 2, 'Thank you! I can start next Monday.', FALSE);