import { getDb } from '../database/init.js';

export class Department {
  static getAll() {
    const db = getDb();
    return db.prepare('SELECT * FROM departments ORDER BY name').all();
  }

  static getById(id) {
    const db = getDb();
    return db.prepare('SELECT * FROM departments WHERE id = ?').get(id);
  }

  static create(department) {
    const db = getDb();
    const { lastInsertRowid } = db.prepare(`
      INSERT INTO departments (name, code, description)
      VALUES (@name, @code, @description)
    `).run(department);
    return this.getById(lastInsertRowid);
  }

  static update(id, department) {
    const db = getDb();
    db.prepare(`
      UPDATE departments 
      SET name = @name, code = @code, description = @description
      WHERE id = @id
    `).run({ ...department, id });
    return this.getById(id);
  }

  static delete(id) {
    const db = getDb();
    return db.prepare('DELETE FROM departments WHERE id = ?').run(id);
  }
}