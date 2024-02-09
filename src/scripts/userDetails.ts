//data
import { weeklyGoalOptionsGain, weeklyGoalOptionsLose } from "../data/data";
import type { OptionsGoalWeekly } from "../data/data";
let chooseGoalId: HTMLSelectElement | any = document.querySelector("#chooseGoalSelect");
let chooseGoalSelect: HTMLSelectElement | any = document.querySelector("#weeklyGoal");
let activeLevel: HTMLSelectElement | any = document.querySelector("#activeLevel");
let selectSex: HTMLSelectElement | any = document.querySelector("#selectSex");
let UserName:HTMLInputElement | any = document.getElementById("signUpEmail")



///*********goal option  */
//to change options result to user option 

let ChangeOption: () => void = () => {
    chooseGoalId.addEventListener("change", () => {
        let SelectGoalValue = chooseGoalId.value
        localStorage.setItem("selectedGoal", SelectGoalValue);
        weeklyGoalCheck();
    });
    // active level
    activeLevel.addEventListener("change", () => {
        let SelectGoalValue: any = activeLevel.value
        localStorage.setItem("activeLevel", SelectGoalValue);
    });
    selectSex.addEventListener("change", () => {
        let SelectGoalValue: any = selectSex.value
        localStorage.setItem("selectSex", SelectGoalValue);
    });
}
//calc age
let calcAge: (year: number) => string = (year: number) => {
    var today: any = new Date();

    var birthDate = new Date(year);
    let age: any = today.getFullYear() - birthDate.getFullYear();
    return age
}
//getUserInfo 
let DateUser: any = document.getElementById("date")
let Height: any = document.getElementById("Height");
let weigh: any = document.getElementById("weigh");
export function getUserInfo() {
    let getYear = DateUser.value
    calcAge(getYear)
    let getHeight = Height.value
    let getWeigh = weigh.value
    let getUserName = UserName.value
    console.log(getUserName)
    localStorage.setItem("age", calcAge(getYear));
    localStorage.setItem("height", getHeight);
    localStorage.setItem("weigh", getWeigh);
    localStorage.setItem("UserName", getUserName);

}
export const getBmr= ()=> {
    let age = localStorage.getItem("age");
    let height = localStorage.getItem("height");
    let weight = localStorage.getItem("weigh");
    let type = localStorage.getItem("selectSex");
    let a: any | number ;
    if(type == "Female"){
        a = 655 + (Number(height) * 1.8) + (Number(weight) * 9.6) - (Number(age) * 4.7);
    } else{
        a = 66 + (Number(height) * 5) + (Number(weight) * 13.6) - (Number(age) * 6.8);
    }
    let activeLevelValueNumber: any = localStorage.getItem("activeLevel")?.match(/[\d\.]+/g)?.map(Number)
    let bmr = (a * activeLevelValueNumber[0])
    localStorage.setItem("getBmr", bmr.toFixed(0))
}
// to creat option select 
const weeklyGoalCheck: () => void = () => {
    chooseGoalSelect.innerHTML = ""
    if (localStorage.getItem("selectedGoal") == "gainWeight") {



        weeklyGoalOptionsGain.forEach((options: OptionsGoalWeekly) => {
            const option = document.createElement("option");
            option.value = options.value
            option.text = options.text
            chooseGoalSelect.appendChild(option)
        })
    } else if (localStorage.getItem("selectedGoal") == "loseWeight") {

        weeklyGoalOptionsLose.forEach((options: OptionsGoalWeekly) => {
            const option = document.createElement("option");
            option.value = options.value
            option.text = options.text
            chooseGoalSelect.appendChild(option)
        })
    }
}
// the end function
export const defaultOptionAndChangeOption: () => void = () => {
    localStorage.setItem("selectedGoal", chooseGoalId[0].value);// to default result
    localStorage.setItem("activeLevel", activeLevel[0].value);// to default result
    localStorage.setItem("selectSex", selectSex[0].value);// to default result
    ChangeOption();
    weeklyGoalCheck();
}



