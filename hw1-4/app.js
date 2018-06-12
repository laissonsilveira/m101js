/*eslint no-console: 0 */
const express = require('express');
const app = express();
const engines = require('consolidate');
const bodyParser = require('body-parser');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

require('../util/mongoConn')('m101', exec);

function exec(db) {
    app.get('/', (req, res) => {
        console.log('Listando filmes e carregando para tela');
        db.collection('hw1_4').find({}, (err, result) => {
            if (err) throw Error('Ocorreu algum problema ao listar os filmes cadastrados');
            result.toArray().then(movies => {
                res.render('add_movie', { movies });
            });
        });
    });

    app.post('/add_movie', (req, res, next) => {
        const { title, year, imdb } = req.body;
        if (title === '' || year === '' || imdb === '') {
            next('Informe os dados do filme');
        } else {
            console.log(`Salvando filme ${JSON.stringify({ title, year, imdb })}`);
            db.collection('hw1_4').insertOne(
                { title, year, imdb },
                err => {
                    if (err) throw Error('Ocorreu algum problema ao cadastrar um novo filme');
                    res.redirect('/');
                }
            );
        }
    });

    const server = app.listen(3000, function () {
        const port = server.address().port;
        console.log(`Sistema disponível em http://localhost:${port}`);
    });
}
