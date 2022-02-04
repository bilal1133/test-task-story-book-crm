// YourComponent.stories.ts | YourComponent.stories.tsx

import {
  Meta, Story
} from '@storybook/react';
import React, { ComponentProps } from 'react';
import { LoCrm } from './LoBusinessTable';

//👇 This default export determines where your story goes in the story list
export default {
  title: '# Table/Business',
  component: LoCrm
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof LoCrm>> = (args: any) => <LoCrm {...args} />;

export const FirstStory = Template.bind({});
/*👇 The args you need here will depend on your component */
FirstStory.args = { isOpen: true };
