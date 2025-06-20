
const submitButton = document.getElementById("submitButton")
submitButton.addEventListener("click", async () => {

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const person = {
        "name": name.value,
        "email": email.value
    };

    const userData = await fetch("http://localhost:3000/users", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(person)
    })
    const responceFromUser = await userData.json()
    console.log(responceFromUser)
    name.value = ""
    email.value = ""
    //document.getElementById("submitButton").disabled = false
})

const addPoemButtonFromAPI = document.getElementById("getUsers")
addPoemButtonFromAPI.addEventListener("click", async function () {

    const usersData = await fetch("http://localhost:3000/users")
    const usersJson = await usersData.json()
    console.log(usersData);

    var ul = document.getElementById("userList");

    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    }
    
    var ul = document.getElementById("userList");
    usersJson.forEach(user_ => {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(JSON.stringify(user_.name+" - "+user_.email)));
        ul.appendChild(li);
    });
})
