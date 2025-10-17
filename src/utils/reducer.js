import { Type } from "./action.type";

export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      const productToAdd = action.payload;
      const itemExists = state.basket.find(
        (item) => item.id === productToAdd.id
      );

      if (!itemExists) {
        return {
          ...state,
          basket: [...state.basket, { ...productToAdd, amount: 1 }],
        };
      }

      const updatedBasket = state.basket.map((item) => {
        if (item.id === productToAdd.id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });

      return {
        ...state,
        basket: updatedBasket,
      };
    }

    case Type.REMOVE_FROM_BASKET: {
      const idToRemove = action.payload;
      const index = state.basket.findIndex((item) => item.id === idToRemove);
      const newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          // remove the item entirely
          newBasket.splice(index, 1);
        }
      }

      return {
        ...state,
        basket: newBasket,
      };
    }

    case Type.EMPTY_USER: {
      return {
        ...state,
        basket: [],
      };
    }
    case Type.SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }

    default:
      return state;
  }
};
