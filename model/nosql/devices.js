const { Schema, model } = require("mongoose");

const DeviceSchema = Schema(
  {
    ip: {
      type: String,
      required: true,
      unique: true,
    },
    hostname: {
      type: String,
      unique: true,
      required: true,
    },
    device: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    co: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    providers: {
      type: String,
      required: true,
    },
    fecha_ingreso: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
    fecha_baja: {
      type: String,
    },
    discoduro: {
      type: String,
    },
    ram: {
      type: Number,
    },
    procesador: {
      type: String,
    },
    so: {
      type: String,
    },
    antivirus: {
      type: String,
    },

    licencias: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("devices", DeviceSchema);
