const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function run() {
  const password = 'AdminPass123';
  const hash = await bcrypt.hash(password, 10);
  console.log('Generated hash:', hash);

  const match = await bcrypt.compare(password, hash);
  console.log('Self-check match:', match);

  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Ihatenonsense123',
    database: 'freelancer_marketplace',
  });

  await pool.query(
    "UPDATE users SET password = ? WHERE email = 'admin@freelancehub.com'",
    [hash]
  );
  console.log('Admin password updated successfully.');
  process.exit(0);
}

run().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});