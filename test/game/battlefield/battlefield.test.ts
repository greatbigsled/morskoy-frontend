import { expect, test } from 'vitest';
import {
  createEmptyGrid,
  createNewShipCells,
  createPreviewShipCells,
  createRandomShipGrid,
  NewShip,
} from '../../../src/game/battlefield';

test('Creates proper empty grid', () => {
  const emptyGrid = createEmptyGrid();
  expect(emptyGrid.length).toBe(10);
  emptyGrid.forEach((row) => {
    expect(row.length).toBe(10);
  });
  emptyGrid.forEach((row) => {
    row.forEach((cell) => {
      expect(cell.shipCellType).toBe(null);
      expect(cell.shot).toBe(false);
      expect(cell.index[0]).toBeLessThanOrEqual(9);
      expect(cell.index[0]).toBeGreaterThanOrEqual(0);
      expect(cell.index[1]).toBeLessThanOrEqual(9);
      expect(cell.index[1]).toBeGreaterThanOrEqual(0);
    });
  });
});

// test('Creates proper createNewShipCells x4', () => {
//   const correctShipH: NewShip = {
//     index: [0, 0],
//     shipType: 'H4',
//   };
//   const newShipCells = createNewShipCells(correctShipH);
//   expect(newShipCells).toEqual([
//     {
//       index: [0, 0],
//       shipCellType: 'SHIP_LEFT',
//     },
//     {
//       index: [0, 1],
//       shipCellType: 'SHIP_MIDDLE_H',
//     },
//     {
//       index: [0, 2],
//       shipCellType: 'SHIP_MIDDLE_H',
//     },
//     {
//       index: [0, 3],
//       shipCellType: 'SHIP_RIGHT',
//     },
//   ]);
// });

test('createPreviewShip creates ships on regular place when they fit', () => {
  const previewShip1 = createPreviewShipCells([0, 0], 'H4');
  expect(previewShip1.map((p) => p.index)).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ]);

  const previewShip3 = createPreviewShipCells([9, 9], 'H1');
  expect(previewShip3.map((p) => p.index)).toEqual([[9, 9]]);
});

test('createPreviewShip fits ships in grid when they do not fit by changing their position', () => {
  const previewShip1 = createPreviewShipCells([5, 9], 'H3');
  expect(previewShip1.map((p) => p.index)).toEqual([
    [5, 7],
    [5, 8],
    [5, 9],
  ]);

  const previewShip2 = createPreviewShipCells([9, 9], 'V2');
  expect(previewShip2.map((p) => p.index)).toEqual([
    [8, 9],
    [9, 9],
  ]);
});

test('Creates correct random ship quantity', () => {
  const { userShips } = createRandomShipGrid();
  for (const [shipLength, ships] of Object.entries(userShips)) {
    expect(ships.length).toEqual(5 - Number(shipLength));
  }
});

test('Creates random ships at correct indicies', () => {
  const { grid, userShips } = createRandomShipGrid();
  for (const [shipLength, ships] of Object.entries(userShips)) {
    ships.forEach((ship: NewShip) => {
      const isHorizontal = ship.shipType.startsWith('H');
      const [r, c] = ship.index;
      const gCell = grid[r][c];
      if (ship.shipType === 'H1') {
        expect(gCell.shipCellType).toEqual('SHIP_FULL');
      } else if (isHorizontal) {
        expect(gCell.shipCellType).toEqual('SHIP_LEFT');
      } else {
        expect(gCell.shipCellType).toEqual('SHIP_TOP');
      }
    });
  }
});
