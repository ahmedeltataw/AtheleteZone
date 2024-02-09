
import data from "../data/food.json"
let closeBtn = document.querySelector("#AddFoodModel .icon-close") as HTMLButtonElement;
let addBtn = document.querySelector("#AddFoodModel .add") as HTMLButtonElement;
let tbody: HTMLTableRowElement | any;
let tfoot: HTMLTableRowElement | any;
let rows: HTMLTableRowElement | any;
let Model: HTMLDivElement | any = document.getElementById("AddFoodModel");
let title: any = document.querySelector("#AddFoodModel .showTitle");
let List = document.querySelector("#AddFoodModel .list") as HTMLUListElement;
let Search = document.getElementById("inputSearch") as HTMLInputElement
let q = document.getElementById("quantity") as HTMLInputElement
let kcal: any = document.getElementById("calories") as HTMLInputElement
let f: number = 0;
let p: number = 0;
let c: number = 0;
let searching = document.querySelector("#AddFoodModel .searching") as HTMLButtonElement
//
let getBmr: any = localStorage.getItem("getBmr")
let getUserName: any = localStorage.getItem("UserName")
let activeLevel = localStorage.getItem('activeLevel')
let weigh = localStorage.getItem('weigh')

// calc carp , protein,fat
let carp: number;
let protein: number;
let fat: number;



let nutrients = (() => {
    switch (activeLevel) {
        case "NotVeryActive 1.2":
            carp = 4 * (Number(weigh))
            protein = .75 * (Number(weigh))
            break;
        case "LightlyActive 1.375":
            carp = 6 * (Number(weigh))
            protein = 1 * (Number(weigh))
            break;
        case "Active 1.55":
            carp = 8 * (Number(weigh))
            protein = 1.2 * (Number(weigh))
            break;
        case "VeryActive 1.725":
            carp = 10 * (Number(weigh))
            protein = 2 * (Number(weigh))
            break;
        default:
            carp = 4 * (Number(weigh))
            protein = .75 * (Number(weigh));
    }
    fat = (Number(getBmr) * .25) / 9

})();
// open model
let openModel = (button: any) => {
    if (Model) Model.classList.add("open")
    let table = button.closest('table');
    tbody = table.querySelector("tbody")
    tfoot = table.querySelector("tfoot tr");
    console.log(tfoot)
    rows = table.getElementsByTagName("tr");
    let tableTitle = table.querySelector('.food-title').textContent;
    title.innerHTML = `add ${tableTitle}`
    setTimeout(() => {
        if (Model) Model.classList.add("effect")
    }, 50)

}
// close model
let closeModel = () => {

    if (Model) Model.classList.remove("effect")
    setTimeout(() => {
        if (Model) Model.classList.remove("open");

    }, 300)
    if (Search) Search.value = ''
    if (q) q.value = ''
    if (kcal) kcal.value = ''

}

closeBtn.onclick = closeModel;
//remove row
function deleteRow2(button: any) {
    // Get the row to delete
    var row = button.closest("tr");
    // Delete the row
    row.remove();
}
// all row calc total 
let calcTotal = (idxCol: number, mins: boolean) => {
    let newCell = tfoot.cells[idxCol];
    console.log(newCell)
    let total: number = 0;

    for (let i = 1; i < rows.length - 1; i++) {
        let td = rows[i].getElementsByTagName("td")[idxCol]
        console.log(td)

        let values: any = Number(td.innerText)
        // console.log(values)
        total += values;
    }
    newCell.innerHTML = total.toString();
    if (mins) {
        let result = total;
        for (let i = 1; i < rows.length - 1; i++) {
            let td = rows[1].getElementsByTagName("td")[idxCol]

            // console.log(td )
            let values = Number(td.innerText)

            // console.log(values)
            result -= values;
        }
        newCell.innerHTML = total.toString()
    }

}

// total kcal food 
function calculateTotalKcal() {
    let totalFoodKcal: number = 0;
    let totalKca = document.querySelectorAll(".totalKcal") as NodeListOf<HTMLTableCellElement>;
    
    for (let i = 0; i < totalKca.length; i++) {
        let td = totalKca[i].innerText.trim();
        totalFoodKcal += Number(td);
        localStorage.setItem("allTotal" , totalFoodKcal.toString())
    }
}


// add row value

