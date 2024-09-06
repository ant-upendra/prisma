import "dotenv/config";
import routes from "./routes/index.js";
import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.send("Hi Everyone");
});

app.use(routes);  // Use the imported routes

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
