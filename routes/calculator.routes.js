const calculationService = require('../services/calculation.service');

module.exports = {
  handleCalc, handleCalcComplex
};

function handleCalcComplex(req, res) {
  const { operations, elements } = req.body;

  try {
    const calculation = calculationService.eyCalcComplex({operations, elements});
    res.send(calculation);
  } catch (e) {
    e.statusCode ? res.sendStatus(e.statusCode) : res.sendStatus(500);
  }
}

async function handleCalc(req, res) {
  const params = getCalcParamsFromBody(req.body);
  if (!params || params.err) return res.sendStatus(422);
  const {elements, operation} = params;

  try {
    const calculation = calculationService.eyCalc({operation, elements});
    res.send(calculation);
  } catch (e) {
    e.statusCode ? res.sendStatus(e.statusCode) : res.sendStatus(500);
  }
}

function getCalcParamsFromBody(body) {
  if (!body) return null;

  let {elements, operation} = body;
  if (!elements || !operation) return null;
  if (!Array.isArray(elements)) return null;

  // filters out non numbers
  elements = elements.map((elem) => parseFloat(elem)).filter((elem) => {
    return Boolean(elem) || elem < Number.EPSILON;
  });

  return {elements, operation};
}
