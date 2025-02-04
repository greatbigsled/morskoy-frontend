import { useTranslation } from 'react-i18next';

import fieldCss from './battlefield.module.css';
import { Battlefield } from './Battlefield.tsx';
import { BCell, createEmptyGrid, createShip } from '../battlefield.ts';
import { useState } from 'react';

export function BattlefieldCreator() {
  const { t } = useTranslation();
  const [battleGrid, setBattleGrid] = useState(createEmptyGrid());
  const [newShip, setNewShip] = useState<{
    direction: 'H' | 'V';
    cellCount: 1 | 2 | 3 | 4;
  } | null>(null);
  const onCellClick = (cell: BCell) => {
    console.log(cell);
    if (newShip) {
      const newGrid = createShip(battleGrid, {
        startIndex: {
          r: cell.index[0],
          c: cell.index[1],
        },
        cellCount: newShip.cellCount,
        direction: newShip.direction,
      });
      setBattleGrid(newGrid);
      console.log(newGrid);
    }
  };

  return (
    <div className={fieldCss.battlefield}>
      <h4>Create battlefield</h4>
      <div>
        <button>Create empty</button>
        <p>
          Ship to create is: {newShip?.direction} {newShip?.cellCount}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ padding: '0 20px' }}>
          <p>Place your ships</p>
          <div>
            <div>
              <div
                onClick={() => setNewShip({ direction: 'H', cellCount: 4 })}
                className={fieldCss.ship4}
              >
                ship 4
              </div>
              <br />
              <div
                onClick={() => setNewShip({ direction: 'H', cellCount: 3 })}
                className={fieldCss.ship3}
              >
                ship 3
              </div>
              <br />
              <div
                onClick={() => setNewShip({ direction: 'H', cellCount: 2 })}
                className={fieldCss.ship2}
              >
                ship 2
              </div>
              <br />
              <div
                onClick={() => setNewShip({ direction: 'H', cellCount: 1 })}
                className={fieldCss.ship1}
              >
                ship 1
              </div>
            </div>
          </div>
        </div>
        <div>
          <Battlefield grid={battleGrid} onCellClick={onCellClick} />
        </div>
      </div>
    </div>
  );
}

export default BattlefieldCreator;
