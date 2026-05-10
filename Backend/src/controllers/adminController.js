const db = require('../db');

const getStats = async (req, res, next) => {
  try {
    // Build stats from raw queries since the view may not match frontend expectations
    const usersCount = await db.query('SELECT COUNT(*) as total_users FROM users');
    const tripsCount = await db.query('SELECT COUNT(*) as total_trips FROM trips');
    const ongoingCount = await db.query("SELECT COUNT(*) as count FROM trips WHERE status = 'ongoing'");
    const upcomingCount = await db.query("SELECT COUNT(*) as count FROM trips WHERE status = 'planning'");
    const completedCount = await db.query("SELECT COUNT(*) as count FROM trips WHERE status = 'completed'");

    // Top destinations
    const topDests = await db.query(
      "SELECT destination, COUNT(*) as count FROM trips WHERE destination IS NOT NULL GROUP BY destination ORDER BY count DESC LIMIT 5"
    );

    // Monthly trip creation
    const monthly = await db.query(
      "SELECT TO_CHAR(created_at, 'YYYY-MM') as month, COUNT(*) as count FROM trips GROUP BY month ORDER BY month DESC LIMIT 12"
    );

    res.json({
      success: true,
      data: {
        total_users: parseInt(usersCount.rows[0].total_users),
        total_trips: parseInt(tripsCount.rows[0].total_trips),
        ongoing: parseInt(ongoingCount.rows[0].count),
        upcoming: parseInt(upcomingCount.rows[0].count),
        completed: parseInt(completedCount.rows[0].count),
        total_posts: 0,
        top_destinations: topDests.rows,
        monthly: monthly.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

const listAllUsers = async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT id, email, name, first_name, last_name, phone, city, country, profile_photo, is_admin, created_at FROM users ORDER BY created_at DESC'
    );
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    next(err);
  }
};

const listAllTrips = async (req, res, next) => {
  try {
    const { status, user_id } = req.query;
    let queryText = 'SELECT * FROM trips WHERE 1=1';
    const params = [];

    if (user_id) {
      params.push(user_id);
      queryText += ` AND user_id = $${params.length}`;
    }
    if (status) {
      params.push(status);
      queryText += ` AND status = $${params.length}`;
    }

    queryText += ' ORDER BY created_at DESC';

    const result = await db.query(queryText, params);
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    next(err);
  }
};

const listAllActivities = async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT a.*, c.name AS city_name FROM activities a JOIN cities c ON a.city_id = c.id ORDER BY a.id'
    );
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Prevent deleting yourself
    if (id === req.user.id) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own account from admin panel' });
    }
    await db.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStats,
  listAllUsers,
  listAllTrips,
  listAllActivities,
  deleteUser,
};
