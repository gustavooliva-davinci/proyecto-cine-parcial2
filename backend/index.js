const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Cargar JSON
const loadPeliculas = () => {
    return JSON.parse(fs.readFileSync("./peliculas.json", "utf8"));
};

// Guardar JSON
const savePeliculas = (data) => {
    fs.writeFileSync("./peliculas.json", JSON.stringify(data, null, 2));
};

// GET (listar)
app.get("/api/peliculas", (req, res) => {
    const data = loadPeliculas();
    res.json(data);
});

// POST (agregar)
app.post("/api/peliculas", (req, res) => {
    const { titulo, genero, anio, descripcion, imagen } = req.body;

    if (!titulo || !imagen) {
        return res.status(400).json({ error: "Título e imagen son obligatorios." });
    }

    const peliculas = loadPeliculas();
    const nueva = {
        id: Date.now(),
        titulo,
        genero,
        anio,
        descripcion,
        imagen
    };

    peliculas.push(nueva);
    savePeliculas(peliculas);

    res.json(nueva);
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));