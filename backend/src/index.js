import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { connectDB } from './config/configDB.js';
import { createUsers } from './config/initialSetup.js';
import indexRoutes from './routes/index.routes.js';
import configEnv from './config/configEnv.js';

const PORT = configEnv.PORT || 8080;
const HOST = configEnv.HOST || 'localhost';

async function setupServer() {
	try {
		const app = express();

		// Deshabilitar header x-powered-by
		app.disable('x-powered-by');

		// CORS configurado para frontend local
		app.use(
			cors({
				origin: ['http://localhost:5173', 'http://localhost:8080'],
				credentials: true,
				methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
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

		// 404 - No encontrado (debe ser el ÚLTIMO middleware)
		app.use((req, res) => {
			res.status(404).json({ status: 'Not Found', path: req.originalUrl });
		});

		// Iniciar servidor
		const server = app.listen(PORT, () => {
			console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
		});

		// Mantener proceso vivo
		process.on('SIGINT', () => {
			console.log('[SHUTDOWN] Cerrando servidor...');
			server.close(() => process.exit(0));
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
		await createUsers();
		await setupServer();
		console.log('=> API Iniciada exitosamente');
	} catch (error) {
		console.error('Error en setupAPI():', error);
		process.exit(1);
	}
}

setupAPI().catch((err) => {
	console.error('Error fatal:', err);
	process.exit(1);
});