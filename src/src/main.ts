import './style.css'
import { setupBoard } from './section/board.ts'
import { setupHeader } from './section/header.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id= "header">
    </div>
    <div id= "board">
    </div>
  </div>
`
setupHeader(document.querySelector<HTMLDivElement>('#header')!)
setupBoard(document.querySelector<HTMLDivElement>('#board')!)
