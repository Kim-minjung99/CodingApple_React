import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './userSlice';

// useState와 비슷한 hook
// state하나를 slice라고 부른다
// createSlice({
//     name: "state이름 작명~~~",
//     initialState : 'state값"
// })


const cart = createSlice({
    name : "cart",
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        countUp(state, action) {
            let countState = state.findIndex((a)=>{ return a.id === action.payload });
            state[countState].count++;
            console.log("count", state[countState].count);
        },
        // 장바구니에 아이템 추가
        addCartItem(state, action){
            console.log("reducerState", state);
            const copyState = [...state, ...action.payload];
            state = copyState;
        } 
    }
})

export let {countUp, addCartItem} = cart.actions;

export default configureStore({
    reducer: { 
        // 여기에 state를등록하여 사용하여야 한다.
        user : user.reducer, // state의 이름, 명패
        cart : cart.reducer, // state의 이름, 명패
    }
}) 