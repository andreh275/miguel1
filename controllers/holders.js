const mongoose = require("mongoose"); // Corregido
const Holder = require("../models/holders");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../middleware/validar-jwt");

const httpHolder = {
  postLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const holder = await Holder.findOne({ email });
      console.log("Holder encontrado:", holder);
      if (!holder) {
        return res.status(400).json({ msg: "Credenciales incorrectas email" });
      }
      if (holder.state === 0) {
        return res.status(400).json({ msg: "Cuenta inactiva" });
      }

      const valiPassword = bcrypt.compareSync(password, holder.password);
      console.log("Contraseña recibida:", password);
      console.log("Contraseña almacenada (hasheada):", holder.password);
      console.log("Contraseña validada:", valiPassword);
      if (!valiPassword) {
        return res.status(400).json({ msg: "Credenciales incorrectas by:" });
      }
      let token = await generarJWT(holder._id);
      res.json({ holder, token });
    } catch (error) {
      console.error("Error en postLogin:", error);
      return res.status(500).json({ msg: "Error en el servidor" });
    }
  },
  
  getListarHolders: async (req, res) => {
    try {
      const holders = await Holder.find();
      res.json({ holders });
    } catch (error) {
      res.status(400).json({ error: "Operación no se realizó correctamente" });
    }
  },

  getListarId: async (req, res) => {
    try {
      const { id } = req.params;
      const holderId = await Holder.findById(id);
      if (!holderId) {
        return res.status(404).json({ error: "Holder no encontrado" });
      }
      res.json({ holderId });
    } catch (error) {
      res.status(400).json({ error: "Operación no se realizó correctamente" });
    }
  },

  postHolder: async (req, res) => {
    try {
      const {
        email,
        password,
        document,
        name,
        rol,
        ficha,
        photo,
        phone,
        state,
      } = req.body;

      const existingHolder = await Holder.findOne({ email });
      if (existingHolder) {
        return res.status(400).json({ msg: "El correo ya está registrado" });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const newHolder = new Holder({
        email,
        password: hashedPassword,
        document,
        name,
        rol,
        ficha,
        photo,
        phone,
        state,
      });
      await newHolder.save();
      res.json({ newHolder });
    } catch (error) {
      res.status(400).json({ error: "Operación no se realizó correctamente" });
      console.log(error);
    }
  },

  putModificarHolder: async (req, res) => {
    try {
      const { id } = req.params;
      const { email, password, document, name, rol, ficha, photo, state } =
        req.body;

      let updatedData = { email, document, name, rol, ficha, photo, state };
      if (password) {
        updatedData.password = bcrypt.hashSync(password, 10);
      }

      const holderModificado = await Holder.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      if (!holderModificado) {
        return res.status(404).json({ error: "Holder no encontrado" });
      }
      res.json({ holderModificado });
    } catch (error) {
      res.status(400).json({ error: "Operación no se realizó correctamente" });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const holdersA = await Holder.findByIdAndUpdate(id, { state: 1 });
      res.json({ holdersA });
    } catch (error) {
      res.status(400).json({ error: "Operación no se realizó correctamente" });
      console.log(error);
    }
  },

  putInactivarHolder: async (req, res) => {
    try {
      const { id } = req.params;
      const holderIn = await Holder.findByIdAndUpdate(id, { state: 0 });
      if (!holderIn) {
        return res.status(404).json({ error: "Holder no encontrado" });
      }
      res.json({ holderIn });
    } catch (error) {
      res.status(400).json({ error: "la Operación no se realizó correctamente" });
      console.log(error);
    }
  },
};

module.exports = httpHolder;
