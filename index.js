var express = require('express');
var app = express();
const path = require ('path')

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
    res.status(403).send("Otroalgo")
})

app.patch ('/unomas', (req, res) => {
    res.status(265).send("Y este es el último :D")
})

app.listen(3000, function () {
        console.log('Corriendo :)');
      });


      