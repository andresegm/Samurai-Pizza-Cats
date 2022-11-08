import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { GET_PIZZAS } from '../graphql/pizza/queries/get-pizzas';
import { CREATE_PIZZA } from '../graphql/pizza/mutations/create-pizza';
//import { DELETE_TOPPING } from '../graphql/topping/mutations/delete-topping';
//import { UPDATE_TOPPING } from '../graphql/topping/mutations/update-topping';

interface UsePizzaMutationsOutput {
  onCreatePizza: (selectedPizza: any) => void;
  //onDeleteTopping: (selectedTopping: any) => Promise<void>;
  //onUpdateTopping: (selectedTopping: any) => void;
}

const usePizzaMutations = (): UsePizzaMutationsOutput => {
  const [createPizza] = useMutation(CREATE_PIZZA, { refetchQueries: [GET_PIZZAS, 'Pizzas'] });
  // const [deleteTopping] = useMutation(DELETE_TOPPING, { refetchQueries: [GET_TOPPINGS, 'Toppings'] });
  //const [updateTopping] = useMutation(UPDATE_TOPPING);

  const onCreatePizza = useCallback(
    (selectedPizza) => {
      try {
        createPizza({
          variables: {
            createPizzaInput: {
              name: selectedPizza.name,
              description: selectedPizza.description,
              ImgSrc: selectedPizza.ImgSrc,
              toppingIds: selectedPizza.toppingIds,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [createPizza]
  );
  /*
  const onDeleteTopping = useCallback(
    async (selectedTopping) => {
      try {
        await deleteTopping({
          variables: {
            deleteToppingInput: {
              id: selectedTopping.id,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [deleteTopping]
  );

  const onUpdateTopping = useCallback(
    (selectedTopping) => {
      try {
        updateTopping({
          variables: {
            updateToppingInput: {
              id: selectedTopping.id,
              name: selectedTopping?.name,
              priceCents: selectedTopping?.priceCents,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [updateTopping]
  );
*/
  return { onCreatePizza };
};

export default usePizzaMutations;
