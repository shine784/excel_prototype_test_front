import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import { Button } from './Button';

// mock store
const store = {
  getState: () => {
    return {
      label:"ttt",
      todos: [
        {
          id: 1,
          text: 'Do Something',
          done: false
        }
      ]
    };
  },
  subscribe: () => {},
  dispatch: action('disptach')
};

const withReduxMockStore = (story) => (
  <Provider store={store}>{story()}</Provider>
);

const stories = storiesOf('Button', module).addDecorator((story) => <Provider store={store}>{story()}</Provider>)

stories.add('default', () => <Button size="large" label="kunhee1" />)
stories.add('default2', () => <Button size="small" label="kunhee2" />)
stories.add('default3', () => <Button/>)