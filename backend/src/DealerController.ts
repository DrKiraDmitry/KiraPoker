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

export class DealerController {
  round: number = 0; // какая игра идет по счету
  circle: RoundCircle = RoundCircle.start; // круг внутри игры
  whoMoved: string = ""; // кто сейчас ходит
  players: Player[] = []; // список игроков
  bank: number = 0; // банк игры
  whoHaveDealerChip = ""; // кто владеет дилер фишкой
  smallBlind: number = 0; // малый блаинд
  bigBlind: number = 0; // большой блаинд
  startTotalForPlayer: number = 0; // стартовый капитал игрока
  deathPlayer: string[] = []; // список игроков у которых кончились деньги
  topBetInCircle: number = 0; // ставка сейчас

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

  startCircle() {
    this.round++;

    if (!this.whoHaveDealerChip) this.whoHaveDealerChip = this.players[0].name;

    if (this.circle === RoundCircle.start) {
    }
  }

  endPhase(whoWin: string) {
    const player = this.players.find((el) => el.name === whoWin);

    if (!player) return console.error("i don't find player who win, endPhase");

    player.total += this.bank;
    this.bank = 0;
    this.resurrection();
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
