import { observable, computed, action, makeObservable } from 'mobx';
import {
  BattlefieldMatrix,
  createEmptyGrid,
  createNewShipCells,
  createRandomShipGrid,
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
    makeObservable(this, {
      grid: observable,
      opponentGrid: observable,
      addShipToGrid: action,
      userShips: observable,
      addNewShip: action,
      userShipsCreated: computed,
      opponentShips: observable,
      setIsShot: action,
    });
    this.rootStore = rootStore;
    const { grid: randomGrid, userShips } = createRandomShipGrid();
    console.log(randomGrid, userShips);

    // this.grid = createEmptyGrid();
    this.grid = randomGrid;
    // this.userShips = { 1: [], 2: [], 3: [], 4: [] };
    this.userShips = userShips; // todo: remove

    // Object.assign(this.opponentGrid, createEmptyGrid());
    this.opponentGrid = createEmptyGrid();
    this.opponentHits = [];
    this.opponentShips = { 1: [], 2: [], 3: [], 4: [] };
  }

  get userShipsCreated() {
    return {
      1: this.userShips[1].length === 4,
      2: this.userShips[2].length === 3,
      3: this.userShips[3].length === 2,
      4: this.userShips[4].length === 1,
    };
  }

  setIsShotSelf = (index: [number, number]) => {
    const [r, c] = index;
    this.grid[r][c].shot = true;
  };

  setIsShot = (index: [number, number]) => {
    const [r, c] = index;
    this.opponentGrid[r][c].shot = true;
  };

  addNewShip = (newShip: NewShip) => {
    const shipLength = parseInt(newShip.shipType[1]);
    const maxShipQuantityForType = 5 - shipLength;
    if (this.userShips[shipLength].length < maxShipQuantityForType) {
      this.userShips[shipLength].push(newShip);
      this.addShipToGrid(newShip);
    } else {
      console.warn('already enough ships of length of ' + shipLength);
    }
  };

  //private
  addShipToGrid = (newShip: NewShip) => {
    const newShipCells = createNewShipCells(newShip);
    newShipCells.forEach(({ index: [r, c], shipCellType }: GridShipCell) => {
      this.grid[r][c].shipCellType = shipCellType;
    });
  };
}
