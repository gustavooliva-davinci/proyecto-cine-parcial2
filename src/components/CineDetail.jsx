import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/cine.css";

function CineDetail() {
    const { id } = useParams();
    const [pelicula, setPelicula] = useState(null);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();
    
    // Eliminar pelicula
    const eliminarPelicula = async () => {
        if (!window.confirm("¿Seguro que queres eliminar la pelicula?")) return;

        try {
            const response = await fetch(`http://localhost:3000/api/peliculas/${id}`, {
                method: "DELETE",
            });

            if (response.ok){
                alert("Película eliminada con éxito");
                navigate("/");
            } else {
                alert("Error al eliminar la película");
            }
        } catch (error) {
            console.error(error);
            alert("Hubo un problema con el servidor");
        }
    };

    useEffect(() => {
        const cargarPelicula = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/peliculas/${id}`);
                const data = await res.json();

                if (data.error){
                    setPelicula(null);
                } else {
                    setPelicula(data);
                }
            } catch (error){
                console.error("Error al cargar la pelicula: ", error);
            } finally {
                setCargando(false);
            }
        };

        cargarPelicula();
    }, [id]);

    if (cargando) return <p>Cargando...</p>;

    if (!pelicula) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Película no encontrada</h2>
                <Link to="/" className="volver-btn">Volver</Link>
            </div>
        );
    }

    return (
        <div className="detail-container">
            <img className="detail-image" src={pelicula.imagen} alt={pelicula.titulo} />

            <div className="detail-info">
                <h1>{pelicula.titulo}</h1>
                <p><strong>Genero:</strong> {pelicula.genero}</p>
                <p><strong>Año:</strong> {pelicula.anio}</p>
                <p><strong>Descripcion:</strong></p>
                <p>{pelicula.descripcion}</p>

                <br />
                <button className="edit-btn" onClick={() => alert("Edición disponible solo en la pantalla principal")}>
                    Editar pelicula
                </button>

                <button className="delete-btn" onClick={eliminarPelicula} style={{ background: "red", color: "white" }}>
                    Eliminar pelicula
                </button>
                
                <br />
                <Link to="/" className="volver-btn">Volver</Link>
            </div>
        </div>
    );
}

export default CineDetail;