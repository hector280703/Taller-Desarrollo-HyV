import {
  getUserService,
  updateUserService,
  deleteUserService
} from "../services/user.service.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlres.js";

export async function getUser(req, res) {
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
    return handleErrorServer(res, 500, error.message);
  }
}

export async function updateUser(req, res) {
  try {
    const query = req.query;
    const body = req.body;

    const [updatedUser, errorUpdate] = await updateUserService(query, body);
    if (errorUpdate) {
      return handleErrorClient(res, 400, errorUpdate);
    }

    return handleSuccess(res, 200, "Usuario actualizado con éxito", updatedUser);
  } catch (error) {
    return handleErrorServer(res, 500, "Error al actualizar el usuario");
  }
}

export async function deleteUser(req, res) {
  try {
    // Obtener id de query params o route params
    const query = {
      id: req.query.id || req.params.id,
      email: req.query.email
    };
    
    const [result, errorDelete] = await deleteUserService(query);

    if (errorDelete) {
      return handleErrorClient(res, 400, errorDelete);
    }
    
    return handleSuccess(res, 200, "Usuario eliminado con éxito", result);
  } catch (error) {
    console.error('Error en deleteUser:', error);
    return handleErrorServer(res, 500, "Error al eliminar el usuario");
  }
}