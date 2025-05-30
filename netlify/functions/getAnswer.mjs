exports.handler = async function (event, context) {
  const level = event.queryStringParameters.level;
  console.log("Level:", level);
  const answer = process.env[`LEVEL_${level}`] || "asd";
  console.log("Answer:", answer);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer }),
  };
};
