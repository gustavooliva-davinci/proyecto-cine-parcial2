import { useState } from "react";
import peliculasData from "../peliculas.json";
import { Link } from "react-router-dom";
import "../styles/cine.css";

function CineList() {
    // Estado inicial con las peliculas ya cargadas en el archivo JSON
    const [peliculas, setPeliculas] = useState(peliculasData);

    const [form, setForm] = useState({
        titulo: "",
        genero: "",
        anio: "",
        descripcion: "",
        imagen: ""
    })

    // Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Agregar peliculas del form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validacion
        if (!form.titulo.trim() || !form.imagen.trim()){
            alert("El titulo y la imagen son obligatorios para continuar.");
            return;
        }

        const nuevaPelicula = {
            id: Date.now(), // id único simple
            titulo: form.titulo.trim(),
            genero: form.genero.trim(),
            anio: form.anio ? Number(form.anio) : undefined,
            descripcion: form.descripcion.trim(),
            imagen: form.imagen.trim()
        }

        setPeliculas((prev) => [...prev, nuevaPelicula]);

        // Limpiar formulario
        setForm({
            titulo: "",
            genero: "",
            anio: "",
            descripcion: "",
            imagen: ""
        });
    };
    
    return (
        <>
            <h1>Catalogo de Peliculas</h1>

            {/* Formulario */}
            <form className="formulario-cine" onSubmit={handleSubmit} >
                <input 
                    type="text" 
                    name="titulo"
                    placeholder="Titulo"
                    value={form.titulo}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="genero"
                    placeholder="Genero"
                    value={form.genero}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="anio"
                    placeholder="Año"
                    value={form.anio}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="imagen"
                    placeholder="URL de la imagen (ej: /imagenes/peli.jpg)"
                    value={form.imagen}
                    onChange={handleChange}
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    rows="3"
                    value={form.descripcion}
                    onChange={handleChange}
                />

                <button type="submit">Agregar Pelicula</button>
            </form>

            {/* Listado */}
            <div className="grid-container">
                {peliculas.map((peli) => (
                    <Link key={peli.id} to={`/cine/${peli.id}`} className="card" >
                        <div className="card-image">
                            <img src={peli.imagen} alt={peli.titulo} />
                        </div>
                        <div className="card-title">{peli.titulo}</div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default CineList;