const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const {MONGO_URI} = require('./../config');
const Voluntario = require('../models/Voluntario');
const LocalVoluntariado = require('../models/LocalVoluntariado');
const client = new MongoClient(MONGO_URI);


//-------------------------------------------VOLUNTARIOS-------------------------------------------
/**
 * @swagger
 * definitions:
 *   Voluntario:
 *     type: object
 *     properties:
 *       nome:
 *         type: string
 *       idade:
 *         type: integer
 *         format: int32
 *       email:
 *         type: string
 *       genero:
 *         type: string
 *       disponibilidade:
 *         type: boolean
 *     xml:
 *       name: Voluntario
 */


//------------------------@routes POST------------------------

/**
 * @swagger
 * paths:
 *   /voluntarios:
 *     post:
 *       tags:
 *       - voluntarios
 *       summary: Adicionar novo voluntario
 *       operationId: postConcelho
 *       consumes:
 *       - application/json
 *       - application/xml
 *       produces:
 *       - application/json
 *       - application/xml
 *       parameters:
 *       - in: body
 *         name: body
 *         description: Concelho object that needs to be added
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Voluntario'
 *       responses:
 *         405:
 *           description: Invalid input
 */
router.post('/voluntarios', async (req, res) => {
    const newVoluntario = new Voluntario(req.body);

    try {
        const collection = await newVoluntario.save();
        if(!collection) throw Error('Something went wrong while saving the post');

        res.status(200).json(collection);
    } catch (err){
        res.status(400).json({msg: err});   
    }
});

//------------------------@routes GET Voluntarios------------------------

/**
 * @swagger
 * paths:
 *   /voluntarios:
 *     get:
 *       tags:
 *       - voluntarios
 *       summary: pesquisar voluntarios
 *       description: Lista de todos os voluntarios registados na base de dados
 *       operationId: getVoluntarios
 *       produces:
 *       - application/json
 *       - application/xml
 *       responses:
 *         '200':
 *           description: sucess
 *           schema:
 *             $ref: '#/definitions/Voluntario'
 *         '500':
 *           description: error
 */
router.get('/voluntarios', async (req, res) => {
    try {
        const collection = await Voluntario.find();
        if(!collection) throw Error('No Items');
        res.status(200).json(collection);
    } catch (err){
        res.status(400).json({msg: err});   
    }
});

//------------------------@routes GET Voluntarios por nome------------------------

/**
 * @swagger
 * paths:
 *   /voluntariosPorNome:
 *     get:
 *       tags:
 *       - voluntarios
 *       summary: pesquisar voluntarios pelo nome
 *       description: Lista de todos os voluntarios registados na base de dados com o nome pesquisado
 *       operationId: getVoluntarioPorNome
 *       produces:
 *       - application/json
 *       - application/xml
 *       parameters:
 *       - in: query
 *         name: nome
 *         type: string
 *         required: true
 *       responses:
 *         '200':
 *           description: sucess
 *           schema:
 *             $ref: '#/definitions/Voluntario'
 *         '500':
 *           description: error
 */
router.get('/voluntariosPorNome', async (req, res) => {
    const query = req.query;
    try {
        const collection = await Voluntario.find(query);
        if(!collection) throw Error('No Items');
        res.status(200).json(collection);
    } catch (err){
        res.status(400).json({msg: err});   
    }
});

//------------------------routes count VOluntarios------------------------
/**
 * @swagger
 * paths:
 *   /count_voluntarios:
 *     get:
 *       tags:
 *       - voluntarios
 *       summary: número de voluntarios 
 *       description: número de voluntarios registados na base de dados
 *       operationId: getCountVoluntarios
 *       responses:
 *         '200':
 *           description: sucess
 *           schema:
 *             $ref: '#/definitions/Voluntario'
 *         '500':
 *           description: error
 */
router.get('/count_voluntarios', async (req, res) => {
    
    try{

        await client.connect();
        const database = client.db("Voluntariado");
        const nvoluntarios = database.collection("voluntarios");
        const estimate = await nvoluntarios.estimatedDocumentCount();

        res.status(200).json(estimate);

    }finally {
        await client.close();
      }
});

//------------------------@routes GET Voluntarios por nome------------------------

