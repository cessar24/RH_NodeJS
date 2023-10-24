const express = require('express');
const empleados = express.Router();
const db = require('../config/database');

empleados.post("/Registrar", async (req, res, next) => {
    const {Nombre, Apellido, Correo, Telefono, Direccion } = req.body;
    
    if( Nombre && Apellido && Telefono && Correo &&  Direccion ){
        let query = "INSERT INTO empleados(Nombre, Apellido, Telefono, Correo, Direccion )";
        query += ` VALUES('${Nombre}', '${Apellido}', '${Telefono}', '${Correo}', '${Direccion}')`;

        const rows = await db.query(query);
        console.log(rows);
        if(rows.affectedRows == 1){
            return res.status(201).json({ code: 201, message:"Empleado insertado correctamente"});
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

empleados.delete("/:id([0-9]{1,5)", async (req, res, next) => {
    const query = `DELETE FROM empleados WHERE IdEmpleado = '${req.params.id}'`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({ code: 200, message: "Empleado borrado correctamente"});

    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado"});
});

empleados.put("/:id([0-9]{1,5})", async (req, res, next) =>{
    const {Nombre, Apellido,Telefono, Correo, Direccion } = req.body;

    if( Nombre && Apellido && Telefono && Correo &&  Direccion  ){
        let query = `UPDATE empleados SET Nombre ='${Nombre}', Apellido =${Apellido},`;
        query += `Telefono =${Telefono}, Correo =${Correo} WHERE IdEmpleado=${req.params.id};`;

        const rows = await db.query(query);
        console.log(rows);
        if(rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message:"Datos del empleado actualizados correctamente"});
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

empleados.patch("/:id([0-9]{1,3})", async (req, res, next) =>{
    if(req.body.pok_name){
        let query = `UPDATE empleados SET Nombre='${req.body.pok_name}' WHERE IdEmpleado=${req.params.id}`;
        const rows = await db.query(query);
        console.log(rows);

        if(rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message:"Datos del empleado actualizados correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message:"Campos incompletos"});
});

empleados.get('/Empleados', async (req, res, next) => {
    const empld = await db.query("SELECT * FROM empleados");
    return res.status(200).json({ code: 1, message: empld });
});

empleados.get("/:id([0-9]{1,5})", async (req, res, next) => {
    const Id = req.params.id;
    console.log(Id+"estas en el buscador")
    if (Id >= 1 && Id <= 10000) {
        const empld = await db.query("SELECT * FROM empleados WHERE IdEmpleado='"+Id+"';");
        return res.status(200).json({ code: 200, message: empld });
    }
    return res.status(404).send({code: 404, message: "Empleado no encontrado" });
});

empleados.get('/:name([A-Za-z]+)', async(req, res, next) =>{
    const nomb = req.params.name;
    const empld = await db.query("SELECT * FROM empleados WHERE Nombre ='"+nomb+"';");
    if (empld.length > 0) {
        return res.status(200).json({ code: 200, message: empld });
    }
    return res.status(404).send({code: 404, message: "Empleado no encontrado" });
});

module.exports = empleados;
