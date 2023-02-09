validateForm = () => {
    let title = document.getElementById("title");
    let sdate = document.getElementById("sdate");
    let edate = document.getElementById("edate");

    let regEx = /^[a-zA-Z][a-zA-Z 0-9]*$/;
    if (title.value == "") {
        document.getElementById('emptyName').style.display = "block";
        return false;
    } else if (!regEx.test(title.value)) {
        document.getElementById('invalidName').style.display = "block";
        return false;
    } else if (sdate.value == "") {
        document.getElementById('emptySdate').style.display = "block";
        return false;
    } else if (edate.value == "") {
        document.getElementById('emptyEdate').style.display = "block";
        return false;
    } else if (edate.value < sdate.value) {
        document.getElementById('invalidDate').style.display = "block";
        return false;
    } else {
        // alert("Your task has been Added");
        document.getElementById('addAlert').style.display = "block";
        return true;
    }

};
showList = () => {
    let list;
    if (localStorage.getItem("list") == null) {
        list = [];
    } else {
        list = JSON.parse(localStorage.getItem("list"));
    }

    for (let i = 0; i < list.length; i++) {
        list[i].add = 1;
        list[i].edit = 0;
    }

    localStorage.setItem("list", JSON.stringify(list));
    list = JSON.parse(localStorage.getItem("list"));

    let html = "";
    list.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + (index + 1) + "</td>";
        html += "<td>" + element.title + "</td>";
        html += "<td>" + element.description + "</td>";
        html += "<td>" + element.sdate + "</td>";
        html += "<td>" + element.edate + "</td>";
        html += "<td>" + element.status + "</td>";
        html +=
            '<td><button id="edit" onclick="editId(' +
            index +
            ')" class="btn btn-primary">Edit</button><button id="delate" onclick="delateList(' +
            index +
            ')" type="button" class="btn-close" aria-label="Close"></button></td>';
        html += "</tr>";
    });
    document.querySelector("#todotable tbody").innerHTML = html;
};

addData = () => {
    if (validateForm() == true) {
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let sdate = document.getElementById("sdate").value;
        let edate = document.getElementById("edate").value;
        let status = document.getElementById("status").value;

        let list;
        if (localStorage.getItem("list") == null) {
            list = [];
        } else {
            list = JSON.parse(localStorage.getItem("list"));
        }

        list.push({
            title: title,
            description: description,
            sdate: sdate,
            edate: edate,
            status: status,
            add: 1,
            edit: 0
        });

        localStorage.setItem("list", JSON.stringify(list));

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("sdate").value = "";
        document.getElementById("edate").value = "";
        document.getElementById("status").value = "";

        showList();
    }
};

delateList = (index) => {
    let result = confirm("Are You sure to Delate this Item");
    // console.log(result);
    if (result) {
        if (localStorage.getItem("list") == null) {
            list = [];
        } else {
            list = JSON.parse(localStorage.getItem("list"));
        }
        list.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(list));
        showList();
        document.getElementById("delateAlert").style.display = "block";
        return true;
    } else {
        return false;
    }
};

editId = (index) => {
    console.log(index);
    list = JSON.parse(localStorage.getItem("list"));

    list[index].add = 0;
    list[index].edit = 1;

    localStorage.setItem("list", JSON.stringify(list));

    window.location.assign("index.html");
}
editList = (index) => {
    document.getElementById("addbtn").style.display = "none";
    document.getElementById("update").style.display = "inline-block";
    document.getElementById("reset").style.display = "none";

    if (localStorage.getItem("list") == null) {
        list = [];
    } else {
        list = JSON.parse(localStorage.getItem("list"));
    }

    document.getElementById("title").value = list[index].title;
    document.getElementById("description").value = list[index].description;
    document.getElementById("sdate").value = list[index].sdate;
    document.getElementById("edate").value = list[index].edate;
    document.getElementById("status").value = list[index].status;

    document.querySelector("#update").onclick = function () {
        // if (validateForm() == true) {
        list[index].title = document.getElementById("title").value;
        list[index].description = document.getElementById("description").value;
        list[index].sdate = document.getElementById("sdate").value;
        list[index].edate = document.getElementById("edate").value;
        list[index].status = document.getElementById("status").value;
        // }

        list[index].add = 1;
        list[index].edit = 0;

        localStorage.setItem("list", JSON.stringify(list));

        // console.log("done")
        document.getElementById("title").value = " ";
        document.getElementById("description").value = " ";
        document.getElementById("sdate").value = " ";
        document.getElementById("edate").value = " ";
        document.getElementById("status").value = " ";
        // alert("Task has been Updated");
        document.getElementById("updateAlert").style.display = "block";
        showList();
        // console.log("done")
    };
};

routePage = () => {
    window.location.assign("list.html");
}

check = () => {
    list = JSON.parse(localStorage.getItem("list"));

    let indexNumber = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i].add == 0 && list[i].edit == 1) {
            indexNumber = i;
            console.log(indexNumber);
            editList(indexNumber);
            break;
        }

    }
}

clearVelidation = () => {
    document.getElementById("emptyName").style.display = "none";
    document.getElementById("invalidName").style.display = "none";
    document.getElementById("emptySdate").style.display = "none";
    document.getElementById("emptyEdate").style.display = "none";
    document.getElementById("invalidDate").style.display = "none";
    document.getElementById('addAlert').style.display = "none";
    document.getElementById("updateAlert").style.display = "none";
    document.getAnimations("delateAlert").style.display = "none";



}
