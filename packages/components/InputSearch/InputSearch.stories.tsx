// YourComponent.stories.ts | YourComponent.stories.tsx

import React, { ComponentProps } from 'react';

import {
  Story, Meta
} from '@storybook/react';

import { InputSearch } from './InputSearch';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'components/InputSearch',
  component: InputSearch
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof InputSearch>> = (args) => <InputSearch {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*👇 The args you need here will depend on your component */
  placeholder: 'I am in a story' };
