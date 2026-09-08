-- All open jobs with client name
SELECT j.*, u.name AS client_name
FROM jobs j
JOIN users u ON j.client_id = u.id
WHERE j.status = 'open'
ORDER BY j.created_at DESC;

-- Search jobs by keyword + category
SELECT * FROM jobs
WHERE status = 'open'
  AND (title LIKE CONCAT('%', ?, '%') OR skills_required LIKE CONCAT('%', ?, '%'))
  AND (category = ? OR ? IS NULL);

-- All freelancers with user info
SELECT f.*, u.name, u.email
FROM freelancers f
JOIN users u ON f.user_id = u.id
WHERE u.status = 'active';

-- Applications for a specific job (client's view)
SELECT a.*, u.name AS freelancer_name, f.title, f.hourly_rate, f.skills
FROM applications a
JOIN users u ON a.freelancer_id = u.id
JOIN freelancers f ON f.user_id = u.id
WHERE a.job_id = ?
ORDER BY a.applied_at DESC;

-- Applications submitted by a freelancer (tracker)
SELECT a.*, j.title AS job_title, j.status AS job_status, u.name AS client_name
FROM applications a
JOIN jobs j ON a.job_id = j.id
JOIN users u ON j.client_id = u.id
WHERE a.freelancer_id = ?
ORDER BY a.applied_at DESC;

-- Conversation between two users (optionally scoped to a job)
SELECT * FROM messages
WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
ORDER BY created_at ASC;

-- Unread message count for a user
SELECT COUNT(*) AS unread_count FROM messages
WHERE receiver_id = ? AND is_read = FALSE;

-- Admin: platform stats
SELECT
  (SELECT COUNT(*) FROM users WHERE role = 'client') AS total_clients,
  (SELECT COUNT(*) FROM users WHERE role = 'freelancer') AS total_freelancers,
  (SELECT COUNT(*) FROM jobs) AS total_jobs,
  (SELECT COUNT(*) FROM jobs WHERE status = 'open') AS open_jobs,
  (SELECT COUNT(*) FROM applications) AS total_applications;

-- Admin: suspend / activate a user
UPDATE users SET status = ? WHERE id = ?;

-- Admin: remove a job listing
DELETE FROM jobs WHERE id = ?;