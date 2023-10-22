const express = require('express');
const recursosH = express.Router();
const db = require('../config/database');

recursosH.post("/", async (req, res, next) => {
    const {Nombre, Apellido, Telefono, Correo, Direccion } = req.body;
    
    if( Nombre && Apellido && Telefono && Correo &&  Direccion ){
        let query = "INSERT INTO empleado(Nombre, Apellido, Telefono, Correo, Direccion )";
        query += ` VALUES('${Nombre}', ${Apellido}, ${Telefono}, ${Correo}, ${Direccion})`;

        const rows = await db.query(query);
        console.log(rows);
        if(rows.affectedRows == 1){
            return res.status(201).json({ code: 201, message:"Empleado insertado correctamente"});
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

recursosH.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM empleado WHERE IdEmpleado = ${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({ code: 200, message: "Empleado borrado correctamente"});

    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado"});
});

recursosH.put("/:id([0-9]{1,3})", async (req, res, next) =>{
    const {Nombre, Apellido,Telefono, Correo, Direccion } = req.body;

    if( Nombre && Apellido && Telefono && Correo &&  Direccion  ){
        let query = `UPDATE empleado SET Nombre ='${Nombre}', Apellido =${Apellido},`;
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

recursosH.patch("/:id([0-9]{1,3})", async (req, res, next) =>{
    if(req.body.pok_name){
        let query = `UPDATE empleado SET Nombre='${req.body.pok_name}' WHERE IdEmpleado=${req.params.id}`;
        const rows = await db.query(query);
        console.log(rows);

        if(rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message:"Datos del empleado actualizados correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message:"Campos incompletos"});
});

recursosH.get('/', async (req, res, next) => {
    const empld = await db.query("SELECT * FROM empleados");
    return res.status(200).json({ code: 1, message: empld });
});

recursosH.get('/:id ([0-9]{1,3})', async (req, res, next) => {
    const idEmp = req.params.id;
    if (idEmp >= 1 && idEmp <= 10000) {
        const empld = await db.query("SELECT * FROM empleado WHERE IdEmpleado="+id+";");
        return res.status(200).json({ code: 200, message: empld });
    }
    return res.status(404).send({code: 404, message: "Empleado no encontrado" });
});

recursosH.get('/:name([A-Za-z]+)', async(req, res, next) =>{
    const name = req.params.name;
    const empld = await db.query("SELECT * FROM empleado WHERE Nombre ='"+name+"';");
    if (empld.length > 0) {
        return res.status(200).json({ code: 200, message: empld });
    }
    return res.status(404).send({code: 404, message: "Empleado no encontrado" });
});

module.exports = recursosH;
