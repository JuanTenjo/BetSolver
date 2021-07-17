
const pool = require("../database");

module.exports = function () {

    async function MostrarPaises(){
        const Paises = await pool.query("SELECT PaisCodigo, PaisNombre FROM Pais")
        return Paises
    }


    async function traerUsuarios() {
        const Datos = await pool.query("SELECT us.id_usuarios, us.contra, us.email, us.nombre, us.apellido, DATE_FORMAT(us.fechanacimiento, '%Y-%m-%d') as fechanacimiento, us.id_rol, r.nombre_rol FROM usuarios as us, roles as r where us.id_rol = r.id_rol")
        return Datos
    }
    async function RegistrarUsuario(req) {
        await pool.query("INSERT INTO usuarios(contra,email,nombre,apellido,fechanacimiento) VALUES (?,?,?,?,?)", [req.pass, req.email, req.name, req.apellido, req.fechanacimiento]);

    }
    async function traerRoles() {
        const Datos = await pool.query("SELECT * FROM roles")
        return Datos
    }
    async function ActUsuario(req) {
        await pool.query("UPDATE usuarios SET contra = ?, email = ?, nombre = ?, apellido = ?, fechanacimiento = ?, id_rol = ? WHERE id_usuarios = ?", [req.passAct, req.emailAct, req.nombreAct, req.apellidoAct, req.fechanacimientoAct, req.rol, req.id_usuarios]);
    }

    async function EliminarUsuario(ID) {
        await pool.query("DELETE FROM usuarios WHERE id_usuarios = ?", [ID])
    }

    async function TraerCategorias() {
        const Datos = await pool.query("SELECT * FROM categorias")
        return Datos
    }

    async function crearCategorias(req) {
        await pool.query("INSERT INTO categorias(nombre) Values(?)", [req.nombreCategoria])
    }
    async function ActualizarCateogira(req) {
        await pool.query("UPDATE categorias SET nombre = ? WHERE idcategorias = ?", [req.nombreAct, req.idcategorias])
    }

    async function EliminarCategoria(ID) {
        await pool.query("DELETE FROM categorias where idcategorias = ? ", [ID])
    }
    async function TraerPeliculas() {
        const Peliculas = await pool.query("SELECT p.*, c.nombre as nombreCategoria, c.idcategorias FROM peliculas as p, categorias as c WHERE p.idcategorias = c.idcategorias")
        return Peliculas
    }

    async function RegistrarPeliculas(req) {
        await pool.query("INSERT INTO peliculas(idcategorias,nombre,descripcion,ulr_trailer,url_pelicula,lanzamiento,duracion,imagen,id_usuario) VALUES(?,?,?,?,?,?,?,?,?)", [req.idCategoria, req.nombrePeli, req.descripcion, req.urlTrailer, req.urlPelicula, req.lanzamiento, req.DuracionPelicula, req.urlImagen, req.id_usuario])
    }

    async function TraerPeliculaAct(ID) {
        const PeliculaAct = await pool.query("SELECT p.*, c.nombre as nombreCategoria, c.idcategorias FROM peliculas as p, categorias as c  WHERE p.idcategorias = c.idcategorias AND p.idpeliculas = ? LIMIT 1 ", [ID])
        return PeliculaAct
    }

    async function actualizarPelicula(req) {
        await pool.query("UPDATE peliculas SET idcategorias = ?, nombre = ?, descripcion = ?,ulr_trailer = ?,url_pelicula = ?,lanzamiento = ?,duracion = ?,imagen = ? WHERE idpeliculas = ?", [req.idCategoria, req.nombrePeli, req.descripcion, req.urlTrailer, req.urlPelicula, req.lanzamiento, req.DuracionPelicula, req.urlImagen, req.idpeliculas])
    }

    async function eliminarPelicula(ID) {
        await pool.query("DELETE FROM peliculas WHERE idpeliculas = ? ", [ID])
    }
    async function mostrarChat(datosChat) {
        console.log(datosChat.user1)
        const Datos = await pool.query("SELECT * FROM sms as s, chats as c where s.chat = c.id_chats and c.User1 = ? and c.User2 = ? and c.id_chats = ? order by s.fechaEnviado asc", [datosChat.user1, datosChat.user2, datosChat.chat])
        return Datos
    }


    return {
        MostrarPaises,
        traerUsuarios,
        RegistrarUsuario,
        traerRoles,
        ActUsuario,
        EliminarUsuario,
        TraerCategorias,
        crearCategorias,
        ActualizarCateogira,
        EliminarCategoria,
        TraerPeliculas,
        RegistrarPeliculas,
        TraerPeliculaAct,
        actualizarPelicula,
        eliminarPelicula,
        mostrarChat

    }
}
