import { getDb } from '../database/init.js';

export class Activity {
  static getAll() {
    const db = getDb();
    return db.prepare(`
      SELECT activities.*, programs.name as program_name 
      FROM activities 
      JOIN programs ON activities.program_id = programs.id
      ORDER BY start_date DESC
    `).all();
  }

  static getById(id) {
    const db = getDb();
    return db.prepare('SELECT * FROM activities WHERE id = ?').get(id);
  }

  static create(activity) {
    const db = getDb();
    const { lastInsertRowid } = db.prepare(`
      INSERT INTO activities (name, program_id, description, start_date, end_date, location, capacity, type, status)
      VALUES (@name, @program_id, @description, @start_date, @end_date, @location, @capacity, @type, @status)
    `).run(activity);
    return this.getById(lastInsertRowid);
  }

  static update(id, activity) {
    const db = getDb();
    db.prepare(`
      UPDATE activities 
      SET name = @name, program_id = @program_id, description = @description,
          start_date = @start_date, end_date = @end_date, location = @location,
          capacity = @capacity, type = @type, status = @status
      WHERE id = @id
    `).run({ ...activity, id });
    return this.getById(id);
  }

  static delete(id) {
    const db = getDb();
    return db.prepare('DELETE FROM activities WHERE id = ?').run(id);
  }
}