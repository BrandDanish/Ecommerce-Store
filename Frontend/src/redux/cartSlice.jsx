import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
            const{id,size,color}= action.payload;
            state.items = state.items.filter(item => !(item.id === id && item.size === size && item.color === color));
        },
        clearCart: (state) => {
            state.items = [];
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