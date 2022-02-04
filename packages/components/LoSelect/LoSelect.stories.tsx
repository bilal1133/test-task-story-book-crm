// YourComponent.stories.ts | YourComponent.stories.tsx

import {
  Meta, Story
} from '@storybook/react';
import React, { ComponentProps } from 'react';
import { LoSelect } from './LoSelect';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'components/LoSelect',
  component: LoSelect
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof LoSelect>> = (args) => <LoSelect {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*👇 The args you need here will depend on your component */
  enableColorDot: true,
  options: [
    {
      value: 'ocean',
      label: 'Ocean',
      color: '#00B8D9'
    },
    {
      value: 'blue',
      label: 'Blue',
      color: '#0052CC'
    },
    {
      value: 'purple',
      label: 'Purple',
      color: '#5243AA'
    },
    {
      value: 'red',
      label: 'Red',
      color: '#FF5630'
    },
    {
      value: 'orange',
      label: 'Orange',
      color: '#FF8B00'
    },
    {
      value: 'yellow',
      label: 'Yellow',
      color: '#FFC400'
    },
    {
      value: 'green',
      label: 'Green',
      color: '#36B37E'
    },
    {
      value: 'forest',
      label: 'Forest',
      color: '#00875A'
    },
    {
      value: 'slate',
      label: 'Slate',
      color: '#253858'
    },
    {
      value: 'silver',
      label: 'Silver',
      color: '#666666'
    }
  ]
};
