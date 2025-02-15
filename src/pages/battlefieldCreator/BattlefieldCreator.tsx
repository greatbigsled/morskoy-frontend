import { useState } from 'react';

import fieldCss from '../../game/battlefield/battlefield.module.css';
import { Battlefield } from '../../game/battlefield/Battlefield.tsx';
import {
  BCell,
  createPreviewShip,
  ShipType,
  GridShipCell,
  isValidShipPlacement,
} from '../../game/battlefield.ts';
import { useStore } from '../../store/useStore.ts';

const BattlefieldCreator = () => {
  const bfStore = useStore().battlefieldStore;
  const [newShip, setNewShip] = useState<{
    shipType: ShipType;
  } | null>(null);

  const onCellClick = (cell: BCell) => {
    if (previewShip && previewShip.isValid) {
      bfStore.addNewShip({
        index: previewShip.shipCells[0].index,
        shipType: previewShip.shipType,
      });
      setNewShip(null);
      setPreviewShip(null);
    }
    if (cell.shipCellType?.startsWith('SHIP_')) {
      // move ship
    }
  };

  const [previewShip, setPreviewShip] = useState<null | {
    isValid: boolean;
    shipCells: GridShipCell[];
    shipType: ShipType;
  }>(null);
  const onCellMouseEnter = (cell: BCell) => {
    if (newShip) {
      const previewShipCells = createPreviewShip(cell.index, newShip?.shipType);
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
                disabled={bfStore.userShipsCreated[4]}
                onClick={() => setNewShip({ shipType: 'H4' })}
                className={fieldCss.ship4}
              >
                H4
              </button>
              <br />
              <button
                disabled={bfStore.userShipsCreated[3]}
                onClick={() => setNewShip({ shipType: 'H3' })}
                className={fieldCss.ship3}
              >
                ship 3
              </button>
              <br />
              <button
                disabled={bfStore.userShipsCreated[2]}
                onClick={() => setNewShip({ shipType: 'H2' })}
                className={fieldCss.ship2}
              >
                ship 2
              </button>
              <br />
              <button
                disabled={bfStore.userShipsCreated[1]}
                onClick={() => setNewShip({ shipType: 'H1' })}
                className={fieldCss.ship1}
              >
                ship 1
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
