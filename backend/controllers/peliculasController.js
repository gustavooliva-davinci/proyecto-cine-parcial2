import fs from "fs";
import { v4 as uuid } from "uuid";

const DATA_PATH = "./data/peliculas.json";

// Leer peliculas JSON
function leerPeliculas() {
    const data = fs.readFileSync(DATA_PATH, "utf8");
    return JSON.parse(data);
}

// Guardar peliculas JSON
function guardarPeliculas(peliculas) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(peliculas, null, 2));
}

// GET - todas las peliculas
export function getPeliculas(req, res) {
    const peliculas = leerPeliculas();
    res.json(peliculas);
}


// GET - pelicula por id
export function getPeliculaById(req, res) {
    const peliculas = leerPeliculas();
    const pelicula = peliculas.find(p => p.id === req.params.id);

    if (!pelicula) {
        return res.status(404).json({ error: "Pelicula no encontrada" });
    }

    res.json(pelicula);
}

// POST - agregar pelicula
export function addPelicula(req, res) {
    const nuevaPelicula = req.body;

    if (!nuevaPelicula.titulo || !nuevaPelicula.genero || !nuevaPelicula.anio) {
        return res.status(400).json({ error: "Datos incompletos" });
    }

    const peliculas = leerPeliculas();

    nuevaPelicula.id = uuid();
    peliculas.push(nuevaPelicula);

    guardarPeliculas(peliculas);

    res.json({
        mensaje: "Pelicula agregada correctamente",
        pelicula: nuevaPelicula
    });
}

// DELETE - eliminar pelicula
export function deletePelicula(req, res) {
    const peliculas = leerPeliculas();
    const nuevas = peliculas.filter(p => p.id !== req.params.id);

    if (nuevas.length === peliculas.length) {
        return res.status(404).json({ error: "Pelicula no encontrada" });
    }

    guardarPeliculas(nuevas);

    res.json({ mensaje: "Pelicula eliminada" });
}