/**
 * @swagger
 * paths:
 *   /voluntariosPorGenero:
 *     get:
 *       tags:
 *       - voluntarios
 *       summary: pesquisar voluntarios pelo genero
 *       description: Lista de todos os voluntarios registados na base de dados com o genero pesquisado
 *       operationId: getVoluntarioPorGenero
 *       produces:
 *       - application/json
 *       - application/xml
 *       parameters:
 *       - in: query
 *         name: genero
 *         type: string
 *         required: true
 *       responses:
 *         '200':
 *           description: sucess
 *           schema:
 *             $ref: '#/definitions/Voluntario'
 *         '500':
 *           description: error
 */
router.get('/voluntariosPorGenero', async (req, res) => {

    const query = req.query;
    try {
        const collection = await Voluntario.find(query);
        if(!collection) throw Error('No Items');
        res.status(200).json(collection);
    } catch (err){
        res.status(400).json({msg: err});   
    }
});


//------------------------@routes GET Voluntarios por disponibilidade------------------------

/**
 * @swagger
 * paths:
 *   /voluntariosPorDisponibilidade:
 *     get:
 *       tags:
 *       - voluntarios
 *       summary: pesquisar voluntarios pela disponibilidade
 *       description: Lista de todos os voluntarios disponiveis ou indisponiveis registados na base de dados
 *       operationId: getVoluntarioPorDisponibilidade
 *       produces:
 *       - application/json
 *       - application/xml
 *       parameters:
 *       - in: query
 *         name: disponibilidade
 *         type: boolean
 *         required: true
 *       responses:
 *         '200':
 *           description: sucess
 *           schema:
 *             $ref: '#/definitions/Voluntario'
 *         '500':
 *           description: error
 */
router.get('/voluntariosPorDisponibilidade', async (req, res) => {

    const query = req.query;
    try {
        const collection = await Voluntario.find(query);
        if(!collection) throw Error('No Items');
        res.status(200).json(collection);
    } catch (err){
        res.status(400).json({msg: err});   
    }
});




//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------



//-------------------------------------------LOCAL PARA VOLUNTARIADO-------------------------------------------
/**
 * @swagger
 * definitions:
 *   LocalVoluntariado:
 *     type: object
 *     properties:
 *       nome:
 *         type: string
 *       email:
 *         type: string
 *       contacto:
 *         type: string
 *       localizacao:
 *         type: string
 *       morada:
 *         type: string
 *       disponibilidade:
 *         type: boolean
 *       tarefa:
 *         type: string
 *     xml:
 *       name: LocalVoluntariado
 */


//------------------------@routes POST------------------------

/**
 * @swagger
 * paths:
 *   /localvoluntariado:
 *     post:
 *       tags:
 *       - Local Voluntariado
 *       summary: Adicionar nova instituicao
 *       operationId: postLocalVoluntariado
 *       consumes:
 *       - application/json
 *       - application/xml
 *       produces:
 *       - application/json
 *       - application/xml
 *       parameters:
 *       - in: body
 *         name: body
 *         description: LocalVoluntariado object that needs to be added
 *         required: true
 *         schema:
 *           $ref: '#/definitions/LocalVoluntariado'
 *       responses:
 *         405:
 *           description: Invalid input
 */
router.post('/localvoluntariado', async (req, res) => {
    const newLocalVoluntariado = new LocalVoluntariado(req.body);

    try {
        const collection = await newLocalVoluntariado.save();
        if(!collection) throw Error('Something went wrong while saving the post');

        res.status(200).json(collection);
    } catch (err){
        res.status(400).json({msg: err});   
    }
});

//------------------------@routes GET Locais de Voluntariado------------------------

/**
 * @swagger
 * paths:
 *   /localvoluntariado:
 *     get:
 *       tags:
 *       - Local Voluntariado
 *       summary: pesquisar locais de voluntariado
 *       description: Lista de todos as instituicoes e locais de voluntariado registados na base de dados
 *       operationId: getLocalVoluntariado
 *       produces:
 *       - application/json
 *       - application/xml
 *       responses:
 *         '200':
 *           description: sucess
 *           schema:
 *             $ref: '#/definitions/LocalVoluntariado'
 *         '500':
 *           description: error
 */
router.get('/localvoluntariado', async (req, res) => {
    try {
        const collection = await LocalVoluntariado.find();
        if(!collection) throw Error('No Items');
        res.status(200).json(collection);
    } catch (err){
        res.status(400).json({msg: err});   
    }
});

