const express = require('express')
const indexRouter = require('./src/routes/indexRouter')
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());
app.use(indexRouter)


app.get('/test-token', (req, res) => {
  const token = req.cookies.token;
  res.json({
    haveToken: !!token,
    tokenValue: token,
    cookiesReceived: req.cookies
  });
});

const PORT = 3000
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})