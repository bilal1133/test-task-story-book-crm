// YourComponent.stories.ts | YourComponent.stories.tsx

import {
  Meta, Story
} from '@storybook/react';
import React, { ComponentProps } from 'react';
import { LoAvatar } from './LoAvatar';

//π This default export determines where your story goes in the story list
export default {
  title: 'components/LoAvatar',
  component: LoAvatar
} as Meta;

//π We create a βtemplateβ of how args map to rendering
const Template: Story<ComponentProps<typeof LoAvatar>> = (args) => <LoAvatar {...args} />;

export const Single = Template.bind({});
Single.args = {
  /*π The args you need here will depend on your component */
  appearance: 'CIRCLE',
  imageUrls: [
    '/img/placeholder-profile-pic.jpg'
  ]
};

export const Grouped = Template.bind({});
Grouped.args = {
  /*π The args you need here will depend on your component */
  grouped: true,
  appearance: 'CIRCLE',
  imageUrls: [
    '/img/placeholder-profile-pic.jpg',
    '/img/placeholder-profile-pic.jpg',
    '/img/placeholder-profile-pic.jpg'
  ]
};
