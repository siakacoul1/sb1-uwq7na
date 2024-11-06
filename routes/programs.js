import express from 'express';
import { body, validationResult } from 'express-validator';
import { Program } from '../models/Program.js';
import { Department } from '../models/Department.js';

export const router = express.Router();

const validateProgram = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('code').trim().notEmpty().withMessage('Code is required'),
  body('department_id').isInt().withMessage('Department is required'),
  body('duration').isInt({ min: 1 }).withMessage('Valid duration is required'),
  body('credits_required').isInt({ min: 1 }).withMessage('Valid credits are required')
];

router.get('/', (req, res) => {
  const programs = Program.getAll();
  res.render('programs/index', { programs });
});

router.get('/new', (req, res) => {
  const departments = Department.getAll();
  res.render('programs/create', { departments });
});

router.post('/', validateProgram, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const departments = Department.getAll();
    return res.render('programs/create', {
      departments,
      errors: errors.array(),
      program: req.body
    });
  }

  Program.create(req.body);
  res.redirect('/programs');
});

router.get('/:id/edit', (req, res) => {
  const program = Program.getById(req.params.id);
  const departments = Department.getAll();
  res.render('programs/edit', { program, departments });
});

router.put('/:id', validateProgram, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const departments = Department.getAll();
    return res.render('programs/edit', {
      departments,
      errors: errors.array(),
      program: { ...req.body, id: req.params.id }
    });
  }

  Program.update(req.params.id, req.body);
  res.redirect('/programs');
});

router.delete('/:id', (req, res) => {
  Program.delete(req.params.id);
  res.redirect('/programs');
});