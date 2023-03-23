window.onload = function() {
    const container = document.getElementById("container");
    const loading = document.getElementById("loading");

    fetch(baseURL + "/customAPI/v1/user")
    .then((data) => data.json())
    .then((data) => {
        data.map(user => {
            addUser(user);
        });
        loading.remove();
    }).catch((e) => {
        alert(e.message);
    });
}

function elementUtil(tag, content = "") {
    const element = document.createElement(tag);
    if(Array.isArray(content)) content.map(ele => element.appendChild(ele));
    else element.innerHTML = content;

    return element;
}

function clearForm(form) {
    for(let element of form) element.value = '';
}

function addUser(user) {
    const col1 = elementUtil("td", user.groupNo);
    const col2 = elementUtil("td", user.groupName);
    let names = user.members[0];
    user.members.map((name, idx) => {
        if(idx == 0) return;
        names = names + ", " + name;
    })
    const col3 = elementUtil("td", names);
    const col4 = elementUtil("td", user.projectName);
    const del = elementUtil("button");
    del.classList.add("fa", "fa-trash", "py-2", "border-0", "rounded-circle", "bg-danger", "text-white");
    del.addEventListener("click", deleteUser);
    del.setAttribute("rowID", user.groupNo);
    const col5 = elementUtil("td", [del]);
    const row = elementUtil("tr", [col1, col2, col3, col4, col5]);
    row.setAttribute("id", user.groupNo);
    container.appendChild(row);
}

function createUser(e) {
    const form = document.getElementById("createUserForm").elements;
    let members = [];
    for(let member of form["members[]"]) {
        if(member.value != null && member.value != undefined && member.value != '') members.push(member.value);
    }

    const data = {
        "groupNo": form.groupNo.value,
        "groupName": form.groupName.value,
        "members": members, 
        "projectName": form.projectName.value
    }
    
    fetch(baseURL + "/customAPI/v1/user", {
        "method": "post", 
        headers: {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data),
    }).then((response) => {
        alert("Successfully Added Team.");
        addUser(data);
        clearForm(form);
    }).catch(err => alert(err.message))
}

function deleteUser(e) {
    const groupNo = e.target.getAttribute('rowID');
    const url = baseURL + "/customAPI/v1/user/" + groupNo;
    fetch(url, {
        "method": "delete",
        "headers": {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if(response.status == 200) {
            document.getElementById(groupNo).remove();
            alert("User Deleted Successfully");
        }
        else alert("Could Not Delete");
    }).catch((err) => alert(err.message));
}