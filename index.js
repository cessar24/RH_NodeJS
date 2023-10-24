//dependencies
const morgan = require('morgan');
const express = require('express');
const app = express();
//routes
const empleados = require('./routes/empleados');
const usuarios = require('./routes/usuarios');
//middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);

app.use("/usuarios", usuarios);
app.use("/empleados", empleados);
app.use(auth);


app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log("server is runing...");
});
