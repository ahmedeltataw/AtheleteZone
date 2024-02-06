export  interface navBeforeLogin{
    title:string,
    path:string
}

export  const BeforeLogin:navBeforeLogin[]=[
    {
        title:"AtheleteZone",
        path:'/'
    },
    {
        title:"About us",
        path:"/About"
    },
    {
        title:"blog",
        path:"/blog"
    },
    {
        title:"workout",
        path:"/workout"
    },
    {
        title:"contact us",
        path:"/contact"
    }

];
//*************** */
export interface CardType {
	title: string;
	body: string;
	href: string;
	src:any,
	alt:string,
	aria:string,
	q:number,
    delay?:number | string,
    duration?:number | string,
}
import cooking from "../assets/cooking.jpg"
import food from "../assets/food.jpg"
import fitness from "../assets/fitness.jpg"
export const CardData:CardType[] =[
    {
        title:"workouts",
        body:"workouts recommendation for healthy life style",
        href:"/",
        src:fitness,
        alt:" Nutrient",
        aria:"how calc the Nutrient food",
        q:50,
        delay:200,
        duration:500
    },
    {
        title:"Nutrient",
        body:"Nutrient recommendation for healthy life style",
        href:"/",
        src:cooking,
        alt:" Nutrient",
        aria:"how calc the Nutrient food",
        q:50,
        delay:300,
        duration:550
    },
    {
        title:"Food plan",
        body:"add your daily food",
        href:"/",
        src:food,
        alt:" Nutrient",
        aria:"how calc the Nutrient food",
        q:50,
        delay:400,
        duration:600
    },
    {
        title:"workouts",
        body:"workouts recommendation for healthy life style",
        href:"/",
        src:fitness,
        alt:" Nutrient",
        aria:"how calc the Nutrient food",
        q:50,
        delay:500,
        duration:650
    },
    {
        title:"Nutrient",
        body:"Nutrient recommendation for healthy life style",
        href:"/",
        src:cooking,
        alt:" Nutrient",
        aria:"how calc the Nutrient food",
        q:50,
        delay:600,
        duration:700
    },
    {
        title:"Food plan",
        body:"add your daily food",
        href:"/",
        src:food,
        alt:" Nutrient",
        aria:"how calc the Nutrient food",
        q:50,
        delay:700,
        duration:700
    },
]
export const workoutData:CardType[] =[
    {
        title:"workouts",
        body:"workouts recommendation for healthy life style",
        href:"/",
        src:fitness,
        alt:" Nutrient",
        aria:"how calc the Nutrient food",
        q:50,
        delay:200,
        duration:500
    },
    {
        title:"workouts",
        body:"workouts recommendation for healthy life style",
        href:"/",
        src:fitness,
        alt:" Nutrient",
        aria:"how calc the Nutrient food",
        q:50,
        delay:200,
        duration:500
    },
    {
        title:"workouts",
        body:"workouts recommendation for healthy life style",
        href:"/",
        src:fitness,
        alt:" Nutrient",
        aria:"how calc the Nutrient food",
        q:50,
        delay:200,
        duration:500
    },
    {
        title:"workouts",
        body:"workouts recommendation for healthy life style",
        href:"/",
        src:fitness,
        alt:" Nutrient",
        aria:"how calc the Nutrient food",
        q:50,
        delay:200,
        duration:500
    },
    {
        title:"workouts",
        body:"workouts recommendation for healthy life style",
        href:"/",
        src:fitness,
        alt:" Nutrient",
        aria:"how calc the Nutrient food",
        q:50,
        delay:200,
        duration:500
    },
    {
        title:"workouts",
        body:"workouts recommendation for healthy life style",
        href:"/",
        src:fitness,
        alt:" Nutrient",
        aria:"how calc the Nutrient food",
        q:50,
        delay:200,
        duration:500
    },
    
]

// ************************
export interface OptionsGoalWeekly{
    text:string,
    value:string,
}
export const weeklyGoalOptionsLose:OptionsGoalWeekly[] =[
    {
        text:"Lose 0.25 kilograms per week",
        value:"0.25"
    },
    {
        text:"Lose 0.5 kilograms per week (Recommended)",
        value:"0.5"
    },
    {
        text:"Lose 0.75 kilograms per week ",
        value:"0.75"
    },
    {
        text:"Lose 1 kilograms per week ",
        value:"1"
    }
]
export const weeklyGoalOptionsGain:OptionsGoalWeekly[] =[
    {
        text:"Gain 0.25 kilograms per week (Recommended)",
        value:"0.25"
    },
    {
        text:"Gain 0.5 kilograms per week",
        value:"0.5"
    }
]
