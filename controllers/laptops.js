const Laptop = require("../models/laptops");
const QRCode = require('qrcode');



const httpLaptop = {
    getListarLaptops: async (req, res) => {
        try {
            const laptops = await Laptop.find();
            res.json({ laptops });
        } catch (error) {
            res.status(400).json({ error: "operación no pudo ser realizada correctamente" });
        }    
    },  

    getListarId: async (req, res) => {
        try {
            const { id } = req.params;
            const laptopId = await Laptop.findById(id);
            res.json({ laptopId });
        } catch (error) {
            res.status(400).json({ error: "operación no pudo ser realizada correctamente" });
        }
    },  

    postLaptop: async (req, res) => {
        try {
            const { holder, serial, qrcode, state, observations } = req.body;
            const newLaptop = new Laptop({  holder, serial, qrcode, state, observations });
            await newLaptop.save();
            res.json({ newLaptop });
        } catch (error) {
            res.status(400).json({ error: "operación no pudo ser realizada correctamente" });
        }
    },

    putLaptop: async (req, res) => {
        try {
            const { id } = req.params;
            const { holder, serial, qrcode, state, observations } = req.body;
            const laptopModificado = await Laptop.findByIdAndUpdate(id, { holder, serial, qrcode, state, observations });
            res.json({ laptopModificado });
        } catch (error) {   
            res.status(400).json({ error: "operación no pudo ser realizada correctamente" });
        }
    },
    putInactivarLaptop: async (req, res) => {
        try {
            const { id } = req.params;
            const laptopA = await Laptop.findByIdAndUpdate(id, { state: 1 });
            res.json({ laptopA });
        } catch (error) {
            res.status(400).json({ error: "operación no pudo ser realizada correctamente" });
        }
    },
    putInactivarLaptop: async (req, res) => {
        try {
            const { id } = req.params;
            const laptopIn = await Laptop.findByIdAndUpdate(id, { state: 0 });
            res.json({ laptopIn });
        } catch (error) {
            res.status(400).json({ error: "operación no pudo ser realizada correctamente" });
        }
    },

    putQRCode: async (req, res) => {
        const { id } = req.params;
        
        try {
            const laptop = await Laptop.findById(id);
            if(!laptop) {
                return res.status(404).json({ error: 'Laptop no encontrada' });
            }

            const qrcode = await QRCode.toDataURL(laptop.serial);
            laptop.qrcode = qrcode;

            await laptop.save();

            res.json({ qrcode });
        } catch (error) {
            res.status(500).json({ error: 'Error al intentar generar el código QR' });
        }    
    }
};

module.exports = httpLaptop