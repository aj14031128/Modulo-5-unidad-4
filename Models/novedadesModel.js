var pool = require ('./bd'); //LLama a la base de datos

async function getNovedades(){ //Una funcion que toma los valores de la tala de novedades
        var query = "select * from novedades"; //Select * hace que traiga todos los campos de la tabla de novedades
        var rows = await pool.query(query); 
        return rows; //Devuelte las fila
}

async function insertNovedad(obj){ //Funcion para sumar novedades
    try {
        var query = "insert into novedades set ?"; //inserta todos los campos
        var rows = await pool.query(query, [obj]); 
        return rows; //Devuelte la fila
    } catch (error){
        console.log(error); //Nos muestra en consola si hay un error
        throw error;
    }
}


module.exports = {getNovedades,insertNovedad}