var express = require('express');
var app = express();
const path = require ('path')

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.get('/bye', function (req, res) {
    res.send('Bye bye!');
  });

  //app.use(express.static(C:\Users\BM\Desktop\Weman\Semana_5\Express_Challenge\assets + '/assets'));
//app.use(express.static('assets'));

//app.use('/gatitos', express.static('assets));

//app.use('/static', express.static(path.join(__dirname, 'public')))

//app.use('/assets', express.static('assets')) // de este modo lee el archivo si está en el mismo directorio que tu index.
app.use('/assets', express.static(path.join(__dirname, 'assets')))
  


app.listen(3000, function () {
        console.log('Corriendo :)');
      });


      