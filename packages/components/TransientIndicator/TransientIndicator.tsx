import { ReactNode } from 'react';
import { Spinner } from 'reactstrap';

export const TransientIndicator = ({
  isSaving,
  isSavingLabel = 'Saving...',
  isLoading,
  isLoadingLabel = 'Loading...',
  isTransientAction,
  isTransientActionLabel,
  children
}: {
  isSaving?: boolean;
  isSavingLabel?: string;
  isLoading?: boolean;
  isLoadingLabel?: string;
  isTransientAction?: boolean;
  isTransientActionLabel?: string;
  children?: ReactNode; }): JSX.Element | null => isSaving || isLoading || isTransientAction
  ? (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Spinner />
      {isSaving && !!isSavingLabel.length && <p className="mb-0 text-sm mt-2">{isSavingLabel}</p>}
      {isLoading && !!isLoadingLabel?.length && <p className="mb-0 text-sm mt-2">{isLoadingLabel}</p>}
      {isTransientAction && !!isTransientActionLabel?.length && <p className="mb-0 text-sm mt-2">{isTransientActionLabel}</p>}
    </div>
  )
  : (
    children
      ? <>{children}</>
      : null
  );
