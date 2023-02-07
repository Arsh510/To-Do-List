
let taskObj = { items: [] };

let index = 0;

if (localStorage.getItem('obj') == "" || localStorage.getItem('obj' == undefined)) {
    localStorage.setItem('obj', JSON.stringify(taskObj.items));
    index = 0;
}
else {
    index = JSON.parse(localStorage.getItem('obj')).length;
}

addList = () => {
    // document.getElementById("title").hide();
    // document.getElementById("desc").hide();
    // document.getElementById("sdate").hide();
    // document.getElementById("edate").hide();
    // document.getElementById("status").hide();

    var title = document.getElementById("title");
    var desc = document.getElementById("desc");
    var sdate = document.getElementById("sdate");
    var edate = document.getElementById("edate");
    var status = document.getElementById("status");
    var addBtn = document.getElementById("addbtn");
    var editBtn = document.getElementById("editbtn");

    // addBtn.show();
	// editBtn.hide();
	let regEx = /^[a-zA-Z][a-zA-Z 0-9]*$/;
	if (title.value == "") {
		alert("*Name Must not be empty");
	}
	else if (!regEx.test(title.value)) {
		alert("*Invalid Name(Must start with alphabet)");
	}
	else if (sdate.value == "") {
		alert("*Start date must not be empty");
	}
	else if (edate.value == "") {
		alert("*End date must not be empty");
	}
	else if (edate.value < sdate.value) {
		alert("*End date cant be before Start date");
	}
	else {
		alert('Your task has been added');
		listObj(index, title, desc, status, sdate, edate);
		index++;
	}


}

listObj = (taskIndex, taskTitle, taskDesc, taskSdate, taskEdate, taskStatus) => {

    itemId = "item" + taskIndex;

    let itemObj = { index: index, id: itemId, name: taskTitle.value, description: taskDesc.value, status: taskSdate.value, start: taskEdate.value, end: taskStatus.value, add: 1, edit: 0 };

    taskObj.items = JSON.parse(localStorage.getItem('obj'));

    console.log(taskObj);
    taskObj.items.pu(itemObj);
    console.log(taskObj);
    localStorage.removeItem('obj');
    localStorage.setItem('obj', JSON.stringify(taskObj.items));

    var title = document.getElementById("title");
    var desc = document.getElementById("desc");
    var sdate = document.getElementById("sdate");
    var edate = document.getElementById("edate");
    var status = document.getElementById("status");

    title.val('');
    desc.val('');
    sdate.val('');
    edate.val('');
    status.val('Active');
}

displayList = () => {
    taskObj.items = JSON.parse(localStorage.getItem('obj'));
    console.log(taskObj);

    for (let i = 0; i < taskObj.items.length; i++) {
        taskObj.items[i].edit = 0;
        taskObj.items[i].add = 1;
    }
    localStorage.removeItem('obj');
    localStorage.setItem('obj', JSON.stringify(taskObj.items));
    taskObj.items = JSON.parse(localStorage.getItem('obj'));

    let container = document.querySelector("#container");

    for (let i = 0; i < taskObj.items.length; i++) {
        let itemPointer = taskObj.items[i];

        // container

        let itemContainer = document.createElement('div');
        itemContainer.setAttribute("id", itemPointer.id);
        container.appendChild(itemContainer);
        itemContainer.setAttribute('class', 'itemContainer')

        //index

        let itemNo = document.createElement('div');
        let itemNoText = document.createTextNode(itemPointer.index + 1);
        itemNo.appendChild(itemNoText);
        itemNo.setAttribute('class', 'list-item');
        //itemNo.style.width = '5%';

        //name

        let itemName = document.createElement('div');
        let itemNameText = document.createTextNode(itemPointer.name);
        itemName.appendChild(itemNameText);
        itemName.setAttribute('class', 'list-item');
        itemName.setAttribute('id', 'name' + itemPointer.index);

        //desc
        let itemDesc = document.createElement('div');
        let itemDescText = document.createTextNode(itemPointer.desc);
        itemDesc.appendChild(itemDescText);
        itemDesc.setAttribute('class', 'list-item');
        itemDesc.setAttribute('id', 'desc' + itemPointer.index);

        //status
        let itemStatus = document.createElement('div');
        let itemStatusText = document.createTextNode(itemPointer.sdate);
        itemStatus.appendChild(itemStatusText);
        itemStatus.setAttribute('class', 'list-item');
        itemStatus.setAttribute('id', 'status' + itemPointer.index);

        //dates

        let startDate = new Date(TaskObj.items[i].start);
        let endDate = new Date(TaskObj.items[i].end);

        let itemStartDate = document.createElement('div');
        let itemSdText = document.createTextNode(startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear());
        itemStartDate.appendChild(itemSdText);
        itemStartDate.setAttribute('id', 'sdate' + itemPointer.index);
        itemStartDate.setAttribute('class', 'list-item');

        let itemEndDate = document.createElement('div');
        let itemEdText = document.createTextNode(endDate.getDate() + "/" + (endDate.getMonth() + 1) + "/" + endDate.getFullYear());
        itemEndDate.appendChild(itemEdText);
        itemEndDate.setAttribute('id', 'edate' + itemPointer.index);
        itemEndDate.setAttribute('class', 'list-item');

        itemContainer.appendChild(itemNo);
        itemContainer.appendChild(itemName);
        itemContainer.appendChild(itemDesc);
        itemContainer.appendChild(itemStartDate);
        itemContainer.appendChild(itemEndDate);

    }

}

