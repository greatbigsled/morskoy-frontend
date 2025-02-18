import { useTranslation } from 'react-i18next';

import css from './game.module.css';
import { Battlefield } from '../../game/battlefield/Battlefield.tsx';
import { useStore } from '../../store/useStore.ts';
import { BCell, NewShip } from '../../game/battlefield.ts';

const StatusShip = ({ cells }: { cells: boolean[] }) => {
  return (
    <div className={css.statusShip}>
      {cells.map((isShot, i) => (
        <div
          className={`${css.statusShipCell} ${isShot ? css.statusShipCellShot : ''}`}
          key={i}
        ></div>
      ))}
    </div>
  );
};

const ShipsStatusDisplay = () => {
  return (
    <div>
      <div>
        <StatusShip cells={[true, false, false, true]} />
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

function Game() {
  const { t } = useTranslation();
  const bfStore = useStore().battlefieldStore;
  const grid = useStore().battlefieldStore.grid;
  const opGrid = useStore().battlefieldStore.opponentGrid;

  const onSelfCellClick = (cell: BCell) => {
    bfStore.setIsShotSelf(cell.index);
  };
  const onOpponentCellClick = (cell: BCell) => {
    bfStore.setIsShot(cell.index);
  };
  const isOpponentFieldDisabled = false;

  return (
    <div className={css.game}>
      <div>
        <div className={css.turnTitle}>Ваш ход</div>
        <div className={css.row}>
          <ShipsStatusDisplay />
          <div className={css.bfield}>
            <Battlefield
              grid={grid}
              previewShip={null}
              onCellClick={onSelfCellClick}
              onCellMouseEnter={() => console.log}
              onCellMouseLeave={() => console.log}
            />
            <p className={css.gridTitle}>{t('game.yourGrid')}</p>
          </div>
          <div className={css.bfield}>
            <Battlefield
              disabled={isOpponentFieldDisabled}
              grid={opGrid}
              previewShip={null}
              onCellClick={onOpponentCellClick}
              onCellMouseEnter={() => console.log}
              onCellMouseLeave={() => console.log}
            />
            <p className={css.gridTitle}>{t('game.opponentsGrid')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
