import Consulta from "../modules/Consulta";

import { findMedicoByPk } from "../controllers/MedicoController.js";

import { findPacienteByPk } from "../controllers/PacienteController.js";

import { validarDadosConsulta, validarDataConsulta } from "../middlewares/validarDados";

function findAll (req, res) {
    Consulta.findAll().then((result) => res.json(result));
}

async function findConsulta (req, res) {
    return await Consulta.findOne({
        where: {
            id: req.params.id
        }
    })
}

async function addConsulta (req, res) {

    if (validarDadosConsulta(req)) {

        if (validarDataConsulta(req)) {
            const medico = await findMedicoByPk(req, res);
            const paciente = await findPacienteByPk(req, res);
        
            if (medico != null) {
                if (paciente != null) {
                    return await Consulta.create({
                        idMedico: req.body.idMedico,
                        idPaciente: req.body.idPaciente,
                        data: req.body.data,
                        hora: req.body.hora
                    });
                } else {
                    res.json({
                        mensagem: "Paciente não existe"
                    })
                }
            } else {
                res.json({
                    mensagem: "Medico não existe"
                })
            }
        } else {
            res.status(400).send("Data ou hora selecionados inválidos");
        }
        
    } else {
        res.status(400).send("Valores de campos nulos ou vazios");
    }
    
}

async function updateConsulta (req, res) {
    await Consulta.update(
        {
            idMedico: req.body.idMedico,
            idPaciente: req.body.idPaciente,
            data: req.body.data,
            hora: req.body.hora
        },
        {
            where: {
                id: req.params.id,
            },
        }
    );

    Consulta.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteConsulta (req, res) {
    await Consulta.destroy({
        where: {
            id: req.params.id,
        },
    });

    Consulta.findAll().then((result) => res.json(result));
}

export { findAll, findConsulta, addConsulta, updateConsulta, deleteConsulta};