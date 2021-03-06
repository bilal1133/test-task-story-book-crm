// YourComponent.stories.ts | YourComponent.stories.tsx

import React, { ComponentProps } from 'react';

import {
  Story, Meta
} from '@storybook/react';

import { TextEditor } from './TextEditor';

//๐ This default export determines where your story goes in the story list
export default {
  title: 'components/TextEditor',
  component: TextEditor
} as Meta;

//๐ We create a โtemplateโ of how args map to rendering
const Template: Story<ComponentProps<typeof TextEditor>> = (args) => <TextEditor {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*๐ The args you need here will depend on your component */
  onChange: (valueHTML, valuePlainText) => {
    console.group('TextEditor');
    console.log('valueHTML', valueHTML);
    console.log('valuePlainText', valuePlainText);
    console.groupEnd();
  } };
