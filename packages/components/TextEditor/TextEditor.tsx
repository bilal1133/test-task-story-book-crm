import { KeyPressDebounceDurarion } from '@app/constants';
import { debounce } from 'lodash';
import dynamic from 'next/dynamic';
import {
  DeltaStatic, Sources
} from 'quill';
import React, {
  forwardRef,
  useCallback, useImperativeHandle, useMemo, useState
} from 'react';
import { UnprivilegedEditor } from 'react-quill';

const _ReactQuill = dynamic(
  () => import('react-quill'),
  { ssr: false }
);

// Formats vs Toolbar:
// By default all formats are enabled and allowed to exist within a Quill editor and can be configured with the formats option.
// This is separate from adding a control in the Toolbar.
// For example, you can configure Quill to allow bolded content to be pasted into an editor that has no bold button in the toolbar.
// https://quilljs.com/docs/formats/
const formats = [

  // Inline
  'background',
  'bold',
  'color',
  'font',
  'code',
  'italic',
  'link',
  'size',
  'strike',
  'script',
  'underline',

  // Block
  'blockquote',
  'header',
  'indent',
  'list',
  'align',
  'direction',
  'code-block',

  // Embeds
  // 'formula (requires KaTex)',
  'image',
  'video'
];

// Toolbar module
// https://quilljs.com/docs/modules/toolbar/
const getToolbarOptions = ({
  brandColors,
  disableHeaders
}: {
  brandColors?: Array<string>;
  disableHeaders?: boolean;
} = {}) => {
  const _toolbarOptions: Array<unknown> =[];
  // _toolbarOptions.push(
  //   [
  //     { font: [...] }
  //   ]
  // );
  if (!disableHeaders) {
    _toolbarOptions.push(
      [
        { header: [
          1,
          2,
          3,
          4,
          5,
          6,
          false
        ] }
      ]
    );
  }
  _toolbarOptions.push(
    [
      'bold',
      'italic',
      'underline',
      'strike'
    ],
    [
      'link'
    //   'blockquote', // TODO: FIXME: does not work in READ mode
    //   'code-block' // TODO: FIXME: does not work in READ mode
    ],
    [
      { align: '' },
      { align: 'center' },
      { align: 'right' },
      { align: 'justify' }
    ],
    [
      { list: 'ordered' },
      { list: 'bullet' }
    ],
    [
      { indent: '-1' },
      { indent: '+1' }
    ]
  );
  if (brandColors?.length) {
    _toolbarOptions.push([
      { color: brandColors }, // TODO: brand colors
      { background: brandColors } // TODO: brand colors
    ]);
  }
  _toolbarOptions.push([
    'clean'
  ]);
  return _toolbarOptions;
};

// https://quilljs.com/docs/modules/
const getModules = ({
  brandColors,
  disableHeaders
}: {
  brandColors?: Array<string>;
  disableHeaders?: boolean;
} = {}) => ({ toolbar: getToolbarOptions({
  brandColors,
  disableHeaders
}) });

interface TextEditorProps {
  theme?: 'snow' | 'bubble'; // we only support bubble at the moment // TODO: delete me
  readModeShowPlaceholderWhenEmptyValue?: boolean; // TODO: delete me
  readModePlaceholderHTML?: string; // TODO: delete me

  className?: string;
  mode?: 'WRITE' | 'READ';
  placeholder?: string;
  disabled?: boolean;
  initialValue?: string;
  onChange?: (valueHTML: string, valuePlainText: string, delta: DeltaStatic, source: Sources, editor: UnprivilegedEditor) => void | Promise<void>;

  brandColors?: Array<string>;
  disableHeaders?: boolean;
}

export interface TextEditorRefProps {
  clear: () => void;
  getValueHTML: () => string;
}

// eslint-disable-next-line react/display-name
export const TextEditor = forwardRef<TextEditorRefProps, TextEditorProps>(
  (
    {
      theme = 'bubble',

      className,
      mode = 'WRITE',
      placeholder = 'Add your text here',
      disabled,
      initialValue = '',
      onChange,

      brandColors,
      disableHeaders
    }: TextEditorProps,
    ref
  ) => {

    const [
      isClearing,
      setIsClearing
    ] = useState<boolean>(false);

    const _className = useMemo(
      () => `${disabled ? 'ql-disabled' : ''} ${disableHeaders ? 'ql-disable-headers' : ''} ${className}`,
      [
        className,
        disableHeaders,
        disabled
      ]
    );

    const _modules = useMemo(
      () => getModules({
        brandColors,
        disableHeaders
      }),
      [
        brandColors,
        disableHeaders
      ]
    );

    const _readOnly = useMemo(
      () => disabled || mode === 'READ' || isClearing, // forcing the editor to blur when clearing by setting it to 'read only' for an instant
      [
        disabled,
        isClearing,
        mode
      ]
    );

    const [
      _value,
      _setValue
    ] = useState<string>(initialValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const _onChangePropagationDebounced = useCallback(
      debounce(
        async (value: string, delta: DeltaStatic, source: Sources, editor: UnprivilegedEditor) => {
          if (!onChange) return;
          // BEWARE: when Quill is empty, there is still a blank line represented by ‘\n’ (i.e. <p><br></p>), so getLength will return 1
          // https://quilljs.com/docs/api/#getlength
          const valueHTML = editor.getLength() === 1 ? '' : value;
          let valuePlainText = '';
          if (valueHTML.length) {
            const elHTMLtoPlainText = document.createElement('div');
            elHTMLtoPlainText.innerHTML = valueHTML;
            valuePlainText = elHTMLtoPlainText.innerText.slice();
          }
          await onChange(valueHTML, valuePlainText, delta, source, editor);
        },
        KeyPressDebounceDurarion
      ),
      [
        onChange
      ]
      // ^^^^ BEWARE: manually-adjusted deps
    );

    const _onChange = useCallback(
      async (value: string, delta: DeltaStatic, source: Sources, editor: UnprivilegedEditor) => {
        if (isClearing) return;
        _setValue(value);
        await _onChangePropagationDebounced(value, delta, source, editor); // no need to 'await' because it's
      },
      [
        _onChangePropagationDebounced,
        isClearing
      ]
    );

    // BEWARE: 'useImperativeHandle' is the way React exposes any methods to a potential parent
    useImperativeHandle(
      ref,
      () => ({
        clear: () => {
          setIsClearing(true);
          _setValue('');
          setTimeout(() => setIsClearing(false)); // BEWARE: mandatory wrapping because state updates are batched
        },
        getValueHTML: () => _value
      }),
      [
        _value
      ]
    );

    return (
      <_ReactQuill
        className={_className}
        theme={theme}
        placeholder={placeholder}
        readOnly={_readOnly}
        value={_value}
        onChange={_onChange}
        formats={formats}
        modules={_modules}
      />
    );
  }
);
