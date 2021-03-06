var express = require('express');
var app = express();
const path = require ('path')
const bodyParser= require ('body-parser') // libreria  Node.js body parsing middleware.body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.
const cookieParser= require ('cookie-parser') //

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.get('/bye', function (req, res) {
    res.send('Bye bye!');
  });

//app.use('/assets', express.static('assets')) // de este modo lee el archivo si está en el mismo directorio que tu index.
app.use('/assets', express.static(path.join(__dirname, 'assets')))

//Despues del método (app.use) viene el path ('/assets')
//ver routing en pagina de express, hay varias opciones de cómo matchear la url. 

//dos parptes fundamentales en las funcioens request (cosas relacionadas con la peticion) response (lo que nos sirve para responderle al usuario) Cualqueir metodo (get, post) va necesitar metodo, accion y 
app.get ('/algo', (req, res) => {
    res.status(404).send("error 404");
})

app.post ('/otroalgo', (req, res) => {
    res.status(404).send("Otroalgo");
})

app.patch ('/unomas', (req, res) => {
    res.status(404).send("Y este es el último :D");
})

///

//app.get('/hola', (req, res, next) => {
  //  console.log("hola")
//})

//app.use ->estamos diciendo que es u nmiddleware

app.all ('*', (req, res, next) => {
    console.log('Este es un middleware', req.path)
    next()
})

app.get('/rutarep', (req, res) => {
    res.send("Este sí se ve :D ");
})

app.get('/rutarep', (req, res) => {
    res.send("Este no se ve :() ");
})

app.get('/bai', (req, res) => {
    res.send("5, 4, 3, 2, 1, 0")
})

///
let arrlibros = [];

app.use(bodyParser.json())
app.use(cookieParser())

app.get ('/libros', (req, res) => {
    res.status(200).send({data: arrlibros});
    console.log(req.cookies);
} )

app.post('/libros', (req, res) => {
    console.log(req.body);
    if (req.body.titulo && req.body.autor) {
        arrlibros.push(req.body);
         res.status(201).send("yeii!");
     } else {
         res.status(400).send({error: "no lo hiciste bien"})
     }
});

/////////////////////////////////////////////////////


/// jwt permite agregar tokens
//jwt token decode
//no mandarlo en las cookies, mandarlo en las headers, esas sí van encriptadas
//sempre que tengamos url de autentificacion (passwords) manejarlos con post por seguridad
//usualmente lo que verifica los tokens es un middleware, debe estar despues de las funciones de autentificacion y antes de la aPi

const jwt= require ('jsonwebtoken');
const Llave = "Ya me cansé :(" 

app.post('/auth/signin', (req, res) => {
    if (!(req.body.usuario && req.body.palabramagica)){
        res.status(400).send('Ya deja de llegar aqui por favor :(')
    }
    //aqui se debe revisar si un usuario existe en la base de datos
    jwt.sign({user: req.body.usuario, theme: 'black' }, Llave, function(err, token) {
        if(err) {
            res.send(500).end('Noup');
        } else {
            res.status(200).send({token: token})
        }
    })
})

app.use ((req, res, next) => { 
    jwt.verify(req.headers.authorization, Llave, function(err, decoded) {
        if(err) {
            res.status(500).end
        } else {
            console.log('aqui sí llega')
            console.log(decoded)
            // checar ese usuario en la base datos a ver si existe
            next ()
        }
    })
})

 app.get ('/taquitos', (req, res) => {
    console.log("llego al final :D");
    res.send('Sí hay taquitos');
} )




app.listen(3000, function () {
        console.log('Corriendo :)');
      });


      