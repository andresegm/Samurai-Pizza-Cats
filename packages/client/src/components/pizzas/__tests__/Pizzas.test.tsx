import { screen, waitFor } from '@testing-library/react';
import { graphql } from 'msw';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { server } from '../../../lib/test/msw-server';
import Pizzas from '../Pizzas';
import { Result } from '../../../types/schema';

describe('Pizzas', () => {
  const renderPizzaList = () => {
    const view = renderWithProviders(<Pizzas />);

    return {
      ...view,
      $findPizzaItems: () => screen.findAllByTestId(/^pizza-item-/),
      $seeLoadingPizza: () => screen.queryByTestId(/^pizza-list-loading/),
      $loadButton: () => screen.queryByTestId('load-more'),
    };
  };

  const mockPizzaQuery = (data: Partial<Result> = {}) => {
    const responseData: Result = {
      hasNextPage: false,
      results: [],
      totalCount: 0,
      cursor: null,
      ...data,
    };
    server.use(
      graphql.query('Pizzas', (_request, response, context) => {
        context.delay();
        return response(context.data({ loading: false, pizzas: responseData }));
      })
    );
  };

  const mockPizzaQueryLoading = (data: Partial<Result> = {}) => {
    const responseData: Result = {
      hasNextPage: false,
      results: [],
      totalCount: 0,
      cursor: null,
      ...data,
    };
    server.use(
      graphql.query('Pizzas', (_request, response, context) => {
        context.delay();
        return response(context.data({ loading: true, pizzas: responseData }));
      })
    );
  };

  test('should display a list of pizzas', async () => {
    const { $findPizzaItems } = renderPizzaList();
    expect($findPizzaItems()).resolves.toHaveLength(2);
  });

  test('should see loading state', async () => {
    mockPizzaQueryLoading({ hasNextPage: true });
    const { $seeLoadingPizza } = renderPizzaList();
    expect($seeLoadingPizza()).toBeVisible();
    expect($seeLoadingPizza()).not.toBeNull();
  });

  test('button should be visible', async () => {
    mockPizzaQuery({ hasNextPage: true });
    const { $loadButton } = renderPizzaList();
    await waitFor(() => expect($loadButton()).not.toBeNull());
    expect($loadButton()).toBeVisible();
  });

  test('should not display see more button if no more pizzas can be fetched', async () => {
    mockPizzaQuery({ hasNextPage: false });
    const { $loadButton } = renderPizzaList();
    expect($loadButton()).toBeNull();
  });
});
