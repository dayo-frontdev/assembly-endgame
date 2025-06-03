import { languages } from "./Languages"
import { useState, useEffect } from "react"
import clsx from "clsx"
import getFarewellText from "./utils"


export default function Status({wrongGuessCount,
                                 won, maxLost, lost}){
    const [add, setAdd] = useState([])
    const update = languages.filter((arr, i) => wrongGuessCount > i  )
    const langUp = update.at(-1)
    
   useEffect(()=>{ if(update.length >= 1){
    op(langUp)}},[langUp])
    
    

   function op(language){
   if(add.length >= 1){
        setAdd(prev => [`${prev} & ${language.name}`])
   }else{
       setAdd([language.name])
   }
   }

   
   const className = clsx({
    gameOver: wrongGuessCount >= maxLost,
    loosing: wrongGuessCount < maxLost,
    gameWon:  won
   })
  
  return(
    <main arial-live='polite' role="status">
    {wrongGuessCount > 0 || won?<div className="status-width"> <div className={`status ${className}`}>
       {lost ?<p>
    “GAME OVER!! ” <br />
    Better start learning Assembly
    </p> : won?<p>
    “YOU WON !! ”
    </p> : <p>
    “{getFarewellText(langUp.name)}”
    </p>}
    </div>
    </div> : null}
    </main >
 )
 }