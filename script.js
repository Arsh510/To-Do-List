validateForm = () => {
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let sdate = document.getElementById("sdate");
    let edate = document.getElementById("edate");
    // let status = document.getElementById("status");

    let regEx = /^[a-zA-Z][a-zA-Z 0-9]*$/;
    if (title.value == "") {
        alert("*Name Must not be empty");
        return false;
    }
    else if (!regEx.test(title.value)) {
        alert("*Invalid Name(Must start with alphabet)");
        return false;

    }
    else if (description.value == "") {
        alert("*descriptionription must not be empty");
        return false;

    }
    else if (sdate.value == "") {
        alert("*Start date must not be empty");
        return false;

    }
    else if (edate.value == "") {
        alert("*End date must not be empty");
        return false;

    }
    else if (edate.value < sdate.value) {
        alert("*End date cant be before Start date");
        return false;

    }
    else {
        alert('Your task has been Added');
        return true;
    }
}
showList = () => {
    let listObj;
    let list = localStorage.getItem("list");
    if (list == null) {
        listObj = [];
    }
    else {
        listObj = JSON.parse(list);
    }
    console.log(listObj);
    let html = "";
    listObj.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.title + "<td>";
        html += "<td>" + element.description + "<td>";
        html += "<td>" + element.sdate + "<td>";
        html += "<td>" + element.edate + "<td>";
        html += "<td>" + element.status + "<td>";
        html += '<td><button id="delate" onclick="delateList(' + index + ')" class="btn btn-danger">Delete</button><button id="edit" onclick="editList(' + index + ')" class="btn btn-primary">Edit</button></td>';

        html += "</tr>";

        document.querySelector("#todotable tbody").innerHTML = html;


    });
}

document.onload = showList()

addData = () => {
    if (validateForm() == true) {
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let sdate = document.getElementById("sdate").value;
        let edate = document.getElementById("edate").value;
        let status = document.getElementById("status").value;

        let listObj;
        let list = localStorage.getItem("list");
        if (list == null) {
            listObj = [];
        }
        else {
            listObj = JSON.parse(list);
        }


        listObj.push({
            title: title,
            description: description,
            sdate: sdate,
            edate: edate,
            status: status,
        });

        localStorage.setItem("list", JSON.stringify(listObj));
        showList();

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("sdate").value = "";
        document.getElementById("edate").value = "";
        document.getElementById("status").value = "";
    }
}

delateList = (index) => {
    let result = confirm("Are You sure to Delate this Item")
    if (result) {
        let listObj;
        let list = localStorage.getItem("list");
        if (list == null) {
            listObj = [];
        }
        else {
            listObj = JSON.parse(list);
        }

        listObj.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(listObj));
        showList();
        return true;
    }
    else {
        return false;
    }
}

editList = (index) => {
    // document.getElementById("add").style.display = "none";
    // document.getElementById("update").style.display = "block";
    let listObj;
    let list = localStorage.getItem("list");
    if (list == null) {
        listObj = [];
    }
    else {
        listObj = JSON.parse(list);
    }

    document.getElementById("title").value = list[index].title;
    document.getElementById("description").value = list[index].description;
    document.getElementById("sdate").value = list[index].sdate;
    document.getElementById("edate").value = list[index].edate;
    document.getElementById("status").value = list[index].status;

    document.querySelector("#edit").onclick = function(){
        if (validateForm() == true) {
            list[index].title = document.getElementById("title").value;
            list[index].description = document.getElementById("description").value;
            list[index].sdate = document.getElementById("sdate").value;
            list[index].edate = document.getElementById("edate").value;
            list[index].status = document.getElementById("status").value;
        }

        localStorage.setItem("list", JSON.stringify(listObj));

        showList();

        document.getElementById("title").value = " ";
        document.getElementById("description").value = " ";
        document.getElementById("sdate").value = " ";
        document.getElementById("edate").value = " ";
        document.getElementById("status").value = " ";


    }


}
