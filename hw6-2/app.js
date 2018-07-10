require('../util/mongoConn')('test', exec);

function exec(db) {
    const aggregate = [
        { $match: { 'scores.type': 'homework' } },
        { $unwind: '$scores' },
        {
            $group: {
                _id: '$class_id',
                average: { $avg: '$scores.score' }
            }
        },
        { $sort: { average: -1 } }
    ];

    db.collection('grades').aggregate(aggregate, (err, result) => {
        if (err) throw Error('Ocorreu algum problema - ' + err);
        console.log(result);
        db.close();
    });
}