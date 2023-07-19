import { atom } from "nanostores";
import { DealerController } from "../../backend/src/DealerController";

export const $game = atom<DealerController | null>(null);
export const $setStore = (x: DealerController) => $game.set(x);
