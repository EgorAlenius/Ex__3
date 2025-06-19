import express, {Express} from "express";
import path from "path";
import morgan from "morgan"
import fs from "fs"

// Create type
type TUsers = {
    name : string;
    email : string;
};
// Create users empty list
let users: TUsers [] = []

fs.readFile("data/users.json", "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
        console.error(err)
        return
    }
    try {
        users = JSON.parse(data)
        console.log("Has been read: "+ JSON.stringify(users));
    } catch (error: any) {
        console.error(`Error parsing JSON: ${error}`)
    }
})


const app: Express = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"))


app.get('/hello', function(req, res) {
	res.send({
        msg: "Hello world!"
    });
});

app.get('/echo/:id', function(req, res) {
    
    console.log(req.url.slice(6));
	res.send({
        id:req.url.slice(6)
    });
});


app.post('/sum/', function (req, res) { 
    let mass=req.body.numbers;
    mass=mass.slice(1, mass.length-1);
    let arr=mass.split(',').map(Number);
    let sum=0;
    for (let i=0; i<arr.length; i++){
        sum+=Number(arr[i]);
    }
    
    console.log(sum);
    res.send({"sum":sum});
});

app.post('/users/', function requestHandler(req, res) {

    res.send(req.body);
    users.push(req.body)
    console.log(users);

    fs.writeFile("data/users.json", JSON.stringify(users), (err: NodeJS.ErrnoException | null) => {
        if (err) {
            console.error(err)
            return
        }
        res.json(users)
    }) 
});

app.get('/users', function(req, res) {
	//res.send(users);
    //res.status(201).json(users);
    res.status(201).send(users);
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})