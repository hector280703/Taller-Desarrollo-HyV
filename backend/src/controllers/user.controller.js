"use strict";
const {
    getUserService,
} = require("../services/user.service.js");

const {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} = require("../handlers/responseHandlres.js");

async function getUser(req, res) {
  try {
    console.log('[getUser] Iniciando petición GET /users');
    
    const [users, errorUsers] = await getUserService();
    console.log('[getUser] Respuesta del servicio:', { users: users?.length, error: errorUsers });

    if (errorUsers) {
      console.log('[getUser] Error en servicio, retornando 404');
      return handleErrorClient(res, 404, errorUsers);
    }

    if (!users || users.length === 0) {
      console.log('[getUser] Sin usuarios, retornando 200 con array vacío');
      return handleSuccess(res, 200, "No hay usuarios registrados", []);
    }

    console.log('[getUser] Usuarios encontrados, retornando 200');
    return handleSuccess(res, 200, "Usuarios encontrados", users);
  } catch (error) {
    console.error('[getUser] Error en try-catch:', error);
    return handleErrorServer(
      res,
      500,
      error.message,
    );
  }
}

module.exports = { getUser };