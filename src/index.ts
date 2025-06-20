import {Request, Response, Router} from "express"
import fs from "fs"

const router: Router = Router()

type TUsers = {
    name : string;
    email : string;
};

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

router.get('/hello', function(req, res) {
	res.send({msg: "Hello world!"});
});

router.get('/echo/:id', function(req, res) {
	res.send({
        id:req.url.slice(6)
    });
});


router.post('/sum/', function (req, res) { 
    /* let mass: string 
    mass=req.body.numbers.toString()
    mass=mass.substring(1, mass.length-1);

    let arr: number [] =[]
    arr=mass.split(',').map(Number);

    let sum: number =0; */
    let mass=req.body.numbers.toString()
    console.log(mass)
    mass=mass.substring(1, mass.length-1);

    let arr=mass.split(',').map(Number);

    let sum =0; 

    for (let i=0; i<arr.length; i++){
        sum+=Number(arr[i]);
    }
    res.send({"sum":sum});
});

router.post('/users/', function requestHandler(req, res) {

    res.send(req.body);
    users.push(req.body)
    console.log("Added user: "+users);

    fs.writeFile("data/users.json", JSON.stringify(users), (err: NodeJS.ErrnoException | null) => {
        if (err) {
            console.error(err)
            return
        }
        res.json(users)
        res.send({message: "User successfully added"})
    }) 
});

router.get('/users', function(req, res) {
    res.status(201).send(users);
});

export default router