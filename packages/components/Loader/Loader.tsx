import { Spinner } from 'reactstrap';

export const LoaderFullScreen = (): JSX.Element => (
  <div className="position-absolute left top w-100 h-100 d-flex align-items-center justify-content-center">
    <Spinner />
  </div>
);
