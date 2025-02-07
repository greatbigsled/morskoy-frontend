import cloneDeep from 'lodash-es/cloneDeep';

const MAX_INDEX = 10;
const TEN_NUM_ARRAY = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
];
const TEN_ALPHA_ARRAY = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
];

export type ShipType = 'H4' | 'V4' | 'H3' | 'V3' | 'H2' | 'V2' | 'H1';
export type ShipCellType =
  | 'SHIP_FULL'
  | 'SHIP_TOP'
  | 'SHIP_BOTTOM'
  | 'SHIP_LEFT'
  | 'SHIP_RIGHT'
  | 'SHIP_MIDDLE_H'
  | 'SHIP_MIDDLE_V';

export type BCell = {
  index: [number, number];
  playIndex: [number, string],
  shipCellType: ShipCellType | null;
  shot: boolean;
};
export type BattlefieldRow = BCell[];
export type BattlefieldMatrix = BattlefieldRow[];
export type NewShip = {
  index: [number, number];
  shipType: ShipType;
};
export type GridShipCell = { index: [number, number]; shipCellType: ShipCellType };

export function createEmptyGrid(): BattlefieldMatrix {
  const outGrid = TEN_NUM_ARRAY.map((numIndex: number, rowIndex: number) => {
    return TEN_ALPHA_ARRAY.map((alphaIndex: string, cellIndex: number) => {
      return {
        index: [rowIndex, cellIndex],
        playIndex: [numIndex, alphaIndex],
        shipCellType: null,
        shot: false,
      } as BCell;
    });
  });

  return outGrid;
}

export function canCreateShip(newShip: NewShip) {
  const {
    index: [r, c],
    shipType,
  } = newShip;
  const shipLength = parseInt(shipType[1]);
  if (shipType.startsWith('H')) {
    return !(c + shipLength > MAX_INDEX);
  } else {
    return !(r + shipLength > MAX_INDEX);
  }
}

export function createNewShipCells(newShip: NewShip): Array<GridShipCell> {
  if (!canCreateShip(newShip)) {
    throw new Error(`Can not create ship, wrong indexes: ${newShip.index}`);
  }
  const { index: startIndex, shipType } = newShip;
  const cellCount = parseInt(shipType[1]);
  const isHorizontal = shipType.startsWith('H');
  const shipCells: GridShipCell[] = [];
  let [r, c] = startIndex;
  let curCell = 0;
  while (curCell < cellCount) {
    curCell = curCell + 1;
    let shipCellType: ShipCellType = 'SHIP_FULL';
    if (cellCount > 1) {
      if (isHorizontal) {
        if (curCell === 1) {
          shipCellType = 'SHIP_LEFT';
        } else if (curCell === cellCount) {
          shipCellType = 'SHIP_RIGHT';
        } else {
          shipCellType = 'SHIP_MIDDLE_H';
        }
      } else {
        if (curCell === 1) {
          shipCellType = 'SHIP_TOP';
        } else if (curCell === cellCount) {
          shipCellType = 'SHIP_BOTTOM';
        } else {
          shipCellType = 'SHIP_MIDDLE_V';
        }
      }
    }
    const nextCellIndex: GridShipCell = isHorizontal
      ? { index: [r, c++], shipCellType }
      : { index: [r++, c], shipCellType };
    shipCells.push(nextCellIndex);
  }
  return shipCells;
}

export function addShipToGrid(grid: BattlefieldMatrix, newShip: NewShip) {
  const newGrid = cloneDeep(grid);
  const newShipCells = createNewShipCells(newShip);
  newShipCells.forEach(({ index: [r, c], shipCellType }: GridShipCell) => {
    newGrid[r][c].shipCellType = shipCellType;
  });
  return newGrid;
}

export function createPreviewShip(
  hoverIndex: [number, number],
  shipType: ShipType,
) {
  const isHorizontal = shipType.startsWith('H');
  const shipLength = parseInt(shipType[1]);
  const previewShip: [number, number][] = [];
  if (isHorizontal) {
    // check hover cell number
    const c = hoverIndex[1];
    // check if ship goes over limit of grid
    const overflow =
      c + shipLength > MAX_INDEX && Math.abs(MAX_INDEX - (c + shipLength));
    let curC = hoverIndex[1];
    // move ship back so it doesn't overflow, just for preview
    curC = overflow ? curC - overflow : curC;
    while (previewShip.length < shipLength) {
      previewShip.push([hoverIndex[0], curC]);
      curC = curC + 1;
    }
  } else {
    // check hover row number
    const r = hoverIndex[0];
    // check if ship goes over limit of grid
    const overflow =
      r + shipLength > MAX_INDEX && Math.abs(MAX_INDEX - (r + shipLength));
    let curR = hoverIndex[0];
    // move ship back so it doesn't overflow, just for preview
    curR = overflow ? curR - overflow : curR;
    while (previewShip.length < shipLength) {
      previewShip.push([curR, hoverIndex[1]]);
      curR = curR + 1;
    }
  }

  const startIndex = previewShip[0];
  const previewShipCells: GridShipCell[] = [];
  let [r, c] = startIndex;
  let curCell = 0;
  while (curCell < shipLength) {
    curCell = curCell + 1;
    let shipCellType: ShipCellType = 'SHIP_FULL';
    if (shipLength > 1) {
      if (isHorizontal) {
        if (curCell === 1) {
          shipCellType = 'SHIP_LEFT';
        } else if (curCell === shipLength) {
          shipCellType = 'SHIP_RIGHT';
        } else {
          shipCellType = 'SHIP_MIDDLE_H';
        }
      } else {
        if (curCell === 1) {
          shipCellType = 'SHIP_TOP';
        } else if (curCell === shipLength) {
          shipCellType = 'SHIP_BOTTOM';
        } else {
          shipCellType = 'SHIP_MIDDLE_V';
        }
      }
    }
    const nextCellIndex: GridShipCell = isHorizontal
      ? { index: [r, c++], shipCellType }
      : { index: [r++, c], shipCellType };
    previewShipCells.push(nextCellIndex);
  }
  return previewShipCells;
}
