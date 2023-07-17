export class Player {
  name: string; // name player
  total: number; // start bank for the player
  inGame: boolean; // the player drop cards or no
  bet: number; // bet the player
  move: boolean; // queue move the player or not
  defeat: number; // how much the player defeated

  constructor({ name, total, inGame, bet, move, defeat }: Partial<Player>) {
    this.name = name ?? "";
    this.total = total ?? 0;
    this.inGame = inGame ?? false;
    this.bet = bet ?? 0;
    this.move = move ?? false;
    this.defeat = defeat ?? 0;
  }
}
