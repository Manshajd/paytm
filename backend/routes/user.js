const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");
const { User } = require("../db");
const router = express.Router();
const app = express();

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const signinSchema = zod.object({
    username: z.string(),
    password: z.string()
})

router.get("/test", (req,res)=>{
    res.send("hello world!")
})

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(req.body);
    if(!success)
    {
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = User.findOne({
        username: body.username
    })

    if(user._id)
    {
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const dbuser = await User.create(body);
    const token = jwt.sign({
        userId: dbuser._id
    }, JWT_SECRET);
    res.json({
        message: "user created successfully",
        token: token
    })
})

router.post("/signin", (req, res) => {
    const { succees } = siginInput.safeParse(req.body)
    if(!succees){
        return res.status(400).json({
            msg: "Invalid email or password"
        })
    }

    const username = user.username
    const firstName = user.firstName

    const user = await User.findOne({
            username: req.body.username,
          password: req.body.password
        })


    if(!user){
        return  res.status(411).json({
            msg: "Error while logging in"
        })
    }
    const userId = user._id;


    const token = jwt.sign({
        userId,
        username,
        firstName
    },JWT_Secret, {expiresIn: 86400})

    res.json({
        msg: "login Succesfull",
        token
    })

})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/", authMiddleware, async(req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if(!success)
    {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })

})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const user = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(users => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;