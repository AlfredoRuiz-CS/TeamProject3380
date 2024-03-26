function setCorsHeaders(req, res) {
  console.log("Setting CORS headers");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === "OPTIONS") {
    res.status(204).end();
    console.log("Handled OPTIONS request");
    return;
  }
  console.log("Headers are set");
}
module.exports = { setCorsHeaders };
