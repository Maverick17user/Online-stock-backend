const CompanyAdmin = require('../models/CompanyAdminModel');
const bcrypt = require('bcryptjs');
const validateAdminInput = require('../validation/adminValidation');

exports.getStatistic = (req, res) => {

    CompanyAdmin.aggregate(
        [

            {
                $lookup: {
                    from: "companyadmins",
                    pipeline: [
                        {$match:{
                            "createDate":{$gte: new Date(req.body.from), $lt: new Date(req.body.to)}
                        }},

                    ],
                    as: "created"
                }
            },

            {
                $lookup: {
                    from: "companyadmins",
                    pipeline: [
                        {$match:{
                                "deleteDate":{$gte: new Date(req.body.from), $lt: new Date(req.body.to)}
                            }},

                    ],
                    as: "deleted"
                }
            },

        ]).then(result => {

        const {created, deleted} = result[0];

        let max=0;
        if(created.length>deleted.length){
            max=created.length*2
        }

        else max=deleted.length*2

        const statistic={
            created:[created.length,max,0],
            deleted:[deleted.length,max,0]
        };

        res.json(statistic)

    })
};


exports.addAdmin = (req, res) => {

    const {errors, isValid} = validateAdminInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    CompanyAdmin.findOne({
        email: req.body.email
    }).then(admin => {
        if (admin) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        } else {

            const newCompanyAdmin = new CompanyAdmin({
                role: req.body.role,
                company: req.body.company,
                email: req.body.email,
                password: req.body.password,
                active: true,
                deleteDate: '2050-08-18T21:11:54'
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newCompanyAdmin.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newCompanyAdmin.password = hash;
                            newCompanyAdmin
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
            res.json(admin)
        }
    });
}