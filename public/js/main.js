
const submitButton = document.getElementById("submitButton")
submitButton.addEventListener("click", async () => {

    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const person = {
        "name": userName.value,
        "email": userEmail.value
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
    userName.value = ""
    userEmail.value = ""
    document.getElementById("submitButton").disabled = false
})

const addPoemButtonFromAPI = document.getElementById("getUser")
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
