const express = require('express');
const bodyParser = require('body-parser');
const calculatorRoutes = require('./calculator.routes');

module.exports = (app) => {
    /**
     * calculator routes
     */
    const calculatorRouter = express.Router();
    calculatorRouter.use(bodyParser.urlencoded({extended: true}));
    calculatorRouter.use(bodyParser.json());

    calculatorRouter.post('/calculate', calculatorRoutes.handleCalc);
    app.use('/calculator', calculatorRouter);
};