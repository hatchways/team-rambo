import { useKanban } from '../../../context/useKanbanContext';
import CardDialog from '../../CardDialog/CardDialog';

export const FocusCard = (): JSX.Element => {
  const { focusedCard } = useKanban();
  return (
    <>
      {focusedCard ? (
        <CardDialog
          id={focusedCard.id}
          name={focusedCard.name}
          columnId={focusedCard.columnId}
          tag={focusedCard?.tag || 'white'}
        />
      ) : null}
    </>
  );
};
