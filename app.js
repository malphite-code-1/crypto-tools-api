const express = require("express");
var cors = require('cors');

const app = express();
const coinInfoRouter = require("./routes/coin-info");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// API to get photo list
app.use('/api/coin-info', coinInfoRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});