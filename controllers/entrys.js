const Entry = require("../models/entrys");
const { put } = require("../routers/holders");
const { putQRCode } = require("./laptops");

const httpEntry = {
    // Método que guarda una nueva entrada en la base de datos
    postEntry: async (req, res) => {
        try {
            const { laptop, holder, entrytime, checkout, type } = req.body;
            const newEntry = new Entry({
                laptop,
                holder,
                entrytime,
                checkout,
                type
            });
            await newEntry.save();
            res.json({ newEntry });
        } catch (error) {
            res.status(400).json({ error: "Error al registrar la entrada. Inténtalo de nuevo." });
        }
    },

    // Obtiene todas las entradas asociadas a un "holder" específico
    getListarporHolder: async (req, res) => {
        try {
            const { holder } = req.params;
            const entries = await Entry.find({ holder });
            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "No se pudieron obtener las entradas para este titular." });
        }
    },

    // Filtra las entradas según la fecha de entrada proporcionada
    getListarporDia: async (req, res) => {
        try {
            const { entrytime } = req.params;
            const entries = await Entry.find({ entrytime });
            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "Hubo un problema al buscar las entradas por fecha." });
        }
    },

    // Recupera todas las entradas registradas
    getlistarEntrys: async (req, res) => {
        try {
            const entries = await Entry.find();
            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "Error al recuperar la lista de entradas." });
        }
    },

    // Busca las entradas entre dos fechas específicas
    getListarentryEntreFechas: async (req, res) => {
        try {
            const { entrytime, checkout } = req.params;
            const entries = await Entry.find({ entrytime, checkout });
            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "No se pudieron obtener las entradas para el rango de fechas." });
        }
    },

    // Actualiza una entrada con la información de salida y tipo
    putRegistrarEntradaOutput: async (req, res) => {
        try {
            const { id } = req.params;
            const { checkout, type } = req.body;
            const entryModificado = await Entry.findByIdAndUpdate(id, { checkout, type });
            res.json({ entryModificado });
        } catch (error) {
            res.status(400).json({ error: "No fue posible actualizar la entrada." });
        }
    },
};

module.exports = httpEntry;