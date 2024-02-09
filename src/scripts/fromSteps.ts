import { validateInput, validateInputBlur, validateForm } from "../scripts/form";
import { defaultOptionAndChangeOption, getUserInfo, getBmr } from "../scripts/userDetails";
let taps: NodeListOf<HTMLInputElement> | any = document.querySelectorAll(".taps")
let tapsInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("#signUpForm input")
let prev: any = document?.querySelector(".prevBtn")
let next: any = document?.querySelector(".nextBtn")
let heading: any = document.querySelector(".taps-h1")

let currentTap: number = 0;








//next o move
next.addEventListener("click", (e: Event) => {
    if (next.textContent.includes('Submit')) {
        e.preventDefault();

        next.type = "submit"


        const isValid = validateForm(tapsInputs);
        if (isValid) {
            getUserInfo();
            getBmr();
            
            window.location.href = '/home.html';
            console.log('form send')
        }


    } else {
        nextTap(1)
    }

})

//prev to move
prev.addEventListener("click", () => {

    nextTap(-1)
})


// to show taps 
function Show(n: number) {
    // this is wrong but i make this because i in the army
    if (localStorage.getItem("selectedGoal") == "maintainWeight" && currentTap === 4) {
        currentTap++;
        taps[6].style.display = "none";
    } else {
        if (currentTap === 6) {
            currentTap = currentTap - 1
            taps[4].style.display = "none";
        }
    }

    if (taps[n]) taps[n].style.display = "block";
    if (prev) (n == 0) || (n == (taps.length - 1)) ? prev.style.display = "none" : prev.style.display = "inline";
    n == (taps.length - 1) ? next.innerHTML = "Submit" : next.innerHTML = "Next"
    let p: any = document.querySelector(".born")
    switch (n) {
        case 0:
            heading.innerHTML = `What’s your first name?`
            break;
        case 1:
            heading.innerHTML = `Thanks ${taps[0]?.querySelector('input')?.value}! Now for your goals.`
            break;
        case 2:
            heading.innerHTML = `What is your baseline activity level?`
            break;
        case 3:
            heading.innerHTML = ` Please select which sex we should use to calculate your calorie needs. `;
            p.innerHTML = ` When were you born? `
            break;
        case 4:
            heading.innerHTML = ` Please enter your information accurately `;
            // p.innerHTML = ` When were you born? `
            break;
        case 5:
            heading.innerHTML = ` What is your weekly goal?`;
            // p.innerHTML = ` When were you born? `
            break;
        case 6:
            heading.innerHTML = ` Almost there! Create your account.`;
            // p.innerHTML = ` When were you born? `
            break;
        default: heading.innerHTML = ` sorry bro i'm forget the title `;
    }
}
Show(currentTap);

// to switch next or prev
function nextTap(n: number) {
    // to get current input
    let y = taps[currentTap].getElementsByTagName("input");


    // // to check the current input in the taps  that mean one by one 
    for (let i = 0; i < y.length; i++) {

        // If any field is invalid, set the flag to false
        if ((n == 1 && !validateInput(y[i]))) {
            return false;
        }
    }
    // Hide the current tab: -- to show the next tap
    if (taps[currentTap]) taps[currentTap].style.display = "none";
    //show the next tap
    currentTap += n;

    // Check if navigating to the previous tab:
    if (n === -1 && currentTap >= 0) {
        // Display the correct tab:prev
        Show(currentTap)
    } else if (n === 1 && currentTap < taps.length) {
        // Display the correct tab:next
        Show(currentTap)
    }
    // when  reached the end of the form
    if (currentTap >= (taps.length - 1) || currentTap < 0) {


        window.location.href = "/";
        return false;
    }

}
// to validate input when leave it 
validateInputBlur(tapsInputs);


//option
defaultOptionAndChangeOption()