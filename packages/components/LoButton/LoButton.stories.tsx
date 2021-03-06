// YourComponent.stories.ts | YourComponent.stories.tsx

import React, { ComponentProps } from 'react';

import {
  Story, Meta
} from '@storybook/react';

import { LoButton } from './LoButton';

//๐ This default export determines where your story goes in the story list
export default {
  title: 'components/LoButton',
  component: LoButton
} as Meta;

//๐ We create a โtemplateโ of how args map to rendering
const Template: Story<ComponentProps<typeof LoButton>> = (args) => <LoButton {...args} >{args.children}</LoButton>;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*๐ The args you need here will depend on your component */
  children: 'I am in a story' };
