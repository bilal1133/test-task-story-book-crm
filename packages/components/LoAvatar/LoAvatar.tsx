export const LoAvatar = ({
  className = '',
  appearance,
  grouped,
  imageUrls,
  size = 'default'
}: {
  className?: string;
  appearance: 'SQUARE' | 'CIRCLE';
  grouped?: boolean; // overlapping avatars
  imageUrls: Array<string>;
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
}): JSX.Element => {

  const AvatarList = ({ _className = '' }: { _className?: string; }): JSX.Element => <>
    {imageUrls.map(imgUrl => (
      <img
        className={`avatar avatar-${size} ${appearance === 'CIRCLE' ? 'rounded-circle' : ''} ${_className}`}
        key={imgUrl}
        src={imgUrl}
        alt="avatar"
      />
    ))}
  </>;

  return grouped
    ? (
      <div className={`avatar-group ${className}`}>
        <AvatarList />
      </div>
    )
    : <AvatarList _className={className} />;
};
