const pool = require("../config/database");

const model = {};

model.ValidarPais = async (CodiPais) => {
  const sql = `Select count(codigoPais) as Existe FROM paises WHERE codigoPais = '${CodiPais}'`;
  const result = await pool.query(sql);

  if (result[0].Existe > 0) {
    return true;
  } else {
    return false;
  }
};

model.ValidarCorreo = async function (correo) {
  const sql = `Select count(email) as Existe FROM usuarios WHERE email = '${correo}'`;
  const result = await pool.query(sql);
  if (result[0].Existe > 0) {
    return true;
  } else {
    return false;
  }
};

model.ValidarUser = async function (email) {
  try {
    const sql = `SELECT idUsuarios,idRol,nombre,apellidos,email,genero,password,usuario FROM usuarios where email = '${email}'`;

    const result = await pool.query(sql);

    return result;
  } catch (err) {
    return {
      error: true,
      mensaje: `Hubo un error al validar el usuario en el Model: ModelLogin, en la funcion: ValidaUser. ERROR: ${err.sqlMessage} `,
    };
  }
};

model.findUserById = async function (data) {
  const sql = `SELECT * FROM usuarios where idUsuarios = ${data.id}`;
  const result = pool.query(sql);
  return result;
};

model.ValidaLiga = async function (params) {
  try {

    const sql = `SELECT count(nombreLiga) FROM ligas where nombreLiga = '${params.nombreLiga}' and codiPais = '${params.CodiPais}'`;

    const result = await pool.query(sql);

    if (result[0].Existe > 0) {
      return true;
    } else {
      return false;
    }

  } catch (err) {
    return {
      error: true,
      mensaje: `Hubo un error al validar la liga en el Model: Validation Model, en la funcion: ValidaLiga. ERROR: ${err.sqlMessage} `,
    };
  }
};

module.exports = model;
