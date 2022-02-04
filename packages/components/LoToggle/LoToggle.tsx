import { CSSProperties, useCallback, useState } from 'react';
import MultiToggle from 'react-multi-toggle';

interface LoToggleProps {
  className?: string;
  style?: CSSProperties;
  options: { displayName: string; value: string }[];
  activeValue: string;
  onChange: ({ value }: { value: string }) => void | Promise<void>;
}
const defaultOptions = [
  {
    displayName: 'default1',
    value: 'default1',
  },
  {
    displayName: 'default2',
    value: 'default2',
  },
];

export const LoToggle = ({ className, style, options = defaultOptions, activeValue, onChange }: LoToggleProps): JSX.Element => {
  const [
    ,
    // isSaving,
    setIsSaving,
  ] = useState<boolean>(false);

  const [toggleOptions] = useState<Array<{ displayName: string; value: string }>>(options);

  const [value, setValue] = useState<string>(toggleOptions.find(({ value }) => value === activeValue)?.value ?? toggleOptions[0].value);

  const _onChange = useCallback(
    async (value: string) => {
      setIsSaving(true);
      setValue(value);
      await onChange({ value });
      setIsSaving(false);
    },
    [onChange]
  );

  return (
    <div className={className} style={style}>
      <MultiToggle options={options} selectedOption={value} onSelectOption={_onChange} />
    </div>
  );
};

// export const _LoToggle = ({ className }: {
//   className?: string;
// }): JSX.Element => {

//   const labelLeft = 'LEFT';
//   const labelRight = 'RIGHT';

//   const [
//     activeSide,
//     setActiveSide
//   ] = useState<'LEFT' | 'RIGHT'>('LEFT');

//   return <>

//     <div
//       className="position-relative"
//       style={{ border: `1px solid ${ColoursHex.$secondary}` }}
//     >
//       <div
//         className="w-50"
//         style={{
//           backgroundColor: ColoursHex.$default,
//           border: `1px solid ${ColoursHex.$primary}`,
//           marginLeft: activeSide === 'LEFT' ? '0%' : '50%',
//           transition: 'margin-left 0.3s linear 0s'
//         }}
//       >&nbsp;</div>
//       <div className="d-flex w-100 position-absolute top">
//         <div
//           className="w-50 text-center cursor-pointer"
//           onClick={() => setActiveSide('LEFT')}
//           style={{
//             color: activeSide === 'LEFT' ? ColoursHex.$white : ColoursHex.$default,
//             transition: 'color 0.3s linear 0s'
//           }}
//         >{labelLeft}</div>
//         <div
//           className="w-50 text-center cursor-pointer"
//           onClick={() => setActiveSide('RIGHT')}
//           style={{
//             color: activeSide === 'RIGHT' ? ColoursHex.$white : ColoursHex.$default,
//             transition: 'color 0.3s linear 0s'
//           }}
//         >{labelRight}</div>
//       </div>
//     </div>

//     <br />
//     <br />

//     <div
//       className="position-relative"
//       style={{ border: `1px solid ${ColoursHex.$secondary}` }}
//     >
//       <div
//         className="w-50"
//         style={{
//           backgroundColor: ColoursHex.$default,
//           border: `1px solid ${ColoursHex.$primary}`,
//           marginLeft: activeSide === 'LEFT' ? '0%' : '50%',
//           transition: 'margin-left 0.3s linear 0s'
//         }}
//       >&nbsp;</div>
//       <div className="d-flex w-100 position-absolute top">
//         <div
//           className="w-50 text-center cursor-pointer"
//           onClick={() => setActiveSide('LEFT')}
//         >
//           <IonIcon
//             name="trash-outline"
//             style={{
//               color: activeSide === 'LEFT' ? ColoursHex.$white : ColoursHex.$default,
//               transition: 'color 0.3s linear 0s'
//             }}
//           />
//         </div>
//         <div
//           className="w-50 text-center cursor-pointer"
//           onClick={() => setActiveSide('RIGHT')}
//         >
//           <IonIcon
//             name="create-outline"
//             style={{
//               color: activeSide === 'RIGHT' ? ColoursHex.$white : ColoursHex.$default,
//               transition: 'color 0.3s linear 0s'
//             }}
//           />
//         </div>
//       </div>
//     </div>

//     <br />
//     <br />

//     <div
//       className="position-relative"
//       style={{ border: `1px solid ${ColoursHex.$secondary}` }}
//     >
//       {/* <div
//         className="w-50"
//         style={{
//           backgroundColor: ColoursHex.$default,
//           border: `1px solid ${ColoursHex.$primary}`,
//           marginLeft: activeSide === 'LEFT' ? '0%' : '50%',
//           transition: 'margin-left 0.3s linear 0s'
//         }}
//       >&nbsp;</div> */}
//       <div className="d-flex w-100 position-absolute top overflow-hidden">
//         <div
//           onClick={() => setActiveSide('RIGHT')}
//           className="text-center cursor-pointer overflow-hidden"
//           style={{
//             width: activeSide === 'LEFT' ? '100%' : '0',
//             transition: 'width 0.3s linear 0s'
//           }}
//         >{labelLeft}</div>
//         <div
//           onClick={() => setActiveSide('LEFT')}
//           className="text-center cursor-pointer overflow-hidden"
//           style={{
//             width: activeSide === 'RIGHT' ? '100%' : '0',
//             transition: 'width 0.3s linear 0s'
//           }}
//         >{labelRight}</div>
//       </div>
//     </div>

//   </>;
// };
