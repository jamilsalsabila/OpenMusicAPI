const mapDBToModel = ({
	id,
	title,
	year,
	performer,
	genre,
	duration,
	inserted_at,
	updated_at,
}) => ({
	id: id,
	title: title,
	year: year,
	performer: performer,
	genre: genre,
	duration: duration,
	insertedAt: inserted_at,
	updatedAt: updated_at,
});

module.exports = { mapDBToModel };
