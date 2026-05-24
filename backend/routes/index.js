const express = require("express");
const userRouter = require("./user")

const app = express();
const PORT = 3000;
const router = express.Router();

router.use("/user", userRouter);

app.use(router);

// app.listen(PORT, function(err){
//     if(err)
//     {
//         console.log(err);
//     }
//     console.log(`app is listening at port ${PORT}`);
// });