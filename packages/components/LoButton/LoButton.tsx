import { CSSAnimationDuration } from '@app/constants';
import { delay } from '@app/helpers';
import {
  ColoursHex, ColourType, LoButtonStatus
} from '@app/types';
import { IonIcon } from '@lolab/components';
import classnames from 'classnames';
import {
  CSSProperties, MouseEvent, ReactNode, useEffect, useState
} from 'react';
import {
  Button, Spinner
} from 'reactstrap';
import styles from './LoButton.module.scss';

export type LoButtonSize = 'sm' | undefined | 'lg';
type LoButtonType = 'button' | 'reset' | 'submit';

export interface LoButtonProps {
  domId?: string; // HTML prop 'id'
  autoFocus?: boolean;
  animateResponse?: boolean;
  block?: boolean;
  children?: ReactNode;
  className?: string;
  color?: ColourType | 'link';
  disabled?: boolean;
  // href?: string; // BEWARE: use onClick instead
  icon?: string;
  iconColor?: ColoursHex;
  iconSize?: string;
  letterSpacing?: 'default' | 'large';
  onClick?: (event?: MouseEvent) => LoButtonStatus | void | Promise<LoButtonStatus | void>;
  outline?: boolean;
  size?: LoButtonSize;
  type?: LoButtonType;
  style?: CSSProperties;
}

export const LoButton = ({
  domId,
  autoFocus,
  animateResponse,
  block = false,
  children,
  className,
  color = 'default',
  disabled,
  icon,
  iconColor,
  iconSize = '16px',
  letterSpacing = 'default',
  onClick,
  outline,
  size,
  type = 'button',
  style = {}
  // ...props
}: LoButtonProps): JSX.Element => {
  // }: LoButtonProps & HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, ref): JSX.Element => {

  const [
    isMounted,
    setIsMounted
  ] = useState<boolean>(false);
  useEffect(
    () => {
      setIsMounted(true);
      return () => setIsMounted(false);
    },
    []
    // ^^^^ BEWARE: empty array as we want this to run only ONCE, when the component mounts
  );

  const [
    status,
    setStatus
  ] = useState<LoButtonStatus>(LoButtonStatus.Default);

  const [
    firstClick,
    setFirstClick
  ] = useState<boolean>(false);

  const onBtnClick = async (e: MouseEvent): Promise<void> => {
    if (disabled || !onClick || status !== LoButtonStatus.Default) {
      return;
    }
    setFirstClick(true);
    if (animateResponse) {
      setStatus(LoButtonStatus.Progress);
    }
    let result: LoButtonStatus | void;
    try {
      result = await onClick(e);
      if (!result) {
        result = LoButtonStatus.Success;
      }
    } catch (err) {
      result = LoButtonStatus.Fail;
    }
    if (animateResponse) {
      if (result) {
        setStatus(result);
        await delay(2 * CSSAnimationDuration);
      }
      if (isMounted) setStatus(LoButtonStatus.Default); // BEWARE: using 'isMounted' to determine whether it's legit to update the state
    }
  };

  return (
    <Button
      id={domId}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
      block={block}
      color={color}
      outline={outline}
      size={size}
      type={type}
      // disabled={disabled} // BEWARE: do NOT uncomment this, else the 'box-shadow' is 'none' when 'disabled' is truthy
      onClick={onBtnClick}
      className={classnames(
        className,
        {
          [styles.letterSpacingLarge]: letterSpacing === 'large',
          'cursor-not-allowed': disabled
        }
      )}
      style={{
        ...style,
        minWidth: children ? '155px' : undefined,
        opacity: disabled ? 0.5 : undefined
      }}
      // {...props}
    >
      <span className="d-flex align-items-center justify-content-center">

        {status === LoButtonStatus.Default && !!icon &&
      <span className={classnames(`d-flex ${children ? 'mr-2' : ''}`, { 'animation--fade-in-fwd': firstClick && animateResponse })}>
        <IonIcon
          name={icon}
          color={iconColor ?? (color === 'white' ? ColoursHex.$default : ColoursHex.$white)}
          fontSize={iconSize}
        />
      </span>}
        {status === LoButtonStatus.Progress &&
        <span className={`d-flex ${children ? 'mr-2' : ''} animation--fade-in-fwd`}>
          <Spinner
            size="sm"
            color={color === 'white' ? 'default' : 'white'}
          />
        </span>}
        {status === LoButtonStatus.Success &&
        <span className={`d-flex ${children ? 'mr-2' : ''} animation--fade-in-fwd`}>
          <IonIcon
            name="checkmark-outline"
            color={iconColor ?? (color === 'white' ? ColoursHex.$default : ColoursHex.$white)}
            fontSize="17px"
          />
        </span>}
        {status === LoButtonStatus.Fail &&
        <span className={`d-flex ${children ? 'mr-2' : ''} animation--fade-in-fwd`}>
          <IonIcon
            name="close"
            color={iconColor ?? (color === 'white' ? ColoursHex.$default : ColoursHex.$white)}
            fontSize="17px"
          />
        </span>}

        {!!children && (
          <span>
            {children}
          </span>
        )}

      </span>
    </Button>
  );
}
;
