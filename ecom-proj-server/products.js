import { Router } from "express";
import pool from "./services/database.js";

const productsRouter = Router();

productsRouter.get("/products", async (req, res) => {
    const filters = req.query;
    const page = filters.page ? parseInt(filters.page) : 0;

    let query = `SELECT DISTINCT p.id, p.name, p.price, p.description, p.image 
                FROM products p 
                JOIN product_specifications ps ON p.id = ps.product_id 
                WHERE 1=1`;
    const queryParams = [];

    if (filters.search) {
        query += " AND p.name LIKE ?";
        queryParams.push(`%${filters.search}%`);
    }
    const titles = new Set();
    for (const key in filters) {
        if (key !== "search" && key !== "page") {
            query += titles.size === 0 ? " AND " : " OR ";
            titles.add(key);
            const values = filters[key].split(",");


            query += ` ( ps.title = ? AND (`;
            query += values.map(() => "ps.value = ?").join(" OR ");
            query += "))";
            queryParams.push(key, ...values);
        }
    }

    console.log(query);
    console.log(queryParams);

    if (titles.size > 0) {
        query += `
            GROUP BY p.id, p.name, p.price, p.description, p.image
            HAVING COUNT(DISTINCT ps.title) = ?
        `;
        queryParams.push(titles.size);
    }

    query += " LIMIT ? OFFSET ?";
    queryParams.push(12, page * 12);

    const result = await pool.query(query, queryParams);

    res.json(result);
  
  });


productsRouter.get("/products/:id", (req, res) => {
    const id = req.params.id;
  
    res.json({
      id: id,
      name: "Product 1",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur exercitationem rerum enim libero dicta deserunt quaerat totam alias distinctio. Adipisci earum quaerat dolor tenetur optio molestiae tempore fugit repellat nam!",
      price: 100,
    });
  
  
});
  
productsRouter.post("/products", (req, res) => {
const product = req.body;

//add to database

res.json(product);

})

export default productsRouter;