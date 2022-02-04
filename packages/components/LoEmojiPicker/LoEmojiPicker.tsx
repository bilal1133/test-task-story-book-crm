import { IEmojiPickerProps } from 'emoji-picker-react';
import dynamic from 'next/dynamic';

const _Loading = (): JSX.Element => (
  <p className="mb-0 text-xs">Loading emojis...</p>
);

export const LoEmojiPicker = dynamic<IEmojiPickerProps>(
  () => import('emoji-picker-react'),
  {
    ssr: false,
    loading: _Loading
  }
);
