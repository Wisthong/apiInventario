const { Schema, model, Types } = require("mongoose");

const mongoose_delete = require("mongoose-delete");

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
      // required: true,
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
      // required: true,
    },
    numserie: {
      type: String,
      // required: true,
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
    usuario: {
      type: Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

DeviceSchema.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "users", //TODO: Desde donde
        localField: "usuario", //TODO: Campo de referencia en el modelo actual
        foreignField: "_id", //TODO: Campo de referencia para el join tabla a juntar
        as: "userAdmin", //TODO: Apodo
      },
    },
    {
      $unwind: "$usuario",
    },
  ]);
  return joinData;
};

DeviceSchema.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "users", //TODO: Desde donde
        localField: "usuario", //TODO: Campo de referencia en el modelo actual
        foreignField: "_id", //TODO: Campo de referencia para el join tabla a juntar
        as: "userAdmin", //TODO: Apodo
      },
    },
    {
      $unwind: "$usuario",
    },
  ]);
  return joinData;
};

DeviceSchema.plugin(mongoose_delete, { overrideMethods: "all" });
module.exports = model("devices", DeviceSchema);
