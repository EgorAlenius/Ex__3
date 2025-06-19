import express, {Express} from "express";
import path from "path";
import morgan from "morgan"
import router from "./src/index"

const app: Express = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"))
app.use("/", router)


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})