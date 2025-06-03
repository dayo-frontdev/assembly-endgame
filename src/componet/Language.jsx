import { languages } from "./Languages"
import clsx from "clsx"

export default function Languages({wrongGuessCount}){
   const language = languages.map((language, i)=>{
   let className =  clsx({
     lost: wrongGuessCount > i,
     })
     
return(
    <span className= {`lang ${className}`}
     key={language.name} 
    style={{backgroundColor: language.backgroundColor, 
        color : language.color, 
    }}
     > {language.name}</span>
    
)
    })
    return(
        <>
        <main className="language ">
           {language}
        </main>
        </>
    )
}