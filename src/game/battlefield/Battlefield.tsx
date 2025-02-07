// import { useTranslation } from "react-i18next";
// import { useState } from "react";
import camelCase from 'lodash-es/camelCase';
import isEqual from 'lodash-es/isEqual';
import { useTranslation } from 'react-i18next';

import {
  BattlefieldMatrix,
  BattlefieldRow,
  BCell,
  GridShipCell,
  ShipCellType,
} from '../battlefield.ts';
import fieldCss from './battlefield.module.css';

function Cell({
  cell,
  previewCellType,
  isValidPreview,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  cell: BCell;
  previewCellType: ShipCellType | null;
  isValidPreview: boolean,
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const { shipCellType, shot } = cell;
  const isMiss = !shipCellType && shot;
  const cellShipCss =
    (shipCellType &&
      `${fieldCss.cellShip} ${fieldCss[camelCase('CELL_' + shipCellType)]}`) ||
    null;
  const previewShipCss =
    (previewCellType &&
      `${fieldCss.cellShip} ${fieldCss[camelCase('CELL_' + previewCellType)]} ${isValidPreview ? fieldCss.cellShipPreview : fieldCss.cellShipPreviewInvalid}`) ||
    null;
  const cellCss = `${fieldCss.cell} ${isMiss ? fieldCss.cellMiss : ''}`;
  return (
    <div
      className={cellCss}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {cellShipCss && <div className={cellShipCss}></div>}
      {previewShipCss && <div className={previewShipCss}></div>}
    </div>
  );
}

export function Battlefield({
  grid,
  previewShip,
  onCellClick,
  onCellMouseEnter,
  onCellMouseLeave,
}: {
  grid: BattlefieldMatrix;
  previewShip: null | {
    isValid: boolean;
    shipCells: GridShipCell[];
  };
  onCellClick: (cell: BCell) => void;
  onCellMouseEnter: (cell: BCell) => void;
  onCellMouseLeave: (cell: BCell) => void;
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
                    previewCellType={
                      (previewShip &&
                        previewShip.shipCells.find((p) =>
                          isEqual(p.index, cell.index),
                        )?.shipCellType) ||
                      null
                    }
                    isValidPreview={previewShip?.isValid}
                    onClick={() => onCellClick(cell)}
                    onMouseEnter={() => onCellMouseEnter(cell)}
                    onMouseLeave={() => onCellMouseLeave(cell)}
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
