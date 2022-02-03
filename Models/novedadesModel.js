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

async function deleteNovedadesById(id){ //Una funcion que borra las novedades segun su ID
    var query = 'delete from novedades where id = ?' // Borra la fila de novedades en donde el id coincida con el suministrado
    var rows = await pool.query(query, [id]); 
    return rows; //Devuelte las fila
}


//Llamar a una novedad

async function getNovedadesById(id){
    var query = 'select * from novedades where id = ?';
    var rows = await pool.query(query,[id]);
    return rows [0];
    }
  
    //Modificar novedad
  
    async function modificarNovedadesById(obj,id){
      try{
        var query = 'update novedades set ? where id=?';
        var rows = await pool.query(query, [obj,id]);
        return rows;
      }catch (error){
        throw(error);
      }
    } 

module.exports = {getNovedades,insertNovedad,deleteNovedadesById,getNovedadesById,modificarNovedadesById}