import React from 'react';
import { render, screen } from '@testing-library/react';
import Countdown from './Countdown';

test('renders', () => {
  render(<Countdown targetDate={new Date(Date.now() + 1000)} />);
});