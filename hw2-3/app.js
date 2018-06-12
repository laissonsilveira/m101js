require('../util/mongoConn')('video', exec);

function exec(db) {
    const filter = {
        'countries.1': 'Sweden'
    };
    db.collection('movieDetails').count(filter, (err, count) => {
        if (err) throw Error('Ocorreu algum problema ao listar os filmes cadastrados');
        console.log(count);
        db.close();
    });
}