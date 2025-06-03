import Status from "./Status"
import Languages from "./Language"
import Confetti from 'react-confetti'
import { useWindowSize } from "react-use"
import clsx from "clsx"
import Word from "./Words"
import { languages } from "./Languages"

export default function Assemblygame(props){
  
const {useState} = props
const [currentWord, setCurrentWord] = useState(Word())
const [letterGuess, setGuess] = useState([])

const wordGuess = currentWord.split('').map((letters, i) => { 
    const display = letterGuess.includes(letters)  
    return(
    display ? letters.toUpperCase() : ''
)})

const won = currentWord === wordGuess.join('').toLowerCase()

const wrongGuessCount = letterGuess.filter(arr => 
    !currentWord.split('').includes(arr)).length
const countRight = letterGuess.filter(arr => 
    currentWord.split('').includes(arr)).length

const maxLost = languages.length - 1
const lost = wrongGuessCount >= maxLost

const { width, height } = useWindowSize()
const lastGuessedLetter = letterGuess.at(-1)

function handGuessLetter(text){
    setGuess(prevGuass => (!prevGuass.includes(text)? [...prevGuass, text]:
    prevGuass 
        )
    )
}

function handleNewGame(){
   setCurrentWord(Word())
   setGuess([])
}
const alphabet = "abcdefghijklmnopqrstuvwxyz"

 const letterElement = currentWord.split('').map((letters, i) => { 
    const display = letterGuess.includes(letters)  
    const className = clsx("letter", lost && !display && 'missed-letter')
    return(
    <span className={className} key={i}>{display || lost ? letters.toUpperCase(): null}</span>
)})



const guessElement = currentWord.split('').map((letters, i, arr) => { 
    const display = arr[0] == letters || arr.at(-1) === letters 
    return(
    <span className="guess-letter" key={i}>{display? letters.toUpperCase(): "*"}</span>
)})





const alphabetElements = alphabet.split('').map((alph, i) =>{
  const isGuess = letterGuess.includes(alph) 
  const isCorrect = isGuess && currentWord.split('').includes(alph)
  const isWrong = isGuess && !currentWord.split('').includes(alph)
  const className = clsx({
    correct: isCorrect,
    wrong: isWrong,
  })
  
    return(
<button className={className}
 onClick={() => handGuessLetter(alph)}
  key={i}
  aria-label={`letter ${alph}`}
  disabled ={won || lost}
  aria-disabled = {isGuess}
  >{alph.toUpperCase()}</button>
)})



    return(
        <>
        { won && <Confetti width={width}
      height={height} />}
     <a href="https://dayofrontdev.space">
     <button className="back-btn">Go back to portfolio</button>
     </a> 
        <section className="game-body">
        <main className="header">
          <h1 className="head-text">Assembly: Endgame</h1>
          <p className="parag-text">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
          <Status wrongGuessCount={wrongGuessCount} won={won} 
          maxLost={maxLost} lost={lost} />
          {/* Combined visually-hidden aria-live region for status updates */}
          <section 
                className="sr-only" 
                aria-live="polite" 
                role="status"
            >
                <p>
                    {currentWord.includes(lastGuessedLetter) ? 
                        `Correct! The letter ${lastGuessedLetter} is in the word.` : 
                        `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {maxLost} attempts left.
                </p>
                <p>Current word: {currentWord.split("").map(letter => 
                letterGuess.includes(letter) ? letter + "." : "blank.")
                .join(" ")}</p>
            </section>

          <Languages wrongGuessCount={wrongGuessCount}/>
         <div className="hint">Hint!!</div>
          <div className="guess">{guessElement}</div>
          <div className="letter-parent">{letterElement}</div>
          <section className="keyboard">{alphabetElements}</section>
            <section className="new-game">{won || lost?  <button onClick={handleNewGame}>New Game</button>: null}</section>
        </main>
            
        </section>
        </>
    )
}