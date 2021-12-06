const Joi = require('joi');

const SongPayloadSchema = Joi.object({
	title: Joi.string().alphanum().min(3).max(30).required(),
	year: Joi.number().integer().min(1000).max(9999).required(),
	performer: Joi.string().alphanum().min(3).max(30).required(),
	genre: Joi.string().alphanum().min(2).max(20).required(),
	duration: Joi.number().integer().min(60).max(500).required(),
});

module.exports = { SongPayloadSchema };
