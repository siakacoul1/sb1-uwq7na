import { getDb } from '../database/init.js';

export class Program {
  static getAll() {
    const db = getDb();
    return db.prepare(`
      SELECT programs.*, departments.name as department_name 
      FROM programs 
      JOIN departments ON programs.department_id = departments.id
      ORDER BY programs.name
    `).all();
  }

  static getById(id) {
    const db = getDb();
    return db.prepare('SELECT * FROM programs WHERE id = ?').get(id);
  }

  static create(program) {
    const db = getDb();
    const { lastInsertRowid } = db.prepare(`
      INSERT INTO programs (name, code, department_id, description, duration, credits_required)
      VALUES (@name, @code, @department_id, @description, @duration, @credits_required)
    `).run(program);
    return this.getById(lastInsertRowid);
  }

  static update(id, program) {
    const db = getDb();
    db.prepare(`
      UPDATE programs 
      SET name = @name, code = @code, department_id = @department_id,
          description = @description, duration = @duration, credits_required = @credits_required
      WHERE id = @id
    `).run({ ...program, id });
    return this.getById(id);
  }

  static delete(id) {
    const db = getDb();
    return db.prepare('DELETE FROM programs WHERE id = ?').run(id);
  }
}