require('dotenv').config();

const openmusic = require('./api/openmusic');
const Hapi = require('@hapi/hapi');
const OpenMusicService = require('./services/postgres/OpenMusicService');
const OpenMusicValidator = require('./validator/openmusic');

const init = async () => {
	const openMusicService = new OpenMusicService();

	const server = Hapi.server({
		port: process.env.PORT,
		host: process.env.HOST,
		routes: {
			cors: {
				origin: ['*'],
			}
		},
	});

	await server.register({
		plugin: openmusic,
		options: {
			service: openMusicService,
			validator: OpenMusicValidator,
		}
	});

	await server.start();
	console.log(`Server berjalan pada ${server.info.uri}`);

};

init();
