const Entry = require("../models/entrys");

const helperEntry = {

    validarHolder: async (id) => {

        const entry = await Entry.findById(id);
        if (!entry) {
            throw new Error("Id no existe");
        }
     
    },

    validarDate: async (date) => {
        const entry = await Entry.find({date});
        if (entry.length > 0) {
            throw new Error("la fecha ya existe");
        }
    },

    validarTime: async (time) => {
        const entry = await Entry.find({time});
        if (entry.length > 0) {
            throw new Error("la hora ya existe");
        }
    },

}

module.exports = helperEntry;