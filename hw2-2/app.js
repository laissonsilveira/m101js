require('../util/mongoConn')('video', exec);

function exec(db) {
    const filter = {};

    const fields = {
        _id: 0,
        title: 1
    };
    db.collection('movieDetails').find(filter, fields).toArray((err, movies) => {
        if (err) throw Error('Ocorreu algum problema ao listar os filmes cadastrados');
        console.log(movies);
        db.close();
    });
}