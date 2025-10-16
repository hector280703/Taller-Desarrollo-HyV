const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { connectDB } = require('./config/configDB');
const { createUsers } = require('./config/initialSetup');
const indexRoutes = require('./routes/index.routes');
const configEnv = require('./config/configEnv');

const PORT = configEnv.PORT || 3000;
const HOST = configEnv.HOST || 'localhost';

async function setupServer() {
	try {
		const app = express();

		// Deshabilitar header x-powered-by
		app.disable('x-powered-by');

		// CORS configurado para frontend local
		app.use(
			cors({
				origin: 'http://localhost:5173',
				credentials: true,
				methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
				allowedHeaders: ['Content-Type', 'Authorization'],
			})
		);

		// Parseo de datos
		app.use(express.urlencoded({ extended: true, limit: '1mb' }));
		app.use(express.json({ limit: '1mb' }));

		// Cookie parser
		app.use(cookieParser());

		// Morgan para logs
		app.use(morgan('dev'));

		// Sesiones (opcional, útil si usas autenticación)
		app.use(
			session({
				secret: configEnv.DB_USERNAME || 'secret-key',
				resave: false,
				saveUninitialized: false,
				cookie: {
					secure: false,
					httpOnly: true,
					sameSite: 'lax',
				},
			})
		);

		// Rutas
		app.use('/api', indexRoutes);

		// Ruta raíz de prueba
		app.get('/', (_req, res) => {
			res.status(200).send('API running');
		});

		// 404 - No encontrado
		app.use((req, res) => {
			res.status(404).json({ status: 'Not Found', path: req.originalUrl });
		});

		// Iniciar servidor
		app.listen(PORT, () => {
			console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
		});
	} catch (error) {
		console.error('Error en setupServer():', error);
		throw error;
	}
}

async function setupAPI() {
	try {
		console.log('Iniciando configuración de la API...');
		await connectDB();
		await setupServer();
		await createUsers();
		console.log('=> API Iniciada exitosamente');
	} catch (error) {
		console.error('Error en setupAPI():', error);
		process.exit(1);
	}
}

setupAPI();