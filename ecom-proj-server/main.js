import express from "express";
import cors from "cors";
import productsRouter from "./products.js";
import accountsRouter from "./accounts.js";


const app = express();

app.use(cors())

app.use('/api', productsRouter);
app.use('/api', accountsRouter);


app.listen(3000, () => {})