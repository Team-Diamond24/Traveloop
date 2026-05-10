const db = require('../db');

const listActivities = async (req, res, next) => {
  try {
    const { city_id, city, category, max_cost, q } = req.query;
    let queryText = 'SELECT a.*, c.name AS city_name, c.country AS city_country FROM activities a JOIN cities c ON a.city_id = c.id WHERE 1=1';
    const params = [];

    if (city_id) {
      params.push(city_id);
      queryText += ` AND a.city_id = $${params.length}`;
    }
    if (city) {
      params.push(`%${city}%`);
      queryText += ` AND c.name ILIKE $${params.length}`;
    }
    if (category) {
      params.push(category);
      queryText += ` AND a.category = $${params.length}`;
    }
    if (max_cost) {
      params.push(max_cost);
      queryText += ` AND a.cost_per_person <= $${params.length}`;
    }
    if (q) {
      params.push(`%${q}%`);
      queryText += ` AND (a.name ILIKE $${params.length} OR a.description ILIKE $${params.length})`;
    }

    const result = await db.query(queryText, params);
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    next(err);
  }
};

const getActivityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'SELECT a.*, c.name AS city_name, c.country AS city_country FROM activities a JOIN cities c ON a.city_id = c.id WHERE a.id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listActivities,
  getActivityById,
};
