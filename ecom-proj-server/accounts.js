import { Router } from "express";

const accountsRouter = Router();


accountsRouter.get("/accounts", (req, res) => {

})

accountsRouter.get("/accounts/:id", (req, res) => {

})


accountsRouter.post("/register", (req, res) => {

})

accountsRouter.get("/login", (req, res) => {
    
})

accountsRouter.get("/logout", (req, res) => {})


accountsRouter.get("/forgot-password", (req, res) => {})


accountsRouter.get("/cart/:id", (req, res) => {})

export default accountsRouter;