const express = require("express");
const cors = require("cors");
const db = require("./config/database")
const app = express();
const userRouter = require("./routes/userRoutes")

db.authenticate()
	.then(() => console.log('Connection has been established successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err))


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/', userRouter);


const PORT = 5000;

app.listen(PORT, () => console.log(`The server is running on PORT: ${PORT}`));
