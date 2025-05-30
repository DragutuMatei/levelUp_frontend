exports.handler = async function (event, context) {
  const level = event.queryStringParameters.level;
  
  const answer = process.env[`LEVEL_${level}`];
  
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: answer }),
  };
};
