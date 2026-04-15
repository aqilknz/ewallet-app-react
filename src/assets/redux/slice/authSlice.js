import { createSlice} from "@reduxjs/toolkit";
const initialState = {
    users: [],
    currentUser: null,
    isLogin: false
}

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registerUser: (state, action) => {
            state.users.push(action.payload)
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLogin = true
        },
        logout: (state) => {
            // state.userAccount = null
            state.currentUser = null;
            state.isLogin= false
        }
    }
})

export const {registerUser, loginSuccess, logout} = authSlice.actions
export default authSlice.reducer