// YourComponent.stories.ts | YourComponent.stories.tsx

import {
  Meta, Story
} from '@storybook/react';
import React, { ComponentProps } from 'react';
import { LoUploadArea } from './LoUploadArea';

//๐ This default export determines where your story goes in the story list
export default {
  title: 'components/LoUploadArea',
  component: LoUploadArea
} as Meta;

//๐ We create a โtemplateโ of how args map to rendering
const Template: Story<ComponentProps<typeof LoUploadArea>> = (args) => <LoUploadArea {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*๐ The args you need here will depend on your component */
};
