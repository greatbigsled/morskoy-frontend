import cloneDeep from 'lodash-es/cloneDeep'

const tenArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const alphaArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

type ShipType =
  | 'SHIP_FULL'
  | 'SHIP_TOP'
  | 'SHIP_BOTTOM'
  | 'SHIP_LEFT'
  | 'SHIP_RIGHT'
  | 'SHIP_MIDDLE_H'
  | 'SHIP_MIDDLE_V';

export type BCell = {
  index: [number, number];
  shipType: ShipType | null;
  shot: boolean;
};
export type BattlefieldRow = [
  BCell,
  BCell,
  BCell,
  BCell,
  BCell,
  BCell,
  BCell,
  BCell,
  BCell,
  BCell,
];
export type BattlefieldMatrix = [
  BattlefieldRow,
  BattlefieldRow,
  BattlefieldRow,
  BattlefieldRow,
  BattlefieldRow,
  BattlefieldRow,
  BattlefieldRow,
  BattlefieldRow,
  BattlefieldRow,
  BattlefieldRow,
];

export function createEmptyGrid(): BattlefieldMatrix {
  const outGrid = tenArray.map((numIndex: number, rowIndex: number) => {
    return alphaArray.map((alphaIndex: string, cellIndex: number) => {
      return {
        index: [rowIndex, cellIndex],
        playIndex: [numIndex, alphaIndex],
        shipType: null,
        shot: false,
      };
    });
  });

  return outGrid;
}
export type NewShip = {
  startIndex: { r: number; c: number };
  direction: 'H' | 'V';
  cellCount: 1 | 2 | 3 | 4;
};
export function canCreateShip(newShip: NewShip) {
  const MAX_INDEX = 10;
  const { startIndex, cellCount, direction } = newShip;
  if (direction === 'H') {
    return !(startIndex.c + cellCount > MAX_INDEX);
  } else {
    return !(startIndex.r + cellCount > MAX_INDEX);
  }
}

type NextShipCell = { r: number; c: number; shipType: ShipType };
export function createNewShipCells(newShip: NewShip): Array<NextShipCell> {
  if (!canCreateShip(newShip)) {
    throw new Error(
      `Can not create ship, wrong indexes: ${newShip.startIndex}`,
    );
  }
  const { startIndex, cellCount, direction } = newShip;
  const shipCells: Array<NextShipCell> = [];
  let r = startIndex.r;
  let c = startIndex.c;
  let curCell = 0;
  while (curCell < cellCount) {
    curCell = curCell + 1;
    let shipType: ShipType = 'SHIP_FULL';
    if (cellCount > 1) {
      if (direction === 'H') {
        if (curCell === 1) {
          shipType = 'SHIP_LEFT';
        } else if (curCell === cellCount) {
          shipType = 'SHIP_RIGHT';
        } else {
          shipType = 'SHIP_MIDDLE_H';
        }
      } else {
        if (curCell === 1) {
          shipType = 'SHIP_TOP';
        } else if (curCell === cellCount) {
          shipType = 'SHIP_BOTTOM';
        } else {
          shipType = 'SHIP_MIDDLE_V';
        }
      }
    }
    const nextCellIndex: NextShipCell =
      direction === 'H' ? { r, c: c++, shipType } : { r: r++, c, shipType };
    shipCells.push(nextCellIndex);
  }
  return shipCells;
}

export function createShip(grid: BattlefieldMatrix, newShip: NewShip) {
  const newGrid = cloneDeep(grid);
  const newShipCells = createNewShipCells(newShip);
  newShipCells.forEach(({ r, c, shipType }: NextShipCell) => {
    newGrid[r][c].shipType = shipType;
  });
  return newGrid;
}
