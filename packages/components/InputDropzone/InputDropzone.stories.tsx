// YourComponent.stories.ts | YourComponent.stories.tsx

import {
  fileFormatsAndMIMETypesByCategory, prettyPrintJSON
} from '@app/helpers';
import { FileCategory } from '@app/types';
import {
  Meta, Story
} from '@storybook/react';
import React, { ComponentProps } from 'react';
import { InputDropzone } from './InputDropzone';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'components/InputDropzone',
  component: InputDropzone
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof InputDropzone>> = (args) => <InputDropzone {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*👇 The args you need here will depend on your component */
  whitelist: {
    ...fileFormatsAndMIMETypesByCategory({
      isGeneric: true,
      category: FileCategory.Image
    }),
    ...fileFormatsAndMIMETypesByCategory({
      isGeneric: true,
      category: FileCategory.Video
    })
  },
  onDropAccepted: (files) => {
    alert('onDropAccepted');
    alert(prettyPrintJSON(files));
  },
  onDropRejected: (fileRejections) => {
    alert('onDropRejected');
    alert(prettyPrintJSON(fileRejections));
  }
};
