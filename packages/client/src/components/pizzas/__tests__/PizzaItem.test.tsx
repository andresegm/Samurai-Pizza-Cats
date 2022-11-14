import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { createTestPizza } from '../../../lib/test/helper/pizza';
import PizzaItem, { PizzaItemProps } from '../PizzaItem';
import { act } from 'react-dom/test-utils';

describe('PizzaItem', () => {
  const renderPizzaList = (props: PizzaItemProps) => {
    const view = renderWithProviders(<PizzaItem {...props} />);

    return {
      ...view,
      $getPrice: () => screen.getByTestId(/^pizza-price/),
      $getName: () => screen.getByTestId(/^pizza-name/),
      $getDescription: () => screen.getByTestId(/^pizza-description/),
      $getToppings: () => screen.getByTestId(/^pizza-toppings/),
      $getCardItem: () => screen.getByTestId(/^pizza-cardItem/),
    };
  };

  const props = {
    handleOpen: jest.fn(),
    pizza: createTestPizza(),
  };

  test('should display all components of the pizza item', async () => {
    const { $getPrice, $getName, $getDescription, $getToppings } = renderPizzaList(props);

    expect($getPrice()).toBeVisible();
    expect($getName()).toBeVisible();
    expect($getDescription()).toBeVisible();
    expect($getToppings()).toBeVisible();
  });

  test('should call handleOpen when the pizza card is clicked', async () => {
    const { $getCardItem } = renderPizzaList(props);

    act(() => userEvent.click($getCardItem()));

    expect(props.handleOpen).toHaveBeenCalledTimes(1);
  });
});
