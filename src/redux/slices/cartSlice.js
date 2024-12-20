import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialState = {

    userID: {},
    likeItems: [],
    cartItems: [],
    reserveItems: [],
    totalAmount: 0,
    totalQuantity: 0

}

const cartSlice = createSlice ({
    name: 'cart',
    initialState,
    reducers: {
        addItem:(state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find (
                (item) => item.id === newItem.id
            );

            state.totalQuantity++

            if(!existingItem) {
                state.cartItems.push ({
                    id: newItem.id,
                    productName: newItem.productName ?? newItem.itemProductName,
                    imgUrl: newItem.imgUrl,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    size: newItem.size ?? '',
                    color: newItem.color ?? '',
                })
            }

            else {
                existingItem.quantity++
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number
                (newItem.price)
            }

            state.totalAmount = state.cartItems.reduce((total, item) => total+
            Number(item.price) * Number(item.quantity),0
            );
        },

        deleteItem:(state, action) => {
            const id = action.payload
            const existingItem = state.cartItems.find(item => item.id === id)
    
            if (existingItem) {
                state.cartItems = state.cartItems.filter(item => item.id !== id)
                state.totalQuantity = state.totalQuantity - existingItem.quantity
            }
    
            state.totalAmount = state.cartItems.reduce((total, item) => total+
                Number(item.price) * Number(item.quantity),0
            );
        },

        likeItem: (state, action) => {
            const newItem = action.payload;
            const isLiked = _.find(state.likeItems, o => o.id === newItem.id);
            const likeData = isLiked ? _.filter(state.likeItems, o => o.id !== newItem.id) : [...state.likeItems, newItem];

            state.likeItems = likeData;
        },

        setLikeItem: (state, action) => {
            state.likeItems = action.payload;
        },

        reserveItem: (state, action) => {
            const newItem = action.payload;
            const item = _.find(state.reserveItems, o => o.id === newItem.id);
            
            if(item){
                item.quantity++;
            } else {
                state.reserveItems = [...state.reserveItems, newItem];
            }
        },

        removeReserveItem: (state, action) => {
            const id = action.payload;
            state.reserveItems = _.filter(state.reserveItems, o => o.id !== id);
        },

        setReserveItem: (state, action) => {
            state.reserveItems = action.payload;
        },

        setAuth: (state, action) => {
            state.userID = action.payload;
        },

        resetCart: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        }
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;