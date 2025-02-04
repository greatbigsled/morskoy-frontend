import { expect, test } from 'vitest';
import {
  canCreateShip,
  createEmptyGrid,
  createNewShipCells,
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
      expect(cell.shipType).toBe(null);
      expect(cell.shot).toBe(false);
      expect(cell.index[0]).toBeLessThanOrEqual(9);
      expect(cell.index[0]).toBeGreaterThanOrEqual(0);
      expect(cell.index[1]).toBeLessThanOrEqual(9);
      expect(cell.index[1]).toBeGreaterThanOrEqual(0);
    });
  });
});

test('canCreateShip works properly', () => {
  const correctShipH: NewShip = {
    startIndex: { r: 0, c: 0 },
    direction: 'H',
    cellCount: 4,
  };
  expect(canCreateShip(correctShipH)).toBeTruthy();

  const wrongShipH: NewShip = {
    startIndex: { r: 0, c: 7 },
    direction: 'H',
    cellCount: 4,
  };
  expect(canCreateShip(wrongShipH)).toBeFalsy();

  const correctShipV: NewShip = {
    startIndex: { r: 6, c: 1 },
    direction: 'V',
    cellCount: 4,
  };
  expect(canCreateShip(correctShipV)).toBeTruthy();

  const wrongShipV: NewShip = {
    startIndex: { r: 7, c: 1 },
    direction: 'V',
    cellCount: 4,
  };
  expect(canCreateShip(wrongShipV)).toBeFalsy();

  const wrongShipHV: NewShip = {
    startIndex: { r: 7, c: 9 },
    direction: 'H',
    cellCount: 2,
  };
  expect(canCreateShip(wrongShipHV)).toBeFalsy();
});

test('Creates proper createNewShipCells x4', () => {
  const correctShipH: NewShip = {
    startIndex: { r: 0, c: 0 },
    direction: 'H',
    cellCount: 4,
  };
  const newShipCells = createNewShipCells(correctShipH);
  expect(newShipCells).toEqual([
    {
      r: 0,
      c: 0,
      shipType: 'SHIP_LEFT',
    },
    {
      r: 0,
      c: 1,
      shipType: 'SHIP_MIDDLE_H',
    },
    {
      r: 0,
      c: 2,
      shipType: 'SHIP_MIDDLE_H',
    },
    {
      r: 0,
      c: 3,
      shipType: 'SHIP_RIGHT',
    },
  ]);
});
