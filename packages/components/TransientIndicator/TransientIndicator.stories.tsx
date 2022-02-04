// YourComponent.stories.ts | YourComponent.stories.tsx

import {
  Meta, Story
} from '@storybook/react';
import React, { ComponentProps } from 'react';
import { TransientIndicator } from './TransientIndicator';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'components/TransientIndicator',
  component: TransientIndicator
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof TransientIndicator>> = (args) => <TransientIndicator {...args} >{args.children}</TransientIndicator>;

export const Saving = Template.bind({});
Saving.args = {
  /*👇 The args you need here will depend on your component */
  children: 'I am child content.',
  isSaving: true
};

export const Loading = Template.bind({});
Loading.args = {
  /*👇 The args you need here will depend on your component */
  children: 'I am child content.',
  isLoading: true
};

export const GenericAction = Template.bind({});
GenericAction.args = {
  /*👇 The args you need here will depend on your component */
  children: 'I am child content.',
  isTransientAction: true
};
