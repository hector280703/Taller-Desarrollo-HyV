"use strict";
const UserSchema = require("../entity/user.entity.js");
const { AppDataSource } = require("../config/configDB.js");

async function getUserService(query){
    try {
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

module.exports = { getUserService };