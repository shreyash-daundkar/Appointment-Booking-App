const users = require('../models/users');

exports.display = async (req, res, next) => res.json(await users.findAll());

exports.add = async (req, res, next) => res.json(await users.create(req.body));

exports.edit = async (req, res, next) => {
    const user = await users.findByPk(req.params.id);
    user.name = req.body.name;
    user.email = req.body.email;
    user.save();
    res.json();
}

exports.delete = async (req, res, next) => {
    const user = await users.findByPk(req.params.id);
    user.destroy();
    res.json();
}