import { useParams, Link } from "react-router-dom";
import peliculasData from "../peliculas.json";
import "../styles/cine.css";

function CineDetail() {
    
    const { id } = useParams();
    const pelicula = peliculasData.find((p) => p.id === parseInt(id));

    if (!pelicula) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Pelicula no encontrada</h2>
                <Link to="/cine" className="volver-btn">
                    Volver al Catalogo
                </Link>
            </div>
        );
    }

    return (
        <div className="detail-container">
            <img className="detail-image" src={pelicula.imagen} alt={pelicula.titulo} />

            <div className="detail-info">
                <h1>{pelicula.titulo}</h1>
                <p><strong>Genero:</strong> {pelicula.genero} </p>
                <p><strong>Año</strong> {pelicula.anio} </p>
                <p><strong>Descripcion:</strong></p>
                <p> {pelicula.descripcion} </p>

                <br />
                <Link to="/cine" className="volver-btn">
                    Volver
                </Link>
            </div>
        </div>
    );
}

export default CineDetail;