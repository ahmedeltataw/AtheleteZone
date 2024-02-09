export let fetchApi=async (url:string |any)=>{
    try{
        let res = await fetch(url);
        if(!res.ok){
            throw new Error('API request failed');
        }
        let data = await res.json();
        return data
    }catch(err){
        console.log(`this api error : ${err}`)
    }
}

// filter 
// let filterSearch =(data:any[])=>{
//     data.filter((d:any)=> d =="food_name" )
// }