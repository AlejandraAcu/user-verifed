const catchError = require('../utils/catchError');
const { getAllServices, createServices, deleteServices, getOneServices, updateServices } = require('../services/user.services');

const getAll = catchError(async(req, res) => {
    const results = await getAllServices();
    return res.json(results);
});

const create = catchError(async(req, res, next) => {
    const result = await createServices({...req.body, password: req.hashPassword});
    req.result = result
    
    next()
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await getOneServices(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await deleteServices(id)
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;

    //No sé puede editar, no aparece en actualizar
    const fieldToDelete = ['password', 'email', 'isVerified']

    fieldToDelete.forEach(field => {
        delete req.body[field]
    });
    //Hasta aqui va el codigo.
    
    const result = await updateServices(req.body, id);
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {

    const user = req.userlogged
    const token = req.token
    return res.json({user, token})
})

const logged = catchError(async(req,res) =>{
    const user = req.user
    return res.json(user)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    logged
}