const jwt = require("jsonwebtoken");
const Holder = require("../models/holders");

const generarJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
};

const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const holder = await Holder.findById(id); 

        if (!holder) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        if (holder.state === 0) {
            return res.status(401).json({
                msg: 'Cuenta inactiva'
            });
        }

        next(); 
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
};

module.exports = {
    generarJWT, 
    validarJWT
};
