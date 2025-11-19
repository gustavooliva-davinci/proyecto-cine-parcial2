import express from "express";
import cors from "cors";
import fs from "fs";
import { v4 as uuid } from "uuid";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Ruta GET - lista de peliculas
app.get("/api/peliculas", (req, res) => {
    const data = fs.readFileSync("./data/peliculas.json", "utf8");
    const peliculas = JSON.parse(data);
    res.json(peliculas);
});

// Validacion
function validarPelicula(p) {
    return p.titulo && p.director && p.anio && p.genero;
}

// Ruta POST - agregar pelicula
app.post("/api/peliculas", (req, res) => {
    const nuevaPelicula = req.body;

    if (!validarPelicula(nuevaPelicula)) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const data = fs.readFileSync("./data/peliculas.json", "utf8");
  const peliculas = JSON.parse(data);

  nuevaPelicula.id = uuid();

  peliculas.push(nuevaPelicula);

  fs.writeFileSync("./data/peliculas.json", JSON.stringify(peliculas, null, 2));

  res.json({ mensaje: "Película agregada correctamente", pelicula: nuevaPelicula });
});

// Ruta DELETE
app.delete("/api/peliculas/:id", (req, res) => {
    const id = req.params.id;

    const data = fs.readFileSync("./data/peliculas.json", "utf8");
    let peliculas = JSON.parse(data);

    const nuevaLista = peliculas.filter((p) => p.id !== id);

    if (nuevaLista.length === peliculas.length) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    fs.writeFileSync("./data/peliculas.json", JSON.stringify(nuevaLista, null, 2));

    res.json({ mensaje: "Película eliminada" });
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});