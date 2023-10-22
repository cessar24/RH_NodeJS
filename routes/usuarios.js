const express = require('express');
const usuarios = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/database');

usuarios.post("/signin", async (req, res, next) => {
    const { Nombre, Apellido, Correo, Contraseña } = req.body;

    if(IdEmpleado && Nombre && Apellido && Correo && Contraseña){
        let query = "INSERT INTO usuarios(Nombre, Apellido, Correo, Contraseña) ";
        query += `VALUES ('${Nombre}','${Apellido}','${Correo}', '${Contraseña}')`;
        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(201).json({ code: 201, message: "Usuario registrado correctamente"});
        }
     return res.status(500).json({ code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

usuarios.post("/login", async (req, res, next) => {
    const {Correo, Contraseña} = req.body;
    const query = `SELECT * FROM usuarios WHERE correo = '${Correo} AND contraseña = '${Contraseña}';`;
    const rows = await db.query(query);

    if(Correo && Contraseña){
        if(rows.lenght == 1){
            const token = jwt.sign({
                IdUsuario: rows[0].IdUsuario,
               Correo: rows[0].Correo
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token });
        }
        else{
            return res.status(200).json({ code: 401, message: "Usuario y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

usuarios.get("/", async (req, res, next) => {
    const query = "SELECT * FROM usuarios";
    const rows = await db.query(query);
    
    return res.status(200).json({ code: 200, message: rows});
});

module.exports = usuarios;
