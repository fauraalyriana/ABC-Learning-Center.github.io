function save(){
    console.log("save called");
    let users = localStorage.getItem("users");
    users = JSON.parse(users);
    if (users == null) {
        users = [];
    }
    var user=JSON.stringify({
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        phone:document.getElementById("phone").value,
        nation:document.getElementById("nation").value,
        course:document.getElementById("course").value,
        class:document.getElementById("class").value,
    })
    users.push(user);
    localStorage.setItem("users",JSON.stringify(users));
}