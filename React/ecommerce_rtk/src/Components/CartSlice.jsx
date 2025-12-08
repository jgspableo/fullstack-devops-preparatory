import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

const initialState = {
  cartItems: [],
};

addItemToCart(state, action) {
    const existingItem = state.cartItems.find(item => item.id === action.payload.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cartItems.push({ ...action.payload, quantity:1 });
    }
}

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = CartSlice.actions;
export default CartSlice.reducer;