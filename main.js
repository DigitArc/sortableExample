// CSS IMPORT
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

// Default SortableJS
import Sortable from "sortablejs";
//JQUERY
import $ from "jquery";

// DATA
import { people } from "./data";
console.log(people);

const listContainer = $("#list-container");
const mainContainer = $.parseHTML(
  `<ul data-list="main-list" class="list-group"></ul>`
)[0];

people.map((item) => {
  if (item.name) {
    mainContainer.append(
      $.parseHTML(`<li class="list-group-item">${item.name}</li>`)[0]
    );
  }
  if (item.categoryName) {
    const childrenGroupWrapper = $.parseHTML(
      `<li class="list-group-item"><h3 class="mb-3">${item.categoryName}</h3></li>`
    )[0];
    const childrenGroup = $.parseHTML(
      `<ul data-list="${item.categoryName}" class="list-group pb-5 pt-5"></ul>`
    )[0];
    item.children.map((child) =>
      childrenGroup.append(
        $.parseHTML(`<li class="list-group-item">${child.name}</li>`)[0]
      )
    );
    childrenGroupWrapper.append(childrenGroup);
    mainContainer.append(childrenGroupWrapper);
  }
});
listContainer.append(mainContainer);

const opts = {
  group: "shared",
  onEnd: (e) => {
    const movedItem = $(e.item).text();
    const from = $(e.from).attr("data-list");
    const to = $(e.to).attr("data-list");

    let removedElement;
    for (let i = 0; i < people.length; i++) {
      if (people[i]["name"] && people[i]["name"] === movedItem) {
        removedElement = people.splice(i, 1);
      } else if (
        people[i]["categoryName"] &&
        people[i]["categoryName"] === from
      ) {
        removedElement = people[i]["children"].splice(
          people[i]["children"].findIndex((item) => item.name === movedItem),
          1
        );
      }
    }

    if (to === "main-list") {
      people.splice(e.newDraggableIndex, 0, ...removedElement);
    } else {
      for (let i = 0; i < people.length; i++) {
        if (people[i]["categoryName"] && people[i]["categoryName"] === to) {
          people[i]["children"].splice(
            e.newDraggableIndex,
            0,
            ...removedElement
          );
        }
      }
    }
    console.log(people);

    //console.log(people.splice(people.indexOf(movedItem), 1));
    //console.log(people);
  },
};

const items = $(".list-group");
Sortable.create(items[0], opts);
Sortable.create(items[1], opts);
Sortable.create(items[2], opts);
console.log(items[1]);
// items.map((item) => Sortable.create(item, opts));
// const items2 = $("#items-2")[0];
// Sortable.create(items, opts);
// Sortable.create(items2, opts);
