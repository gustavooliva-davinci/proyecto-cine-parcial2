import peliculasData from "../peliculas.json";
import { Link } from "react-router-dom";
import "../styles/cine.css";

function CineList() {
    
    return (
        <div className="grid-container">
            {peliculasData.map((peli) => (
                <Link key={peli.id} to={`/cine/${peli.id}`} className="card">
                    <div className="card-image">
                        <img src={peli.imagen} alt={peli.titulo} />
                    </div>

                    <div className="card-title">
                        {peli.titulo}
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default CineList;