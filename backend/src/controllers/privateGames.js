/***************
 * Fichero con los controladores de los juegos privados para la API
 ***************/
const { response } = require('express');
const { Op } = require('sequelize');
const PrivateService = require('../services/privateService');

/**
 *  @description Crea una partida privada nueva
 * @param {Request} req - Request de Express 
 * @param {Response} res - Response de Express 
 * @returns {Response} - Devuelve la partida privada creada y uno de error en caso de error
 * @throws {Error} - Maneja errores internos del servidor
 */
const createPrivateGame = async (req, res) => {
    try {
        const { passwd, maxPlayers } = req.body;
        
        if (!passwd || !maxPlayers) {
            return res.status(500).json({ message: "Contraseña y número máximo de jugadores son obligatorios" });
        }

        const newPrivateGame = await PrivateService.createPrivateGame(passwd, maxPlayers);
        res.status(200).json(newPrivateGame);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * @description Obtiene todas las partidas privadas
 * @param {Request} req - Request de Express
 * @param {Response} res - Response de Express
 * @returns {Response} - Devuelve las partida privada y error en caso de error
 * @throws {Error} - Maneja errores internos del servidor
 */
const getPrivateGame = async (req, res) => {
    try {
        const privateGames = await PrivateService.getPrivateGames();
        res.status(200).json(privateGames);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * @description Obtiene una partida privada por su id
 * @param {Request} req - Request de Express
 * @param {Response} res - Response de Express
 * @returns {Response} - Devuelve la partida privada y error en caso de error
 * @throws {Error} - Maneja errores internos del servidor
 */
const getPrivateEndPoint = async (req, res) => {
    try {
        const { gameId, passwd } = req.body;
        if (!gameId || !passwd) {
            return res.status(500).json({ message: "ID de partida privada y contraseña son obligatorios" });
        }

        const privateGame = await PrivateService.joinPrivateGame(gameId, passwd);
        if (privateGame) {
            res.status(200).json(privateGame);
        } else {
            res.status(404).json({ message: "Partida privada no encontrada o contraseña incorrecta" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * @description Elimina una partida privada
 * @param {Request} req - Request de Express
 * @param {Response} res - Response de Express
 * @returns {Response} - Devuelve confirmacion o error en caso de error
 * @throws {Error} - Maneja errores internos del servidor
 */
const deletePrivateGame = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID de partida privada no proporcionada" });
        }

        const deletedPrivateGame = await PrivateService.deletePrivateGame(id);
        if (deletedPrivateGame) {
            res.status(200).json({ message: "Partida privada eliminada correctamente" });
        } else {
            res.status(404).json({ message: "Partida privada no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * @description Obtiene los jugadores de una partida privada
 * @param {Request} req - Request de Express 
 * @param {Response} res - Response de Express 
 * @returns {Response} - Devuelve el  numero de jugadores de la partida privada y error en caso de error
 */
const getPlayers = async (req, res) => {
    try {
        const { gameId } = req.params;

        if(!gameId) {
            return res.status(500).json({ message: "ID de partida privada no proporcionada" });
        }

        const players = await PrivateService.getPlayers(gameId);
        if (players) {
            res.status(200).json(players);
        } else {
            res.status(404).json({ message: "Partida privada no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createPrivateGame, getPrivateGame, getPrivateEndPoint, deletePrivateGame, getPlayers };
