const users = require('../models/users');

exports.display = async (req, res, next) => res.json(await users.findAll());
exports.add = async (req, res, next) => res.json(await users.create(req.body));
// exports.edit = async (req, res, next) => {
//     const user = users.findByPk(res.params.id);
    
// }
// exports.delete = async (req, res, next) => res.json(await users.findAll());