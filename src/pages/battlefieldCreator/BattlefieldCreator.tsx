import { useState } from 'react';

import fieldCss from '../../game/battlefield/battlefield.module.css';
import { Battlefield } from '../../game/battlefield/Battlefield.tsx';
import {
  BCell,
  ShipType,
  GridShipCell,
  isValidShipPlacement,
  createPreviewShipCells,
} from '../../game/battlefield.ts';
import { useStore } from '../../store/useStore.ts';

export type PreviewShip = {
  isValid: boolean;
  shipCells: GridShipCell[];
  shipType: ShipType;
};

const BattlefieldCreator = () => {
  const bfStore = useStore().battlefieldStore;
  const [newShip, setNewShip] = useState<{
    shipType: ShipType;
  } | null>(null);
  const [previewShip, setPreviewShip] = useState<null | PreviewShip>(null);

  const hasEnoughShipsOf = (shipLength: number) => {
    const shipsOfGivenLength = Object.keys(
      bfStore.userShips[shipLength],
    ).length;
    const maxShipQuantityForType = 5 - shipLength;
    return shipsOfGivenLength === maxShipQuantityForType;
  };

  // const [createdShips, setCreatedShip] = useState<{
  //   [shipLength: number]: [];
  // } | null>(null);

  const onCellClick = (cell: BCell) => {
    if (previewShip && previewShip.isValid) {
      bfStore.createShipFromPreview(previewShip);
      setNewShip(null);
      setPreviewShip(null);
    }
    if (cell.shipCellType?.startsWith('SHIP_')) {
      // move ship
    }
  };

  const onCellMouseEnter = (cell: BCell) => {
    if (newShip) {
      const previewShipCells = createPreviewShipCells(
        cell.index,
        newShip?.shipType,
      );
      setPreviewShip({
        isValid: isValidShipPlacement(bfStore.grid, {
          index: previewShipCells[0].index,
          shipType: newShip.shipType,
        }),
        shipCells: previewShipCells,
        shipType: newShip.shipType,
      });
    }
  };

  return (
    <div className={fieldCss.battlefield}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ padding: '0 20px' }}>
          <p>Place your ships</p>
          <div>
            <div>
              <button
                disabled={hasEnoughShipsOf(4)}
                onClick={() => setNewShip({ shipType: 'H4' })}
                className={fieldCss.ship4}
              >
                H4
              </button>
              <br />
              <button
                disabled={hasEnoughShipsOf(3)}
                onClick={() => setNewShip({ shipType: 'H3' })}
                className={fieldCss.ship3}
              >
                H3
              </button>
              <br />
              <button
                disabled={hasEnoughShipsOf(2)}
                onClick={() => setNewShip({ shipType: 'H2' })}
                className={fieldCss.ship2}
              >
                H2
              </button>
              <br />
              <button
                disabled={hasEnoughShipsOf(1)}
                onClick={() => setNewShip({ shipType: 'H1' })}
                className={fieldCss.ship1}
              >
                H1
              </button>
            </div>
          </div>
        </div>
        <div>
          <Battlefield
            grid={bfStore.grid}
            previewShip={previewShip}
            onCellClick={onCellClick}
            onCellMouseEnter={onCellMouseEnter}
            onCellMouseLeave={() => null}
          />
        </div>
      </div>
    </div>
  );
};

export default BattlefieldCreator;
