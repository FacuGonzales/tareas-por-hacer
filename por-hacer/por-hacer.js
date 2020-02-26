//requireds
const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('data-base/data.json', data, (err) => {
        if( err ) throw new Error('No se pudo grabar', err);

    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../data-base/data.json');
    } catch(error){
        listadoPorHacer = [];
    }


} 

const crear = (desripcion) => {

    cargarDB();

    let porHacer = {
        desripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();

    return listadoPorHacer;
}

const actualizar = ( desripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex( tarea => tarea.desripcion === desripcion );

    if( index >= 0){
        listadoPorHacer[index].completado = completado;

        guardarDB();

        return true;
    }else{
        return false
    }
}

const borrar = (descripcion ) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter( tarea => tarea.descripcion !== descripcion );

    if(listadoPorHacer.length === nuevoListado.length){
        return false;

    }else{
    
        listadoPorHacer = nuevoListado;

        guardarDB();

        return true;
    }

}



module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}
