// YourComponent.stories.ts | YourComponent.stories.tsx

import React, { ComponentProps } from 'react';

import {
  Story, Meta
} from '@storybook/react';

import { InputSearch } from './InputSearch';

//๐ This default export determines where your story goes in the story list
export default {
  title: 'components/InputSearch',
  component: InputSearch
} as Meta;

//๐ We create a โtemplateโ of how args map to rendering
const Template: Story<ComponentProps<typeof InputSearch>> = (args) => <InputSearch {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*๐ The args you need here will depend on your component */
  placeholder: 'I am in a story' };
