const Holder = require("../models/holders");

const helperHolder = {
    validarEmail: async (email)=> {
        const existe = await Holder.findOne({email})
        if(existe){
            throw new Error("el email ya existe");
            
        }
    },

    validarDocument: async (document)=> {
            const existe = await Holder.findOne({document})
            if(existe){
                throw new Error("el documento ya existe");
                
            }
    },

    validarId: async (id) => {
        const existe = await Holder.findById(id)
        if(!existe){
            throw new Error("Id no existe");
            
        }
    }
}

module.exports = {helperHolder}