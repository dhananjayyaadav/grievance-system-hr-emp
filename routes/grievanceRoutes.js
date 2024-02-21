const express = require('express');
const router = express.Router();
const grievanceController = require('../controllers/grievanceController');

// Authentication middleware to check if the user is authenticated
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
};

// Only HR can resolve grievances
const authorizeHR = (req, res, next) => {
  if (req.userRole !== 'hr') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
};

router.use(authenticate);

// Employee raises a grievance
router.post('/raises', grievanceController.raiseGrievance);

// HR resolves a grievance
router.patch('/:id/resolve', authorizeHR, grievanceController.resolveGrievance);

module.exports = router;
