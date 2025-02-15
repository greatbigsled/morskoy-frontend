import { observable, computed, action, makeAutoObservable } from 'mobx';
import {
  BattlefieldMatrix,
  createEmptyGrid,
  createNewShipCells,
  GridShipCell,
  NewShip,
} from '../game/battlefield.ts';
import { RootStore } from './store.ts';

export class BattlefieldStore {
  rootStore: RootStore;
  grid: BattlefieldMatrix;
  userShips: {
    [key: number]: NewShip[];
  };

  opponentGrid: BattlefieldMatrix;
  opponentHits: [number, number][] = [];
  opponentShips: {
    [key: number]: NewShip[];
  };

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      grid: observable,
      opponentGrid: observable,
      addShipToGrid: action,
      userShips: observable,
      addNewShip: action,
      userShipsCreated: computed,
      opponentShips: observable,
    });
    this.rootStore = rootStore;

    this.grid = createEmptyGrid();
    this.userShips = { 1: [], 2: [], 3: [], 4: [] };

    this.opponentGrid = createEmptyGrid();
    this.opponentHits = [];
    this.opponentShips = { 1: [], 2: [], 3: [], 4: []}
  }

  get userShipsCreated() {
    return {
      1: this.userShips[1].length === 4,
      2: this.userShips[2].length === 3,
      3: this.userShips[3].length === 2,
      4: this.userShips[4].length === 1,
    };
  }

  addNewShip(newShip: NewShip) {
    const shipLength = parseInt(newShip.shipType[1]);
    const maxShipQuantityForType = 5 - shipLength;
    if (this.userShips[shipLength].length < maxShipQuantityForType) {
      this.userShips[shipLength].push(newShip);
      this.addShipToGrid(newShip);
    } else {
      console.warn('already enough ships of length of ' + shipLength);
    }
  }

  //private
  addShipToGrid(newShip: NewShip) {
    const newShipCells = createNewShipCells(newShip);
    newShipCells.forEach(({ index: [r, c], shipCellType }: GridShipCell) => {
      this.grid[r][c].shipCellType = shipCellType;
    });
  }
}
