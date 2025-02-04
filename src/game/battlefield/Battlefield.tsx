// import { useTranslation } from "react-i18next";
// import { useState } from "react";
import camelCase from 'lodash-es/camelCase';

import fieldCss from './battlefield.module.css';
import { useTranslation } from 'react-i18next';
import { BattlefieldMatrix, BattlefieldRow, BCell } from '../battlefield.ts';

// type ShipType =
//   | "SHIP_FULL"
//   | "SHIP_TOP"
//   | "SHIP_BOTTOM"
//   | "SHIP_LEFT"
//   | "SHIP_RIGHT"
//   | "SHIP_MIDDLE_H"
//   | "SHIP_MIDDLE_V";
//
// type CellN = {
//   index: [number, number];
//   shipType: ShipType | null;
//   shot: boolean;
// };
//
// type Cell =
//   | "EMPTY"
//   | "MISS"
//   | "SHIP_FULL"
//   | "SHIP_TOP"
//   | "SHIP_BOTTOM"
//   | "SHIP_LEFT"
//   | "SHIP_RIGHT"
//   | "SHIP_MIDDLE_H"
//   | "SHIP_MIDDLE_V"
//   | "SHIP_HIT"
//   | "SHIP_SUNK";

function Cell({ cell, onClick }: { cell: BCell; onClick: () => void }) {
  const { shipType, shot } = cell;
  const isMiss = !shipType && shot;
  const cellShipCss =
    (shipType &&
      `${fieldCss.cellShip} ${fieldCss[camelCase('CELL_' + shipType)]}`) ||
    '';
  console.log(`${fieldCss.cellShip} ${fieldCss[camelCase('CELL_' + shipType)]}`)
  const cellCss = `${fieldCss.cell} ${isMiss ? fieldCss.cellMiss : ''}`;
  return (
    <div className={cellCss} onClick={onClick}>
      <div className={cellShipCss}></div>
    </div>
  );
}

export function Battlefield({
  grid,
  onCellClick,
}: {
  grid: BattlefieldMatrix;
  onCellClick: (cell: BCell) => void;
}) {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <div className={fieldCss.fieldRow}>
          <div className={fieldCss.indexCell}></div>
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map((i) => (
            <div className={fieldCss.indexCell} key={`alpha-index-${i}`}>
              {t(`bfield.${i}`)}
            </div>
          ))}
        </div>
        <div className={fieldCss.fieldRow}>
          <div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div className={fieldCss.indexCell} key={`num-index-${i}`}>
                {i}
              </div>
            ))}
          </div>
          <div className={fieldCss.grid}>
            {grid.map((row: BattlefieldRow, ri) => (
              <>
                {row.map((cell: BCell, ci) => (
                  <Cell
                    cell={cell}
                    onClick={() => onCellClick(cell)}
                    key={`cell-${ri}-${ci}`}
                  />
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
