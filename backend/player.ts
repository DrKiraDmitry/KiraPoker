export class Player {
  name: string // name player
  total: number // start bank for the player
  inGame: boolean // the player drop cards or no
  bet: number // bet the player
  dealerChip: boolean // the player have dealer chip or no
  move: boolean // queue move the player or not
  defeat: number // how much the player defeated

  
  constructor({name, total, inGame, bet, dealerChip, move, defeat}: Partial<Player>) {
    this.name = name ?? ''
    this.total = total ?? 0
    this.inGame = inGame ?? false
    this.bet = bet ?? 0
    this.dealerChip = dealerChip ?? false
    this.move = move ?? false
    this.defeat = defeat ?? 0
  }
}

enum RoundCircle {
  'start',
  'show3card',
  'show4card',
  'show5card',
  'result'
}

class DealerController {
  round: number = 0// какая игра идет по счету
  circle: RoundCircle = RoundCircle.start // круг внутри игры
  whoMoved: string = '' // кто сейчас ходит
  players: Player[] = [] // список игроков
  bank: number = 0 // банк игры
  whoHaveDealerChip = '' // кто владеет дилер фишкой
  smallBlind: number = 0 // малый блаинд
  bigBlind: number = 0 // большой блаинд
  startTotalForPlayer: number = 0 // стартовый капитал игрока
  deathPlayer: string[] = [] // список игроков у которых кончились деньги
  topBetInCircle: number = 0 // ставка сейчас
  
  constructor() {
  }
  
  initGame() {
  }
  
  startCircle() {
    if(this.circle === RoundCircle.start) {
      
    }
  }
  
  endPhase(whoWin: string) {
    const player = this.players.find((el) => el.name === whoWin)
    
    if(!player) return console.error("i don't find player who win, endPhase")
    
    player.total += this.bank 
    this.bank = 0
    this.resurrection()
    
    
  }

  /**
   * resurrection() - функция которая в конце раунда, воскрешает игроков с пустым счет, и начисляет очки смерти  
   */
  resurrection() {
    
    this.deathPlayer.forEach((el) => {
      const player = this.players.find((p) => p.name === el)
      if(player) {
        player.total = this.startTotalForPlayer
        player.defeat++
      }
    })
    
    this.deathPlayer = []
  }
}
