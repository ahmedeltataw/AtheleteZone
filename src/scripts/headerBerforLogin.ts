let mobileResponsive = document.querySelector("#mobileResponsive") as HTMLUListElement;
let openMenu = document.querySelector(".icon-nav-base") as HTMLButtonElement;
let beforeLogin = document.querySelectorAll(".beforeLogin li a")
let mobileMenuLinks = document.querySelectorAll(".mobileMenu li ")
let Header  = document.querySelector("header") as Element

//********function**********
//open menu

function calcMaxHeight(): number {
    let maxHeight: number = 0;
    mobileResponsive.classList.add("open")
    mobileMenuLinks.forEach((link: any) => {
        maxHeight += link.clientHeight
    })

    return maxHeight;
}
function slideAnimation(dir: 'up' | 'down'): void {
    let height = dir === 'down' ? 0 : calcMaxHeight();
    let offsetHeader:number= Header.clientHeight;
    let targetHeight = dir === 'down' ? calcMaxHeight() : 0;
    let speed = dir === 'down' ? (targetHeight / (targetHeight * 0.1)) : (height / (height * 0.1));
    let animation = setInterval(() => {
        if ((height <= 0 && dir === 'up') || (height >= targetHeight && dir === 'down')) {
            clearInterval(animation);
            if (dir === 'up') {
                mobileResponsive.style.height = '';
                
                setTimeout(() => {
                    mobileResponsive.classList.remove("open")
                    mobileResponsive.style.top = '';
                }, 300);
            };

        } else {
            height += dir === 'down' ? speed : -speed;
            if (height > targetHeight && dir === 'down') {
                height = targetHeight;
            }
            mobileResponsive.style.height = `${height}px`;
            mobileResponsive.style.top = `${offsetHeader}px`;
        }
    }, 8)

};
function OpenMenu(): void {
    openMenu?.classList.toggle("active");
    let isOpen = openMenu.classList.contains("active");
    openMenu.setAttribute("aria-expanded", isOpen.toString());
    openMenu.setAttribute("aria-label", isOpen ? 'open menu' : 'close menu');
    isOpen ? slideAnimation('down') : slideAnimation('up')

}
openMenu?.addEventListener("click", OpenMenu);

// add active link
beforeLogin.forEach((link: any) => {
    if (link.getAttribute("href") == window.location.pathname) {
        link.classList.add("active")
    }
})
// ******************

window.addEventListener("scroll" , ()=>{
    if(window.scrollY >= 200){
        Header.classList.add("scroll")
    }else{
        Header.classList.remove("scroll")
    }
})
// window.addEventListener("load" ,()=>{
//     console.log("a")
// })