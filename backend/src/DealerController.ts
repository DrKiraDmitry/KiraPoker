import { Player } from "./player";

enum RoundCircle {
  "start",
  "show3card",
  "show4card",
  "show5card",
  "result",
}

type SettingsType = {
  smallBlind: number;
  bigBlind: number;
  startTotalForPlayer: number;
};

const nextPlayer = (n: number, length: number): any => {
  const res = n % length;
  return res;
};

export class DealerController {
  round: number = 0; // какая игра идет по счету
  circle: RoundCircle = RoundCircle.start; // круг внутри игры
  whoMoved: string = ""; // кто сейчас ходит
  whoMovedIndex: number = 0; // кто сейчас ходит
  players: Player[] = []; // список игроков
  bank: number = 0; // банк игры
  whoHaveDealerChip = ""; // кто владеет дилер фишкой
  smallBlind: number = 0; // малый блаинд
  bigBlind: number = 0; // большой блаинд
  startTotalForPlayer: number = 0; // стартовый капитал игрока
  deathPlayer: string[] = []; // список игроков у которых кончились деньги
  topBetInCircle: number = 0; // ставка сейчас
  thisCircleEnd: boolean = false; // окончен круг или нет

  constructor(settings: SettingsType) {
    this.smallBlind = settings.smallBlind;
    this.bigBlind = settings.bigBlind;
    this.startTotalForPlayer = settings.startTotalForPlayer;
  }

  joinPlayer(player: string) {
    this.players.push(new Player({ name: player }));
    this.players.push(new Player({ name: "Тестовый Чел" }));
  }

  removePlayer(name: string) {
    this.players = this.players.reduce((acc, el) => {
      if (el.name === name) return acc;
      return [...acc, el];
    }, [] as Player[]);
  }

  startRound() {
    this.players.forEach((el) => {
      el.inGame = true;
      el.checked = false;
      el.total = this.startTotalForPlayer;
    });
    this.round++;

    if (!this.whoHaveDealerChip) {
      this.whoHaveDealerChip = this.players[0].name;
    }

    const whoHaveDealerChipIndex = this.players.findIndex((p) => p.name === this.whoHaveDealerChip);
    this.setSmallBlind();
    this.setBigBlind();

    this.whoMoved = this.players[nextPlayer(whoHaveDealerChipIndex + 3, this.players.length)].name;
    this.whoMovedIndex = nextPlayer(whoHaveDealerChipIndex + 3, this.players.length);
  }

  setSmallBlind() {
    this.players[nextPlayer(this.whoMovedIndex + 1, this.players.length)].bet = this.smallBlind;
    this.bank += this.smallBlind;
  }

  setBigBlind() {
    this.players[nextPlayer(this.whoMovedIndex + 2, this.players.length)].bet = this.bigBlind;
    this.bank += this.bigBlind;
    this.topBetInCircle = this.bigBlind;
  }

  endPhase(whoWin: string) {
    const player = this.players.find((el) => el.name === whoWin);

    if (!player) return console.error("i don't find player who win, endPhase");

    player.total += this.bank;
    this.bank = 0;
    this.resurrection();
  }

  playerChecked() {
    this.players[nextPlayer(this.whoMovedIndex, this.players.length)].checked = true;
  }

  playerFold() {
    this.players[nextPlayer(this.whoMovedIndex, this.players.length)].inGame = false;
  }

  findNextPlayerMove(): void | any {
    this.whoMovedIndex++;
    const findPlayer = this.players[nextPlayer(this.whoMovedIndex, this.players.length)];
    if (!findPlayer.inGame) return this.findNextPlayerMove();
    if (findPlayer.checked && findPlayer.bet === this.topBetInCircle) return (this.thisCircleEnd = true);
    this.whoMoved = findPlayer.name;
  }

  actionCheck() {
    this.playerChecked();
    this.findNextPlayerMove();
  }

  actionFold() {
    this.playerFold();
    this.findNextPlayerMove();
  }

  /**
   * resurrection() - функция которая в конце раунда, воскрешает игроков с пустым счет, и начисляет очки смерти
   */
  resurrection() {
    this.deathPlayer.forEach((el) => {
      const player = this.players.find((p) => p.name === el);
      if (player) {
        player.total = this.startTotalForPlayer;
        player.defeat++;
      }
    });

    this.deathPlayer = [];
  }
}