//------------------------@routes GET Locais de voluntariado por nome------------------------

/**
 * @swagger
 * paths:
 *   /localvoluntariadoPorNome:
 *     get:
 *       tags:
 *       - Local Voluntariado
 *       summary: pesquisar lovais de voluntariado por nome
 *       description: Lista de todos as instituições e locais de voluntariado registados na base de dados com o nome pesquisado
 *       operationId: getLocalVoluntariadoPorNome
 *       produces:
 *       - application/json
 *       - application/xml
 *       parameters:
 *       - in: query
 *         name: nome
 *         type: string
 *         required: true
 *       responses:
 *         '200':
 *           description: sucess
 *           schema:
 *             $ref: '#/definitions/LocalVoluntariado'
 *         '500':
 *           description: error
 */
router.get('/localvoluntariadoPorNome', async (req, res) => {
    const query = req.query;
    try {
        const collection = await LocalVoluntariado.find(query);
        if(!collection) throw Error('No Items');
        res.status(200).json(collection);
    } catch (err){
        res.status(400).json({msg: err});   
    }
});

//------------------------routes count locais de voluntariado------------------------
/**
 * @swagger
 * paths:
 *   /count_localvoluntariado:
 *     get:
 *       tags:
 *       - Local Voluntariado
 *       summary: número de locais de voluntariado
 *       description: número de locais de voluntariado registados na base de dados
 *       operationId: getCountLocalVoluntariado
 *       responses:
 *         '200':
 *           description: sucess
 *           schema:
 *             $ref: '#/definitions/LocalVoluntariado'
 *         '500':
 *           description: error
 */
router.get('/count_localvoluntariado', async (req, res) => {
    
    try{

        await client.connect();
        const database = client.db("Voluntariado");
        const nvoluntarios = database.collection("localvoluntariados");
        const estimate = await nvoluntarios.estimatedDocumentCount();

        res.status(200).json(estimate);

    }finally {
        await client.close();
      }
});

//------------------------@routes GET locais de voluntariado por cidade------------------------

/**
 * @swagger
 * paths:
 *   /localvoluntariadoPorLocalizacao:
 *     get:
 *       tags:
 *       - Local Voluntariado
 *       summary: pesquisar por Locais de Voluntariado por localização
 *       description: Lista de todos as instituições e locais de voluntariado registados na base de dados de uma determinada cidade
 *       operationId: getVoluntarioPorLocalizacao
 *       produces:
 *       - application/json
 *       - application/xml
 *       parameters:
 *       - in: query
 *         name: localizacao
 *         type: string
 *         required: true
 *       responses:
 *         '200':
 *           description: sucess
 *           schema:
 *             $ref: '#/definitions/LocalVoluntariado'
 *         '500':
 *           description: error
 */
router.get('/localvoluntariadoPorLocalizacao', async (req, res) => {

    const query = req.query;
    try {
        const collection = await LocalVoluntariado.find(query);
        if(!collection) throw Error('No Items');
        res.status(200).json(collection);
    } catch (err){
        res.status(400).json({msg: err});   
    }
});


//------------------------@routes GET Locais de Voluntariado por disponibilidade------------------------

/**
 * @swagger
 * paths:
 *   /localvoluntariadoPorDisponibilidade:
 *     get:
 *       tags:
 *       - Local Voluntariado
 *       summary: pesquisar por Locais de Voluntariado por disponibilidade
 *       description: Lista de todos as instituições e locais de voluntariado registados na base de dados disponiveis ou indisponiveis
 *       operationId: getVoluntarioPorDisponibilidade
 *       produces:
 *       - application/json
 *       - application/xml
 *       parameters:
 *       - in: query
 *         name: disponibilidade
 *         type: boolean
 *         required: true
 *       responses:
 *         '200':
 *           description: sucess
 *           schema:
 *             $ref: '#/definitions/LocalVoluntariado'
 *         '500':
 *           description: error
 */
router.get('/localvoluntariadoPorDisponibilidade', async (req, res) => {

    const query = req.query;
    try {
        const collection = await LocalVoluntariado.find(query);
        if(!collection) throw Error('No Items');
        res.status(200).json(collection);
    } catch (err){
        res.status(400).json({msg: err});   
    }
});

module.exports = router;
