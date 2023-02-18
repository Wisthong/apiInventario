const { Schema, model } = require("mongoose");

const DeviceSchema = Schema(
  {
    device: {
      type: String,
      required: true,
    },
    hostname: {
      type: String,
      unique: true,
      required: true,
    },
    so: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
      unique: true,
    },
    antivirus: {
      type: String,
      required: true,
    },
    fecha_ingreso: {
      type: String,
      required: true,
    },
    fecha_baja: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
    },
    estado: {
      type: ["Activo", "Inactivo", "Mantenimiento"],
      default: ["Activo"],
    },
    licencias: {
      type: String,
      required: true,
    },
    ram: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    procesador: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("devices", DeviceSchema);
