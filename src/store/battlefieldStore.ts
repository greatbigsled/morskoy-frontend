import {
  observable,
  computed,
  action,
  makeObservable,
  isObservableArray,
  isObservable,
} from 'mobx';
import {
  addShipToGrid,
  BattlefieldMatrix,
  createEmptyGrid,
  createRandomShipGrid,
  NewShip,
  setIsShot,
} from '../game/battlefield.ts';
import { RootStore } from './store.ts';
import { nanoid } from 'nanoid';
import { PreviewShip } from '../pages/battlefieldCreator/BattlefieldCreator.tsx';

export class BattlefieldStore {
  rootStore: RootStore;
  grid: BattlefieldMatrix = createEmptyGrid();
  userShips: {
    // ship length
    [key: number]: {
      [id: string]: NewShip;
    };
  } = { 1: {}, 2: {}, 3: {}, 4: {} };
  userShots: [number, number][] = [];

  opponentGrid: BattlefieldMatrix = createEmptyGrid();
  opponentShots: [number, number][] = [];
  opponentShips: {
    // ship length
    [key: number]: {
      [id: string]: NewShip;
    };
  } = { 1: {}, 2: {}, 3: {}, 4: {} };

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      grid: observable.deep,
      opponentGrid: observable.deep,
      userShips: observable,
      opponentShips: observable,
      setIsShot: action,
      setIsShotSelf: action,
    });
    this.rootStore = rootStore;
    const { grid: randomGrid, userShips } = createRandomShipGrid();
    console.log(randomGrid, userShips);

    this.grid = randomGrid;
    this.userShips = userShips; // todo: remove
  }

  setIsShotSelf = (index: [number, number]) => {
    const [r, c] = index;
    this.grid[r][c].shot = true;
    this.userShots.push(index);
  };

  setIsShot = (index: [number, number]) => {
    const [r, c] = index;
    this.opponentGrid[r][c].shot = true;
    this.opponentShots.push(index);
  };

  createShipFromPreview = (previewShip: PreviewShip) => {
    const newShip = {
      id: nanoid(),
      index: previewShip.shipCells[0].index,
      shipType: previewShip.shipType,
    };
    const shipLength = parseInt(newShip.shipType[1]);
    const maxShipQuantityForType = 5 - shipLength;
    const canAddMoreShips =
      Object.keys(this.userShips[shipLength]).length < maxShipQuantityForType;
    if (canAddMoreShips) {
      this.userShips[shipLength][newShip.id] = newShip;
      this.grid = addShipToGrid(this.grid, newShip);
    } else {
      console.warn('already enough ships of length of ' + shipLength);
    }
  };
}
