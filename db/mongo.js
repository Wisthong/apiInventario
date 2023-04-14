const { connect, set } = require("mongoose");

const connectionDB = () => {
  try {
    connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("***Conexion exitosa***");
  } catch (error) {
    throw new Error("***Error de conexion***");
  }
};

set("strictQuery", false);
module.exports = { connectionDB };
