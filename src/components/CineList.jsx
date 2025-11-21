import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/cine.css";

function CineList() {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [peliculaEditar, setPeliculaEditar] = useState(null);

    const [form, setForm] = useState({
        titulo: "",
        genero: "",
        anio: "",
        descripcion: "",
        imagen: ""
    })

    // Obtener peliculas desde API
    const cargarPeliculas = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/peliculas");
            const data = await res.json();
            setPeliculas(data);
            setCargando(false);
        } catch (error) {
            console.error("Error al obtener películas:", error);
        }
    }

    useEffect(() => {
        cargarPeliculas();
    }, []);

    // Cambios en el FORM
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Enviar la pelicula al BACK
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validacion
        if (!form.titulo.trim() || !form.imagen.trim()){
            alert("El titulo y la imagen son obligatorios para continuar.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/peliculas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (data.error){
                alert(data.error);
                return;
            }

            alert("La pelicula fue agregada correctamente!");

            // Cargar lista
            cargarPeliculas();

            // Limpiar form
            setForm({
                titulo: "",
                genero: "",
                anio: "",
                descripcion: "",
                imagen: ""
            });

        } catch (error){
            console.error("Error al agregar película:", error);
        }

    };

    // Eliminar pelicula
    const eliminarPelicula = async (id) => {
        if (!confirm("¿Seguro que deseas eliminar esta pelicula?")) return;

        try {
            const res = await fetch(`http://localhost:3000/api/peliculas/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if (data.error){
                alert(data.error);
                return;
            }

            alert("Película eliminada correctamente!");

            cargarPeliculas();

        } catch (error){
            console.error("Error al eliminar la pelicula:", error);
        }
    };

    // Editar pelicucla
    const seleccionarPelicula = (peli) => {
        setPeliculaEditar(peli);
    };

    const guardarEdicion = async () => {
        await fetch(`http://localhost:3000/api/peliculas/${peliculaEditar.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(peliculaEditar),
        });

        setPeliculaEditar(null);
        cargarPeliculas();
    };

    // Render
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
                    placeholder="URL de la imagen"
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

            {/* EDITAR */}
            {peliculaEditar && (
                <div className="edit-form">
                    <h3>Editar película</h3>

                    <input
                        type="text"
                        value={peliculaEditar.titulo}
                        onChange={(e) =>
                            setPeliculaEditar({ ...peliculaEditar, titulo: e.target.value })
                        }
                    />

                    <textarea
                        value={peliculaEditar.descripcion}
                        onChange={(e) =>
                            setPeliculaEditar({ ...peliculaEditar, descripcion: e.target.value })
                        }
                    />

                    <input
                        type="text"
                        value={peliculaEditar.imagen}
                        onChange={(e) =>
                            setPeliculaEditar({ ...peliculaEditar, imagen: e.target.value })
                        }
                    />

                    <button onClick={guardarEdicion}>Guardar</button>
                    <button onClick={() => setPeliculaEditar(null)}>Cancelar</button>
                </div>
            )}

            {/* Listado */}
            {cargando ? (
                <p>Cargando películas...</p>
            ) : (
                <div className="grid-container">
                    {peliculas.map((peli) => (
                        <div className="card" key={peli.id}>
                            <img className="card-image" src={peli.imagen} alt={peli.titulo} />
                            <h3 className="card-title">{peli.titulo}</h3>
                            <button className="delete-btn" onClick={() => eliminarPelicula(peli.id)} >
                                Eliminar
                            </button>
                            <button className="edit-btn" onClick={() => seleccionarPelicula(peli)}>
                                Editar
                            </button>
                        </div>
                    ))}
                </div>  
            )}
        </>
    );
}

export default CineList;