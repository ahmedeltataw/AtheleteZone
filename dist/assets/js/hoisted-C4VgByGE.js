import"./hoisted-lVVcYyyN.js";let a=document.querySelectorAll(".AE_Scrolling");const n={threshold:.3},l=new IntersectionObserver(e=>{e.forEach(t=>{const s=t.target.getAttribute("data-Scrolling-duration"),r=s?parseInt(s):0,o=t.target.getAttribute("data-Scrolling-delay"),i=o?parseInt(o):0;t.isIntersecting?(t.target.style.transition=` ${r}ms ease-in-out  `,setTimeout(()=>{t.target.classList.add("visible")},i)):setTimeout(()=>{t.target.classList.remove("visible")},i)})},n);a.forEach(e=>{l.observe(e)});
