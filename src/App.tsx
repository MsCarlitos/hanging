import { useEffect, useState } from 'react'
import './App.css'
import { HangImage } from './components/HangImage'
import { letters } from './helpers/letters'
import { getRandomWord } from './helpers/getRandomWord';

function App() {
  const [ word, setWord ] = useState( getRandomWord );
  const [ hiddenWord, setHiddenWord ] = useState( '_ '.repeat(word.length));
  const [ attemps, setAttemps ] = useState(0);
  const [ lose, setLose ] = useState( false );
  const [ won, setWon ] = useState( false );

  useEffect(() => {
    if( attemps >= 9 ) {
      setLose( true );
    }
  }, [ attemps ])

  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if( currentHiddenWord === word ) {
      setWon( true );
    }
  }, [ attemps ])


  const checkLetter = ( letter: string ) => {
    if( lose ) return;
    if( won ) return;
    if( !word.includes( letter )) {
      setAttemps( Math.min(attemps + 1, 9) );
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');

    for (let i = 0; i < word.length; i++) {
      if( word[i] === letter ) {
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' '));
  }

  const newGame = () => {
    setWord( getRandomWord );
    setHiddenWord( '_ '.repeat(word.length) );
    setAttemps( 0 );
    setLose( false );
    setWon( false );
  }

  return (
    <div className="App">
      {/* Imagenes */}
      <h3>Imagenes del juego</h3>

      <HangImage imageNumber={ attemps } />

      {/* Palabra oculta */}
      <h3>{ hiddenWord} </h3>

      {/* Contador de intentos */}
      <h3>Intentos: { attemps }</h3>

      {/* Mensajse si perdio */}
      {
        ( lose ) ? <h2>Perdio { word }</h2> : ''
      }

      {/* Mensajse si Gano */}
      {
        ( won ) ? <h2>Felicidades, usted gano con la palabra { word }</h2> : ''
      }

      {/* botones de letras */}
      {
        letters.map(( letter:string ) => (
          <button key={ letter } onClick={ ()=> checkLetter(letter)}>{ letter }</button>
          ))
        }
        {/* Reiniciar el juego */}
        {
          ( won || lose ) &&
          <button onClick={ newGame }>Reiniciar el juego</button>
        }
    </div>
  )
}

export default App
