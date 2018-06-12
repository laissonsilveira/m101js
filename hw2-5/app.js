require('../util/mongoConn')('video', exec);

function exec(db) {
    const filter = {
        genres: {
            $all: ['Comedy', 'Crime']
        }
    };
    db.collection('movieDetails').count(filter, (err, count) => {
        if (err) throw Error('Ocorreu algum problema ao listar os filmes cadastrados');
        console.log(count);
        db.close();
    });
}