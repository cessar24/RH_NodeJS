const express = require('express');
const user = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/database');

user.post("/signin", async (req, res, next) => {
    const { user_name, user_surnames, user_tel, user_mail, user_password, user_direcc, type_Uss } = req.body;

    if(user_name && user_surnames && user_mail && user_password){
        let query = "INSERT INTO user(user_name, user_surnames, user_tel, user_mail, user_password, user_direcc, type_Uss) ";
        query += `VALUES ('${user_name}','${user_surnames}','${user_tel}', '${user_mail}', '${user_password}', '${user_direcc}', '${type_Uss}',)`;
        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(201).json({ code: 201, message: "usuario registrado correctamente"});
        }
     return res.status(500).json({ code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

user.post("/login", async (req, res, next) => {
    const {user_mail, user_password} = req.body;
    const query = `SELECT * FROM user WHERE user_mail = '${user_mail} AND user_password = '${user_password}';`;
    const rows = await db.query(query);

    if(user_mail && user_password){
        if(rows.lenght == 1){
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token });
        }
        else{
            return res.status(200).json({ code: 401, message: "usuario y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({ code: 500, message: "campos incompletos"});
});

user.get("/", async (req, res, next) => {
    const query = "SELECT * FROM user";
    const rows = await db.query(query);
    
    return res.status(200).json({ code: 200, message: rows});
});

module.exports = user;