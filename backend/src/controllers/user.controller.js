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
    
    
    const [users, errorUsers] = await getUserService();
    

    if (errorUsers) {
      
      return handleErrorClient(res, 404, errorUsers);
    }

    if (!users || users.length === 0) {
      
      return handleSuccess(res, 200, "No hay usuarios registrados", []);
    }

    
    return handleSuccess(res, 200, "Usuarios encontrados", users);
  } catch (error) {
    
    return handleErrorServer(
      res,
      500,
      error.message,
    );
  }
}

module.exports = { getUser };