const express = require('express');
const routes = require('./routes');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const sendMail = require('../public/js/enviarCorreo');

const app = express();


//Puerto
const PORT = process.env.PORT || 5000;

// Habilitar pug
app.set('view engine', 'pug');

//Middleware 
app.use(session({
    secret: 'Portafolio',
    resave: true,
    saveUninitialized: true
}))

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-message')(req, res);
    next();
});

// Añadir las vistas
app.set('views', path.join(__dirname, './views'));

// Cargar carpeta sestatica public
app.use(express.static('public'));

// Muestra el año actual
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;

    return next();
});

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use('/', routes());

app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});

// app.post('/mail', (req, res)=>{
//     const {nombre, apellido, email, text} = req.body;
//     const subject = `${nombre} ${apellido}`;

//     sendMail(email, subject, text, function(err, data){
//         if(err){
//             res.status(500).json({message: 'Internal Error'})
//         }else{
//             res.json({message: 'Email sent!'})
//         }
//     })
// })

app.post('/mail', (req, res) => {
    const { nombre, apellido, email, text } = req.body;
    const subject = `${nombre} ${apellido}`;
    sendMail(email, subject, text, function (error, data) {
        console.log(error);
        if (error) {
            res.status(500).json({ message: 'Internal Server Error' })
        } else {
            res.json({ message: 'Email sent!' });
        }
    });
});