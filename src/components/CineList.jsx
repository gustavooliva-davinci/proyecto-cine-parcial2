import { useEffect, useState } from "react";
import peliculasData from "../peliculas.json";

function CineList() {
  
    const [peliculas, setPeliculas] = useState([]);

    // Cargar las peliculas al iniciar
    useEffect(() => {
        setPeliculas(peliculasData);
    }, []);

    return (
        <div>
            <h2>Listado de Películas</h2>

            <ul>
                {peliculas.map((peli) => (
                    <li key={peli.id}>
                        {peli.titulo} ({peli.anio}) - {peli.genero}
                    </li>
                ))}
            </ul>
            
        </div>
    );
}

export default CineList;