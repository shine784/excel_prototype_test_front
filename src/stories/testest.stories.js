import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import { Button } from './Button';


// mock store
const store = {
  getState: () => {
    return {
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

const withReduxMockStore = (story: () => JSX.Element) => (
  <Provider store={store}>{story()}</Provider>
);


export default {
  title: 'components|Container',
  component: Button,
  decorators: [withReduxMockStore]
};

export const sample = () => <Button />