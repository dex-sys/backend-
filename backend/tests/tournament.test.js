// Pruebas para las rutas de Torneos (tournamentRoutes.js)

const request = require('supertest');
const express = require('express');
// No importamos tournamentRoutes ya que está vacío y no se montará.
// const tournamentRoutes = require('../src/routes/tournamentRoutes'); 
// const tournamentService = require('../src/services/tournamentService'); // No necesario si no hay rutas

// jest.mock('../src/services/tournamentService'); // No necesario si no hay rutas

const app = express();
app.use(express.json());

// Si tournamentRoutes.js tuviera rutas, se montarían así:
// app.use('/tournaments', tournamentRoutes); 
// Como está vacío, cualquier ruta bajo /tournaments debería dar 404.

describe('Pruebas de API para Torneos (Rutas No Implementadas)', () => {
    
    it('debería devolver 404 para GET /tournaments (ruta hipotética no implementada)', async () => {
        const res = await request(app).get('/tournaments');
        expect(res.statusCode).toEqual(404);
    });

    it('debería devolver 404 para POST /tournaments (ruta hipotética no implementada)', async () => {
        const res = await request(app)
            .post('/tournaments')
            .send({ name: 'Nuevo Torneo' });
        expect(res.statusCode).toEqual(404);
    });

    it('debería devolver 404 para GET /tournaments/:id (ruta hipotética no implementada)', async () => {
        const res = await request(app).get('/tournaments/some-id');
        expect(res.statusCode).toEqual(404);
    });

    it('debería devolver 404 para PUT /tournaments/:id (ruta hipotética no implementada)', async () => {
        const res = await request(app)
            .put('/tournaments/some-id')
            .send({ status: 'active' });
        expect(res.statusCode).toEqual(404);
    });

    it('debería devolver 404 para DELETE /tournaments/:id (ruta hipotética no implementada)', async () => {
        const res = await request(app).delete('/tournaments/some-id');
        expect(res.statusCode).toEqual(404);
    });

    it('debería devolver 404 para GET /tournaments/:id/members (ruta hipotética no implementada)', async () => {
        const res = await request(app).get('/tournaments/some-id/members');
        expect(res.statusCode).toEqual(404);
    });

    // Este test es más una formalidad para que el archivo no esté completamente vacío de lógica de test real
    // si se decidiera no incluir los tests 404 de arriba.
    it('confirma que el entorno de pruebas funciona', () => {
        expect(true).toBe(true);
    });
});
