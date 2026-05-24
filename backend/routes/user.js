const express = require("express");
const zod = require("zod");
const router = express.Router();
const app = express();

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup", (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse
})

module.exports = router;