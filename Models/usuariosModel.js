var pool = require ('./bd'); //LLama a la base de datos
var md5 = require ('md5'); //Como trabajamos con contraseña encriptada, requiere el md5

async function getUserByUsernameAndPassword(user,password){ //Aca se crea una funcion que tiene como variables user y password
    try {
        var query = "select * from usuarios where usuario = ? and password = ? limit 1"; //Select * hace que traiga todos los campos de la tabla de datos, donde usuario y contraseña coincidan. con limit 1 nos aseguramos un solo registro
        var rows = await pool.query(query, [user,md5(password)]); //como tenemos encriptacion, en lugar de ingresar user y password, ingresan user y md5 password
        return rows[0]; //Devuelte la fila
    } catch (error){
        console.log(error); //Nos muestra en consola si hay un error
    }
}

module.exports = {getUserByUsernameAndPassword}