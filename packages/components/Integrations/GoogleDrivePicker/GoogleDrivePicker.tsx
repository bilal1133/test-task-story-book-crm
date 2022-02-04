import { LoButton } from '@lolab/components';
import { loadGoogleDrivePicker } from '@lolab/components/Integrations/GoogleDrivePicker/loadGoogleDrivePicker';
import { useScript } from '@app/hooks';
import { useState } from 'react';

export const GoogleDrivePicker = ({
  className,
  pickerView,
  onPicked
}: {
  className?: string;
  pickerView: keyof typeof google.picker.ViewId;
  onPicked: (pickedUrls: Array<string>) => void;
}): JSX.Element => {

  const [
    loading,
    setIsLoading
  ] = useState<boolean>(true);

  useScript({
    src: 'https://apis.google.com/js/api.js',
    onAlreadyLoaded: () => {
      if (loading) setIsLoading(false);
    },
    onLoad: () => {
      if (loading) setIsLoading(false);
    }
  });

  return (
    <LoButton
      className={className}
      color="white"
      disabled={loading}
      onClick={() => loadGoogleDrivePicker({
        pickerView,
        onPicked
      })}
    >
      <span className="d-flex align-items-center">
        <img
          src="/icons/GoogleDrive-Logo-Button.png"
          className="mr-2"
          width="16"
          alt="Google Drive Logo"
        />
        Google Drive
      </span>
    </LoButton>
  );
};
