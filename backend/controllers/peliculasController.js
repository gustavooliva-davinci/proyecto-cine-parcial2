import { error } from "console";
import fs from "fs";
import { v4 as uuid } from "uuid";

const DATA_PATH = "./data/peliculas.json";

// Leer peliculas JSON
function leerPeliculas() {
    const data = fs.readFileSync(DATA_PATH, "utf8");
    const peliculas = JSON.parse(data);

    return peliculas.map(p => ({ ...p, id: String(p.id) }));
}

// Guardar peliculas JSON
function guardarPeliculas(peliculas) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(peliculas, null, 2));
}

// GET - todas las peliculas
export function getPeliculas(req, res) {
    res.json(leerPeliculas());
}

// GET - pelicula por id
export function getPeliculaById(req, res) {
    const id = String(req.params.id);
    const peliculas = leerPeliculas();
    const peli = peliculas.find(p => p.id === id);

    if (!peli) {
        return res.status(404).json({ error: "Pelicula no encontrada" });
    }

    res.json(peli);
}

// POST - agregar pelicula
export function addPelicula(req, res) {
    const { titulo, genero, anio, descripcion, imagen} = req.body;

    if (!titulo || !genero || !anio || !descripcion || !imagen) {
        return res.status(400).json({ 
            error: "Datos incompletos" 
        });
    }

    if (isNaN(anio)) {
        return res.status(400).json({
            error: "El año debe ser numerico"
        })
    }

    const peliculas = leerPeliculas();

    const nuevaPelicula = {
        id: uuid(),
        titulo,
        genero,
        anio,
        descripcion,
        imagen
    };
    
    peliculas.push(nuevaPelicula);
    guardarPeliculas(peliculas);

    res.json({
        mensaje: "Pelicula agregada correctamente",
        pelicula: nuevaPelicula
    });
}

// DELETE - eliminar pelicula
export function deletePelicula(req, res) {
    const id = String(req.params.id);
    const peliculas = leerPeliculas();

    const nuevas = peliculas.filter(p => p.id !== id);

    if (nuevas.length === peliculas.length) {
        return res.status(404).json({ 
            error: "Pelicula no encontrada" 
        });
    }

    guardarPeliculas(nuevas);
    res.json({ mensaje: "Pelicula eliminada" });
}

// UPDATE - actualizar pelicula
export function updatePelicula (req, res){
    const id = String(req.params.id);
    const peliculas = leerPeliculas();

    const index = peliculas.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ 
            mensaje: "Pelicula no encontrada" 
        });
    }

    const { titulo, genero, anio, descripcion, imagen } = req.body;

    // Validacion
    if (!titulo || !genero || !anio || !descripcion || !imagen) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios"
        });
    }

    if (isNaN(anio)){
        return res.status(400).json({
            error: "El año debe ser numerico"
        });
    }

    peliculas[index] = {
        ...peliculas[index],
        titulo,
        genero,
        anio,
        descripcion,
        imagen
    };

    guardarPeliculas(peliculas);
    res.json({ mensaje: "Pelicula actualizada correctamente" });
};