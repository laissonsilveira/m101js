require('../util/mongoConn')('crunchbase', exec);

function exec(db) {
    const aggregate = [
        { $match: { 'relationships.person.permalink': 'eric-di-benedetto' } },
        { $unwind: '$relationships' },
        { $match: { 'relationships.person.permalink': 'eric-di-benedetto' } },
        {
            $group: {
                _id: '$relationships.person.permalink',
                companies: { $addToSet: '$name' },
                totalCompanies: { $sum: 1 }
            }
        },
        { $project: { _id: 1, companies: 1, totaUniqueCompanies: { $size: '$companies' } } },
    ];

    db.collection('companies').aggregate(aggregate, (err, result) => {
        if (err) throw Error('Ocorreu algum problema - ' + err);
        console.log(result);
        db.close();
    });
}