import { useTranslation } from 'react-i18next';

import css from './game.module.css';
import { Battlefield } from '../../game/battlefield/Battlefield.tsx';
import { useStore } from '../../store/useStore.ts';
import { BCell } from '../../game/battlefield.ts';

function Game() {
  const { t } = useTranslation();
  const { grid, opponentGrid } = useStore().battlefieldStore;
  const onSelfCellClick = (cell: BCell) => {
    console.log(cell);
  };
  const onOpponentCellClick = (cell: BCell) => {
    console.log(cell);
  };

  return (
    <div className={css.game}>
      <div className={css.turnTitle}>
        Ваш ход
      </div>
      <div className={css.row}>
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
            grid={opponentGrid}
            previewShip={null}
            onCellClick={onOpponentCellClick}
            onCellMouseEnter={() => console.log}
            onCellMouseLeave={() => console.log}
          />
          <p className={css.gridTitle}>{t('game.opponentsGrid')}</p>
        </div>
      </div>
    </div>
  );
}

export default Game;
