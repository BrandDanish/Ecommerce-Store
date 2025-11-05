import {createSlice} from "@reduxjs/toolkit";
const storedCart=localStorage.getItem('cart');
const initialState={
    items:storedCart ? JSON.parse(storedCart) : [],

}
const cartSlice = createSlice({
    name: "cart",
    initialState, 
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            const{id,size,color}= action.payload;
            state.items = state.items.filter(item => !(item.id === id && item.size === size && item.color === color));
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        updateQuantity: (state, action) => {
            const {id, qty,size,color} = action.payload;
            const item = state.items.find(item => item.id === id && item.size === size && item.color === color);
            if (item) {
                item.qty = qty;
            }
        },
    },
});
export const {addToCart, removeFromCart, clearCart, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;