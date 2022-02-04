import {
  DBDocument,
  TimeFrequency
} from '@app/types';
import {
  formatDistanceToNow, parseISO
} from 'date-fns';
import {
  useCallback, useEffect, useState
} from 'react';
import { Spinner } from 'reactstrap';

export const SaveIndicator = ({
  saveStatus,
  dbDoc,
  _needsSaving
}: {
  saveStatus: 'DEFAULT' | 'SAVING' | 'ERROR';
  dbDoc: DBDocument;
  _needsSaving?: boolean;
}): JSX.Element => {

  const [
    labelLastSaved,
    setLabelLastSaved
  ] = useState<string>('');

  const updateLabelLastSaved = useCallback(
    () => {
      const timestamp = dbDoc.updatedAt ?? dbDoc.createdAt;
      setLabelLastSaved(timestamp
        ? `${formatDistanceToNow(parseISO(timestamp))} ago`
        : '');
    },
    [
      dbDoc.createdAt,
      dbDoc.updatedAt
    ]
  );

  useEffect(
    () => {
      updateLabelLastSaved();
      const intervalId = setInterval(
        updateLabelLastSaved,
        TimeFrequency.OneMinute
      );
      return () => clearInterval(intervalId);
    },
    [
      saveStatus,
      updateLabelLastSaved
    ]
    // ^^^^ BEWARE: watching 'saveStatus' so that when it changes we run 'updateLabelLastSaved' anyway, without having to wait for 'setInterval' to run
  );

  return <div className="text-xs text-muted">
    {saveStatus === 'DEFAULT' && <>
      {!_needsSaving && <span>Last saved: {labelLastSaved}</span>}
      {_needsSaving && <span>Unsaved changes</span>}
    </>}
    {saveStatus === 'SAVING' && <span className="d-flex align-items-center">
      <Spinner size="sm" />
      <span className="ml-2">Saving</span>
    </span>}
    {saveStatus === 'ERROR' && <><span>An error occured, please retry.</span></>}
  </div>;
};
