
/*
    Node.js/Express for PandaCore.
    By: Erik, Ren, Matt, Carter
*/

const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('login'));

app.get('/monthly', (req,res) => res.render('monthly'));

app.get('/weekly', (req,res) => res.render('weekly'));

app.get('/daily', (req,res) => res.render('daily'));

app.get('/proposal', (req, res) => res.render('final-project-PandaCore'));


app.get('/loggedin', (req, res) => res.render('loggedin'));

app.use((req, res) => {
    res.status(404);
    res.render('404');
})

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res,render('500');
})

app.listen(port, () => console.log(
    `Express started on port http://localhost:${port}; ` +
    'press Ctrl-C to terminate....')) 