import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import morgan from 'morgan';
import { router as activityRoutes } from './routes/activities.js';
import { router as departmentRoutes } from './routes/departments.js';
import { router as programRoutes } from './routes/programs.js';
import { initializeDatabase } from './database/init.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Initialize database
initializeDatabase();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// Routes
app.use('/activities', activityRoutes);
app.use('/departments', departmentRoutes);
app.use('/programs', programRoutes);

app.get('/', (req, res) => {
  res.redirect('/activities');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});