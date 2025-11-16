import { useParams } from "react-router-dom";
import peliculasData from "../peliculas.json";
import "../styles/cine.css";

function CineDetail() {
    const { id } = useParams();
    const pelicula = peliculasData.find((p) => p.id === Number(id));

    if (!pelicula) return <h2>Película no encontrada</h2>;

    return (
        <div className="detail-container">
            <img className="detail-image" src={pelicula.imagen} alt={pelicula.titulo} />

            <div className="detail-info">
                <h1>{pelicula.titulo}</h1>
                <p><strong>Año:</strong> {pelicula.anio}</p>
                <p><strong>Genero:</strong> {pelicula.genero}</p>
            </div>
        </div>
    );
}

export default CineDetail;