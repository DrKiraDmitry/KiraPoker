export class Player {
  name: string; // name player
  total: number; // start bank for the player
  inGame: boolean; // the player drop cards or no
  bet: number; // bet the player
  defeat: number; // how much the player defeated
  checked: boolean; // checked what this player moved

  constructor({ name, total, inGame, bet, defeat }: Partial<Player>) {
    this.name = name ?? "";
    this.total = total ?? 0;
    this.inGame = inGame ?? false;
    this.bet = bet ?? 0;
    this.defeat = defeat ?? 0;
    this.checked = false;
  }
}
