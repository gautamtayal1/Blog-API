const express = require('express')
const indexRouter = require('./src/routes/indexRouter')
const app = express()


app.use(indexRouter)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})