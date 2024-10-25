const {Router} = require("express")
const {check} = require("express-validator")
const {helperLaptop} = require("../helpers/laptops")
const httpLaptop = require("../controllers/laptops")
const { validarCampos } = require("../middleware/validar_datos")

const router = Router()

router.get("/", httpLaptop.getListarLaptops)

router.get("/:id",[
        check("holder","Id no valido").isMongoId(), 
        check("holder","no existe en la base de datos").custom(helperLaptop.validarId)
], httpLaptop.getListarId)

router.post("/",[
        check("holder","Id no valido").isMongoId(), 
        check("holder","no existe en la base de datos").custom(helperLaptop.validarId),
        check("serial", "El serial es obligatorio").notEmpty(),
        check("qrcode", "El qrcode es obligatorio").notEmpty(),
        check("qrcode", "El qrcode debe ser unico").custom(helperLaptop.validarQRCode),  
        validarCampos  
], httpLaptop.postLaptop)

router.put("/:id",[
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la base de datos").custom(helperLaptop.validarId)
], httpLaptop.putLaptop)

router.put("/inactivar/:id",[
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la base de datos").custom(helperLaptop.validarId)
], httpLaptop.putInactivarLaptop)

router.put("/activar/:id",[
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la base de datos").custom(helperLaptop.validarId)
], httpLaptop.putInactivarLaptop)

router.put("/qrcode/:id",[
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la base de datos").custom(helperLaptop.validarId)
], httpLaptop.putQRCode)

module.exports = router