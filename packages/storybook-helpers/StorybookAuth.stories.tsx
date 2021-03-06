// YourComponent.stories.ts | YourComponent.stories.tsx

import {
  Meta, Story
} from '@storybook/react';
import React, { ComponentProps } from 'react';
import { StorybookAuth } from './StorybookAuth';

//๐ This default export determines where your story goes in the story list
export default {
  title: '# Storybook Helpers/StorybookAuth',
  component: StorybookAuth
} as Meta;

//๐ We create a โtemplateโ of how args map to rendering
// const Template: Story<ComponentProps<typeof StorybookAuth>> = (args) => <StorybookAuth {...args} ></StorybookAuth>;
const Template: Story<ComponentProps<typeof StorybookAuth>> = () => <StorybookAuth />;

export const FirstStory = Template.bind({});
// FirstStory.args = {
//   /*๐ The args you need here will depend on your component */
// };
