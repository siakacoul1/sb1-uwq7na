import express from 'express';
import { body, validationResult } from 'express-validator';
import { Activity } from '../models/Activity.js';
import { Program } from '../models/Program.js';

export const router = express.Router();

// Validation middleware
const validateActivity = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('program_id').isInt().withMessage('Valid program is required'),
  body('start_date').isISO8601().withMessage('Valid start date is required'),
  body('end_date').isISO8601().withMessage('Valid end date is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('type').isIn(['course', 'seminar', 'workshop', 'exam', 'other']).withMessage('Valid type is required'),
  body('status').isIn(['scheduled', 'in_progress', 'completed', 'cancelled']).withMessage('Valid status is required')
];

// List all activities
router.get('/', (req, res) => {
  const activities = Activity.getAll();
  res.render('activities/index', { activities });
});

// Show create form
router.get('/new', (req, res) => {
  const programs = Program.getAll();
  res.render('activities/create', { programs });
});

// Create activity
router.post('/', validateActivity, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const programs = Program.getAll();
    return res.render('activities/create', { 
      programs,
      errors: errors.array(),
      activity: req.body
    });
  }

  Activity.create(req.body);
  res.redirect('/activities');
});

// Show edit form
router.get('/:id/edit', (req, res) => {
  const activity = Activity.getById(req.params.id);
  const programs = Program.getAll();
  res.render('activities/edit', { activity, programs });
});

// Update activity
router.put('/:id', validateActivity, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const programs = Program.getAll();
    return res.render('activities/edit', {
      programs,
      errors: errors.array(),
      activity: { ...req.body, id: req.params.id }
    });
  }

  Activity.update(req.params.id, req.body);
  res.redirect('/activities');
});

// Delete activity
router.delete('/:id', (req, res) => {
  Activity.delete(req.params.id);
  res.redirect('/activities');
});