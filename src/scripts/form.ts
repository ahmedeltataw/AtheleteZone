

const loginFormInputs:NodeListOf<HTMLInputElement> = document.querySelectorAll("#loginForm input");
const formLoginButton:any = document.querySelector(".formLoginId")  ;
export function validateInput(input: HTMLInputElement  |any) :boolean {
    const value = input?.value;
    let valueTrim: any='';
    
    
    if (value) {
        valueTrim = value.trim();  // Access 'trim' only if 'value' is truthy
    }
    let errorMassage= input.parentElement?.nextElementSibling as HTMLParagraphElement | null;
    
    const label = input.nextElementSibling;

    if (valueTrim == "" ) {
        
        input.classList.add("error");
        label?.classList.remove("effect");
        input.classList.remove("valid")
        
        if(errorMassage){
            errorMassage.style.display = "block";
            switch (input.id){
                case 'name':
                    errorMassage.innerText = 'Please enter an first name';
                    break;
                case 'date':
                    errorMassage.innerText = 'Please enter a  date of birth';
                    break;
                case 'EmailAddressLogin':
                    case 'signUpEmail':
                    errorMassage.innerText = 'Please enter an email address';
                    break;
                case 'passwordLogin':
                    case 'signUpPassword':
                    errorMassage.innerText = 'Please enter a password';
                    break;
                case 'Height':
                    errorMassage.innerText = 'Please enter your height.';
                    break;
                case 'weigh':
                    errorMassage.innerText = 'Please enter your weigh.';
                    break;
                case 'GoalsWeight':
                    errorMassage.innerText = 'Please enter your goal weigh.';
                    break;
                default: errorMassage.innerText = 'Please fill this filed.';
                
            }
        }
        return false;
    } else {
        if(valueTrim){
            input.classList.remove("error");
            input.classList.add("valid")
        }
        
        label?.classList.add("effect");
        if(errorMassage){
            errorMassage.style.display = "none";
        errorMassage.innerText = '';
        }
        return true;
    }
}

export function validateForm(inputs:NodeListOf<HTMLInputElement> |any) {
    let isValid = true;

    inputs.forEach((input: HTMLInputElement) => {
        
        

        isValid = validateInput(input) && isValid;
    });

    return isValid;
}

export const validateInputBlur =(inputs:NodeListOf<HTMLInputElement> )=>{
    inputs.forEach((input: HTMLInputElement) => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });
}
validateInputBlur(loginFormInputs);

formLoginButton?.addEventListener("click", function (e: Event) {
    e.preventDefault();
    
    const isValid = validateForm(loginFormInputs);
   
    if (isValid) {
        // Redirect to the home page
        window.location.href = '/'; 
    }

   
});





