const express = require('express');
const PORT = process.env.PORT || 3000;

const { router } = require('./src/routes/companyRoutes');
const { errorHandler } = require('./src/middlewares/errorHandler');


const app = express();
app.use(express.json());

app.use('/', router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});