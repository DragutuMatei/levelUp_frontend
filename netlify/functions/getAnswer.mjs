// netlify/functions/getAnswer.js
exports.handler = async function (event, context) {
  const level = event.queryStringParameters.level;
  console.log(level)
  const answer = process.env[`LEVEL_${level}`] || "asd";
  console.log(answer)
  return {
    statusCode: 200,
    body: answer,
  };
};