let addRowValue = (FValue: number, CValue: number, PValue: number) => {

    let getKcalValue: any;
    if (kcal) getKcalValue = kcal.value
    let getSearchValue: any;
    if (Search) getSearchValue = Search.value

    let newRow = tbody.insertRow();
    let fristCell = newRow.insertCell(0);
    fristCell.setAttribute("class", "food-type")
    fristCell.innerHTML = getSearchValue;
    newRow.insertCell(1).innerHTML = getKcalValue;
    newRow.insertCell(2).innerHTML = CValue.toString();
    newRow.insertCell(3).innerHTML = PValue.toString();
    newRow.insertCell(4).innerHTML = FValue.toString();
    let deleteRow = newRow.insertCell(5);
    deleteRow.setAttribute("class", "deleteRow")
    deleteRow.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
	<path fill="currentColor" d="M20 10.5v.5h8v-.5a4 4 0 0 0-8 0m-2.5.5v-.5a6.5 6.5 0 1 1 13 0v.5h11.25a1.25 1.25 0 1 1 0 2.5h-2.917l-2 23.856A7.25 7.25 0 0 1 29.608 44H18.392a7.25 7.25 0 0 1-7.224-6.644l-2-23.856H6.25a1.25 1.25 0 1 1 0-2.5zm-3.841 26.147a4.75 4.75 0 0 0 4.733 4.353h11.216a4.75 4.75 0 0 0 4.734-4.353L36.324 13.5H11.676zM21.5 20.25a1.25 1.25 0 1 0-2.5 0v14.5a1.25 1.25 0 1 0 2.5 0zM27.75 19c.69 0 1.25.56 1.25 1.25v14.5a1.25 1.25 0 1 1-2.5 0v-14.5c0-.69.56-1.25 1.25-1.25" />
</svg>
    `;

    let deleteTr: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".deleteRow")


    if (deleteTr) {
        deleteTr.forEach((btn: HTMLButtonElement) => {
            btn.addEventListener("click", function (e: Event) {
                let clicked: any = e.target;
                deleteRow2(clicked)
                calcTotal(1, true)
                calcTotal(2, true)
                calcTotal(3, true)
                calcTotal(4, true)
                calculateTotalKcal()
            })
        })
    }


    calcTotal(1, false)
    calcTotal(2, false)
    calcTotal(3, false)
    calcTotal(4, false)
    calculateTotalKcal()
}



searching.addEventListener("click", async function () {

    let GetValue: any = Search.value.toLowerCase();

    let listShow: number = 0;
    if (GetValue !== "" && GetValue !== null) {
        List.innerHTML = ""
        if (q) q.value = ""
        if (kcal) kcal.value = ""
        data.forEach((item: any) => {

            if (item.food_name.toLowerCase() === GetValue && listShow < 5) {
                let listItem = document.createElement('li');
                listItem.textContent = item.food_name;
                let smallItem = document.createElement('small');
                smallItem.textContent = `${item.quantity} , ${item.calories} calories`
                List.appendChild(listItem);
                listItem.appendChild(smallItem)
                listItem.addEventListener("click", function () {
                    Search.value = item.food_name + "," + item.quantity;
                    if (q) q.value = `1`;

                    if (kcal) kcal.value = item.calories;
                    List.innerHTML = '';
                })
                listShow++;
                c = item.nutrients.carp;
                p = item.nutrients.protein;
                f = item.nutrients.fat;
                q.addEventListener("change", function () {
                    if (Number(q.value) > 1) {
                        if (kcal) kcal.value = Number(item.calories) * Number(q.value);
                        c = Number(item.nutrients.carp) * Number(q.value);
                        p = Number(item.nutrients.protein) * Number(q.value);
                        f = Number(item.nutrients.fat) * Number(q.value);
                    } else {
                        if (kcal) kcal.value = Number(item.calories) * Number(q.value);
                        c = Number(item.nutrients.carp) * Number(q.value);
                        p = Number(item.nutrients.protein) * Number(q.value);
                        f = Number(item.nutrients.fat) * Number(q.value);
                    }
                })

            } else (
                console.log(false)
                //make not found list
            )
        })
        List.classList.add("open")

    } else {
        List.classList.remove("open")
    }
})









addBtn.onclick = function () {
    addRowValue(f, c, p)

};

let buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".clicked")
buttons.forEach((btn: any) => {
    btn.addEventListener("click", function (e: Event) {
        let clicked: any = e.target
        openModel(clicked)
    });
})




