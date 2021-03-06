function addItem() {
    var item = $("#newItem").val();
    $("#newItem").val("");

    var items = JSON.parse(localStorage.getItem("toDoList"));
    if (items === null) {
        items = [];
    }
    items.push(item);
    localStorage.setItem("toDoList", JSON.stringify(items));

    refreshLists();
}

function getItems() {
    var itemId;

    var items = JSON.parse(localStorage.getItem("toDoList"));

    if (items === null || items.length === 0) {
        $("#toDoList").append("<span class='text-muted'>Start by adding a few tasks</span>");
    } else {
        for (var i = 0; i < items.length; i++) {
            itemId = "item_" + i;
            $("#toDoList").append("<div class='m-3'> <input id='" + itemId + "' type='checkbox' onchange='statusChange(this.id);'/>&#160; <label for='" + itemId + "'>" + items[i] + "</label> <button class='btn btn-link btn-sm' id='" + itemId + "' onclick='deleteItem(this.id);'><img src='icons/trash-can.png' width='25' height='25' alt='trash logo'></button> <br> </div>");
        }
    }
    
    var itemsDone = JSON.parse(localStorage.getItem("doneList"));

    if (itemsDone === null || itemsDone.length === 0) {
        $("#doneList").append("<span class='text-muted'>You haven't finished any tasks yet</span>");
    } else {
        for (var j = 0; j < itemsDone.length; j++) {
            itemId = "item_" + j;
            $("#doneList").append("<div class='m-3'> <input id='" + itemId + "' type='checkbox' onchange='statusChange(this.id);' checked/>&#160; <label for='" + itemId + "' class='text-decoration-line-through'>" + itemsDone[j] + "</label> <br> </div>");
        }
    }
}

function statusChange(itemId) {
    var items;
    var itemsDone;

    if ($('#' + itemId).is(":checked")) {
        itemId = itemId.split('_');
        items = JSON.parse(localStorage.getItem("toDoList"));
        itemsDone = JSON.parse(localStorage.getItem("doneList"));

        if (itemsDone === null) {
            itemsDone = [];
        }

        itemsDone.push(items[itemId[1]]);
        localStorage.setItem("doneList", JSON.stringify(itemsDone));

        items.splice(itemId[1], 1);
        localStorage.setItem("toDoList", JSON.stringify(items));
    } else {
        itemId = itemId.split('_');
        items = JSON.parse(localStorage.getItem("toDoList"));
        itemsDone = JSON.parse(localStorage.getItem("doneList"));

        if (items === null) {
            items = [];
        }

        items.push(itemsDone[itemId[1]]);
        localStorage.setItem("toDoList", JSON.stringify(items));

        itemsDone.splice(itemId[1], 1);
        localStorage.setItem("doneList", JSON.stringify(itemsDone));
    }

    refreshLists();
}

function deleteItem(itemId) {
    itemId = itemId.split('_');
    var items = JSON.parse(localStorage.getItem("toDoList"));
    
    items.splice(itemId[1], 1);
    localStorage.setItem("toDoList", JSON.stringify(items));

    refreshLists();
}

function refreshLists() {
    $("#toDoList").empty();
    $("#doneList").empty();

    getItems();
}

getItems();