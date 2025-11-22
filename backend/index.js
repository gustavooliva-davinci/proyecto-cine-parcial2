import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Permite peticiones de orígenes cruzados (resuelve el error CORS)
app.use(bodyParser.json()); 

const DATA_FILE = 'data/peliculas.json';

const leerPeliculas = () => { 
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error leyendo peliculas:", error.message);
        return []; 
    }
};

const guardarPeliculas = (peliculas) => { 
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(peliculas, null, 2), 'utf8');
    } catch (error) {
        console.error("Error guardando peliculas:", error.message);
    }
};

// GET: Obtener todas las películas
app.get('/api/peliculas', (req, res) => {
    const peliculas = leerPeliculas();
    // Simulamos un pequeño retraso para que se vea el estado de carga en el front
    setTimeout(() => {
        res.json(peliculas);
    }, 500);
});

// GET por ID (para la ruta de detalle)
app.get('/api/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const peliculas = leerPeliculas();
    const pelicula = peliculas.find(p => p.id === id);

    if (pelicula) {
        res.json(pelicula);
    } else {
        res.status(404).json({ mensaje: 'Película no encontrada' });
    }
});

// POST: Agregar una nueva película
app.post('/api/peliculas', (req, res) => {
    const nuevaPelicula = req.body;
    const peliculas = leerPeliculas();

    const ultimoId = peliculas.length > 0 ? Math.max(...peliculas.map(p => p.id)) : 0;
    nuevaPelicula.id = ultimoId + 1;

    peliculas.push(nuevaPelicula);
    guardarPeliculas(peliculas);
    
    res.status(201).json({ 
        exito: true, 
        mensaje: 'Película agregada correctamente', 
        pelicula: nuevaPelicula 
    });
});

// PUT: Actualizar una película existente
app.put('/api/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const datosActualizados = req.body;
    let peliculas = leerPeliculas();
    const index = peliculas.findIndex(p => p.id === id);

    if (index !== -1) {
        peliculas[index] = { ...peliculas[index], ...datosActualizados, id }; 
        guardarPeliculas(peliculas);
        res.json({ 
            exito: true, 
            mensaje: 'Película actualizada correctamente', 
            pelicula: peliculas[index] 
        });
    } else {
        res.status(404).json({ exito: false, mensaje: 'Película no encontrada' });
    }
});

// DELETE: Eliminar una película
app.delete('/api/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let peliculas = leerPeliculas();
    const nuevaLista = peliculas.filter(p => p.id !== id);

    if (nuevaLista.length !== peliculas.length) {
        guardarPeliculas(nuevaLista);
        res.json({ exito: true, mensaje: 'Película eliminada correctamente' });
    } else {
        res.status(404).json({ exito: false, mensaje: 'Película no encontrada' });
    }
});


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});