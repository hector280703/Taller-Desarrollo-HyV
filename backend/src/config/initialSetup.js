"use strict";
const UserSchema = require("../entity/user.entity.js");
const { getAppDataSource } = require("./configDB");

async function createUsers() {
    try {
        const AppDataSource = getAppDataSource();
        const userRepository = AppDataSource.getRepository(UserSchema);
        const count = await userRepository.count();
        if (count > 0) return; // Si ya hay usuarios, no hacer nada

        const users = [
            {
                nombreCompleto: "Héctor Bastián Díaz Fernández",
                email: "hectorbastian2003@gmail.com",
                password: "admin123",
                rol: "admin",
            },
            {
                nombreCompleto: "Juan Eduardo Hidalgo Perez",
                email: "ejemplo@gmail.com",
                password: "admin123",
                rol: "admin",
            },
        ];

        for (const u of users) {
            await userRepository.save(userRepository.create(u));
        }
        console.log("Usuarios iniciales creados.");
    } catch (error) {
        console.error("Error al crear usuarios iniciales:", error);
    }
}

module.exports = { createUsers };