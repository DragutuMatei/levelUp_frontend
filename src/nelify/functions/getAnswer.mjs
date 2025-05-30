// netlify/functions/getAnswer.js
exports.handler = async function (event, context) {
  const level = event.queryStringParameters.level;
  // Obținem răspunsul corect din variabila de mediu corespunzătoare
  const answer = process.env[`LEVEL_${level}`] || null;
  return {
    statusCode: 200,
    body: "answer",
  };
};
