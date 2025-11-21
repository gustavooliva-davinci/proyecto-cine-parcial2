import express from "express";
import {
    getPeliculas,
    getPeliculaById,
    addPelicula,
    deletePelicula,
    updatePelicula
} from "../controllers/peliculasController.js";

const router = express.Router();

router.get("/", getPeliculas);
router.get("/:id", getPeliculaById);
router.post("/", addPelicula);
router.delete("/:id", deletePelicula);
router.put("/:id", updatePelicula);

export default router;