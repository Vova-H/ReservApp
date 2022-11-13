import {default as env} from 'dotenv/config'
import express from "express";
import authRouter from "./routs/authRouter.js";
import reservationRouter from "./routs/reservationRouter.js";
import {default as sequelize} from './db.js'
import {Reservation, User} from './models/models.js'
import cors from 'cors'
import adminRouter from "./routs/adminRouter.js";



const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', authRouter)
app.use('/api', reservationRouter)
app.use('/api', adminRouter)


const configEnv = env
const user = User
const reservation = Reservation
const PORT = process.env.PORT || 3000
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

async function startApp() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server running on port ${PORT}`))

    } catch (e) {
        console.log(e)
    }
}

export default startApp
