// YourComponent.stories.ts | YourComponent.stories.tsx

import {
  Meta, Story
} from '@storybook/react';
import React, { ComponentProps } from 'react';
import { ModalExample } from './ModalExample';

//๐ This default export determines where your story goes in the story list
export default {
  title: '# Storybook Helpers/ModalExample',
  component: ModalExample
} as Meta;

//๐ We create a โtemplateโ of how args map to rendering
const Template: Story<ComponentProps<typeof ModalExample>> = (args: any) => <ModalExample {...args} />;

export const FirstStory = Template.bind({});
/*๐ The args you need here will depend on your component */
FirstStory.args = { isOpen: true };
