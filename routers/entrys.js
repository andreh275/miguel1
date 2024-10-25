const { Router } = require("express");
const { check } = require("express-validator");
const entryController = require("../controllers/entrys");
const { validarCampos } = require("../middleware/validar_datos");

const router = Router();

router.post("/", [
    check("holder", "Id no valido").isMongoId(),
    check("holder", "no existe en la bd").custom(entryController.validarHolder),
    check("date", "la fecha es obligatoria").notEmpty(),
    check("date", "la fecha debe ser unica").custom(entryController.validarDate),
    check("time", "la hora es obligatoria").notEmpty(),
    check("time", "la hora debe ser unica").custom(entryController.validarTime),
    check("state", "el estado es obligatorio").notEmpty(),
    validarCampos
], entryController.postEntry);

router.get("/", entryController.getlistarEntrys);

router.get("/holder/:id", [
    check("id", "Id no valido").isMongoId(),
    check("id", "no existe en la bd").custom(entryController.validarHolder)
], entryController.getListarporHolder);

router.get("/dia", entryController.getListarporDia);

router.get("/fecha", entryController.getListarentryEntreFechas);

router.put("/salida/:id", [
    check("id", "Id no valido").isMongoId(),
    check("holder", "no existe en la bd").custom(entryController.validarHolder)
], entryController.putRegistrarEntradaOutput);

module.exports = router;
