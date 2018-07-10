require('../util/mongoConn')('crunchbase', exec);

function exec(db) {
    const aggregate = [
        { $match: { founded_year: 2004 } },
        {
            $project: {
                _id: 0,
                name: 1,
                founded_year: 1,
                funding_rounds: 1,
                total_rounds: {
                    $size: '$funding_rounds'
                }
            }
        },
        { $match: { total_rounds: { $gte: 5 } } },
        { $unwind: '$funding_rounds' },
        { $group: { _id: '$name', average: { $avg: '$funding_rounds.raised_amount' } } },
        { $sort: { average: 1 } }
    ];

    db.collection('companies').aggregate(aggregate, (err, result) => {
        if (err) throw Error('Ocorreu algum problema - ' + err);
        console.log(result);
        db.close();
    });
}