const { connect, set } = require("mongoose");

const connectionDB = () => {
    connect(
        'mongodb://127.0.0.1:27017/myapp',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err) => {
            if (!err) {
                console.log("***Conexion exitosa***");
            } else {
                throw new Error("***Error de conexion***");
            }
        }
    );
};

set('strictQuery', false);
module.exports = { connectionDB };