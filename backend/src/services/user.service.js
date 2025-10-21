import UserSchema from "../entity/user.entity.js";
import { getAppDataSource } from "../config/configDB.js";

export async function getUserService(){
    try {
        const AppDataSource = getAppDataSource();
        const userRepository = AppDataSource.getRepository(UserSchema);

        const users = await userRepository.find();

        if (!users || users.length === 0) return [null, "No hay usuarios registrados"];

        const usersData = users.map(({password, ...user}) => user);

        return [usersData, null];

    } catch (error) {
        console.error("Error al obtener a los usuarios:", error);
        return [null, "Error al obtener a los usuarios"];
    }    
}

export async function updateUserService(query, body) {
    try {
        const {id, email} = query;

        const AppDataSource = getAppDataSource();
        const userRepository = AppDataSource.getRepository(UserSchema);

        let userFound;
        if (id) {
            userFound = await userRepository.findOne({
                where: { id: parseInt(id) }
            });
        } else if (email) {
            userFound = await userRepository.findOne({
                where: { email: email }
            });
        }

        if (!userFound) return [null, "Usuario no encontrado"];

        const existingUser = await userRepository.findOne({
            where: {email: body.email}
        });

        if (existingUser && existingUser.id !== userFound.id) {
            return [null, "El email ya está en uso por otro usuario"];
        }

        const dataUserUpdated = {
            nombreCompleto: body.nombreCompleto,
            email: body.email,
            rol: body.rol,
            updatedAt: new Date(),
        };

        await userRepository.update({id: userFound.id}, dataUserUpdated);

        const updatedUser = await userRepository.findOne({
            where: {id: userFound.id}
        });

        if (!updatedUser){
            return [null, "Usuario no encontrado tras la actualización"];
        }

        const {password, ...userData} = updatedUser;

        return [userData, null];

    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return [null, "Error interno en el servidor"];
    }
}

export async function deleteUserService(query) {
    try {
        const id = query?.id;
        const email = query?.email;

        const AppDataSource = getAppDataSource();
        const userRepository = AppDataSource.getRepository(UserSchema);

        let userFound;
        if (id) {
            userFound = await userRepository.findOne({
                where: { id: parseInt(id) }
            });
        } else if (email) {
            userFound = await userRepository.findOne({
                where: { email: email }
            });
        }

        if (!userFound) return [null, "Usuario no encontrado"];

        if(userFound.rol === "admin"){
            return [null, "No se puede eliminar un usuario con rol admin"];
        }

        await userRepository.delete({id: userFound.id});

        const {password, ...userData} = userFound;

        return [userData, null];
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        return [null, "Error interno en el servidor"];
    }
}