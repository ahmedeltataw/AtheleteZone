let ScrollingEl = document.querySelectorAll<HTMLElement>(".AE_Scrolling");


const intersectionOptions = {
    threshold: 0.3 // Adjust the threshold as needed to follow the element viewPort and this value mean when the 70% element show
};

const intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        
        const offsetDuration = entry.target.getAttribute("data-Scrolling-duration");
        const duration = offsetDuration ? parseInt(offsetDuration) : 0;
        
        const offsetDelay = entry.target.getAttribute("data-Scrolling-delay");
        const delay = offsetDelay ? parseInt(offsetDelay) : 0;
        
        
        if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.transition=` ${duration}ms ease-in-out  `
            
            
            setTimeout(()=>{
                entry.target.classList.add("visible");
            },delay)
            
        } else {
            
            setTimeout(()=>{
                entry.target.classList.remove("visible");
            },delay)
        }
    });
}, intersectionOptions);

ScrollingEl.forEach(element => {
    intersectionObserver.observe(element);
});
//
// function handleInitialScrollState() {
//     ScrollingEl.forEach(element => {
//         const offsetAttribute = element.getAttribute("data-Scrolling-offset");
//         const offset = offsetAttribute ? parseInt(offsetAttribute) : 0;

//         if (intersectionObserver.takeRecords().some(entry => entry.target === element && entry.isIntersecting)) {
//             element.classList.add("visible");
//         } else {
//             element.classList.remove("visible");
//         }
//     });
// }
// document.addEventListener("DOMContentLoaded" , ()=>{
//     handleInitialScrollState();
    
// })