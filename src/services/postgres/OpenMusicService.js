const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModel } = require('../../utils/mapDBToModel');

class OpenMusicService {
	constructor() {
		this._pool = new Pool();
	}

	async addSong({ title, year, performer, genre, duration }) {
		const id = `song-${nanoid(16)}`;
		const insertedAt = new Date().toISOString();
		const updatedAt = insertedAt;

		const q = {
			text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
			values: [id, title, year, performer, genre, duration, insertedAt, updatedAt],
		}

		const result = await this._pool.query(q);

		if (!result.rows[0].id) {
			throw new InvariantError('Lagu gagal ditambahkan');
		}

		return result.rows[0].id;
	}

	async getSongs() {
		const q = {
			text: `SELECT id, title, performer FROM songs`,
			values: [],
		}

		const result = await this._pool.query(q);
		return result.rows;
	}

	async getSongById(id) {
		const q = {
			text: `SELECT * FROM songs WHERE id = $1`,
			values: [id],
		};

		const result = await this._pool.query(q);

		if (!result.rows.length) {
			throw new NotFoundError('Lagu tidak ditemukan');
		}

		return result.rows.map(mapDBToModel)[0];
	}

	async editSongById(id, { title, year, performer, genre, duration }) {
		const updatedAt = new Date().toISOString();

		const q = {
			text: `UPDATE songs SET title=$1, year=$2, performer=$3, genre=$4, duration=$5 WHERE id=$6 RETURNING id`,
			values: [title, year, performer, genre, duration, id], 
		}

		const result = await this._pool.query(q);

		if (!result.rows.length) {
			throw new NotFoundError('Gagal memperbarui lagu, Id tidak ditemukan');
		}
	}

	async deleteSongById(id) {
		const q = {
			text: 'DELETE FROM songs WHERE id=$1 RETURNING id',
			values: [id],
		}

		const result = await this._pool.query(q);

		if (!result.rows.length) {
			throw new NotFoundError('Lagu gagal dihapus, Id tidak ditemukan')
		}
	}
}

module.exports = OpenMusicService;
