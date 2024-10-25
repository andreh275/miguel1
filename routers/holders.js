const {Router} = require("express")
const {check} = require("express-validator")
const httpHolder = require("../controllers/holders")
const {helperHolder} = require("../helpers/holders")
const {validarCampos} = require("../middleware/validar_datos")
const {validarJWT} = require("../middleware/validar-jwt")

const router = Router()

router.get("/", httpHolder.getListarHolders)

router.post("/login",[
    check("email", "El email es obligatorio").notEmpty(),
    check("password", "La contraseña es obligatoria").notEmpty(),
], httpHolder.postLogin)

router.get("/:id", [
    validarJWT,
    check("id","Id no valido").isMongoId(), 
    check("id","no existe en la bd").custom(helperHolder.validarId)
], httpHolder.getListarId)

router.post("/", [
    check("email", "El email es obligatorio").notEmpty(),
    check("email","el email debe ser unico").custom(helperHolder.validarEmail),
    check("password", "La contraseña es obligatoria").notEmpty(),
    check("password", "la contraseña debe ser mínimo de 8 caracteres").isLength({min:8}),
    check("document", "el documento es obligatorio").notEmpty(),
    check("document", "el documento debe ser único").custom(helperHolder.validarDocument),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("rol", "El rol es obligatorio").notEmpty(),
    check("phone", "El telefono es obligatorio").notEmpty(),
    check("state", "El estado es obligatorio").notEmpty(),
    validarCampos
], httpHolder.postHolder)

router.put("/:id", [
    validarJWT,
    check("id","Id no valido").isMongoId(), 
    check("id","no existe en la bd").custom(helperHolder.validarId)
], httpHolder.putModificarHolder)

router.put("/activate/:id", [
    validarJWT,
    check("id","Id no valido").isMongoId(), 
    check("id","no existe en la bd").custom(helperHolder.validarId)
], httpHolder.putActivar)

router.put("/unactivate/:id", [
    validarJWT, 
    check("id","Id no valido").isMongoId(), 
    check("id","no existe en la bd").custom(helperHolder.validarId)
], httpHolder.putInactivarHolder)

module.exports = router