import { LoButtonStatus } from '@app/types';

export const copyToClipboard = async ({
  plainText,
  onSuccessNotify = true
}: { plainText: string; onSuccessNotify?: boolean; }): Promise<LoButtonStatus> => {
  if (!plainText.length) return LoButtonStatus.Fail;
  try {
    await navigator.clipboard.writeText(plainText);
    if (onSuccessNotify) alert(`Successfully copied to clipboard: ${plainText}`);
    return LoButtonStatus.Success;
  } catch (error) {
    console.log('---- ERROR: clipboard -> copyToClipboard', error);
    return LoButtonStatus.Fail;
  }
};
