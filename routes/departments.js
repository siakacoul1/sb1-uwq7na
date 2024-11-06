import express from 'express';
import { body, validationResult } from 'express-validator';
import { Department } from '../models/Department.js';

export const router = express.Router();

const validateDepartment = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('code').trim().notEmpty().withMessage('Code is required')
];

router.get('/', (req, res) => {
  const departments = Department.getAll();
  res.render('departments/index', { departments });
});

router.get('/new', (req, res) => {
  res.render('departments/create');
});

router.post('/', validateDepartment, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('departments/create', {
      errors: errors.array(),
      department: req.body
    });
  }

  Department.create(req.body);
  res.redirect('/departments');
});

router.get('/:id/edit', (req, res) => {
  const department = Department.getById(req.params.id);
  res.render('departments/edit', { department });
});

router.put('/:id', validateDepartment, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('departments/edit', {
      errors: errors.array(),
      department: { ...req.body, id: req.params.id }
    });
  }

  Department.update(req.params.id, req.body);
  res.redirect('/departments');
});

router.delete('/:id', (req, res) => {
  Department.delete(req.params.id);
  res.redirect('/departments');
});