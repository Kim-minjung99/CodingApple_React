import { createSlice } from "@reduxjs/toolkit";


const user = createSlice({
    name : 'user',  
    initialState : {name : 'kim', age: 34},
    reducers : {
        changeName(state){
            state.name = 'park';
        },
        countUpAge(state, action){
            state.age = state.age + action.payload;
        }
    }
});

export default user;
export let { changeName, countUpAge } = user.actions;