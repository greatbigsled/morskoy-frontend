import { useState } from 'react';

import fieldCss from './battlefield.module.css';
import { Battlefield } from './Battlefield.tsx';
import {
  BCell,
  createPreviewShip,
  ShipType,
  GridShipCell,
} from '../battlefield.ts';
import { useStore } from '../../store/useStore.ts';

const BattlefieldCreator = () => {
  const bfStore = useStore().battlefieldStore;
  const [newShip, setNewShip] = useState<{
    shipType: ShipType;
  } | null>(null);
  const onCellClick = (cell: BCell) => {
    if (newShip) {
      bfStore.addNewShip({
        index: cell.index,
        shipType: newShip.shipType,
      });
    }
  };

  const [previewShip, setPreviewShip] = useState<null | GridShipCell[]>(null);
  const onCellMouseEnter = (cell: BCell) => {
    if (newShip) {
      setPreviewShip(createPreviewShip(cell.index, newShip?.shipType));
    }
  };

  const onCellMouseLeave = (cell: BCell) => {
    // console.log(cell);
  };

  return (
    <div className={fieldCss.battlefield}>
      <h4>Create battlefield</h4>
      <div>
        <button>Create empty</button>
        <p>Ship to create is: {newShip?.shipType}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ padding: '0 20px' }}>
          <p>Place your ships</p>
          <div>
            <div>
              <div
                onClick={() => setNewShip({ shipType: 'H4' })}
                className={fieldCss.ship4}
              >
                ship 4
              </div>
              <br />
              <div
                onClick={() => setNewShip({ shipType: 'H3' })}
                className={fieldCss.ship3}
              >
                ship 3
              </div>
              <br />
              <div
                onClick={() => setNewShip({ shipType: 'H2' })}
                className={fieldCss.ship2}
              >
                ship 2
              </div>
              <br />
              <div
                onClick={() => setNewShip({ shipType: 'H1' })}
                className={fieldCss.ship1}
              >
                ship 1
              </div>
            </div>
          </div>
        </div>
        <div>
          <Battlefield
            grid={bfStore.grid}
            previewShip={previewShip}
            onCellClick={onCellClick}
            onCellMouseEnter={onCellMouseEnter}
            onCellMouseLeave={onCellMouseLeave}
          />
        </div>
      </div>
    </div>
  );
};

export default BattlefieldCreator;
