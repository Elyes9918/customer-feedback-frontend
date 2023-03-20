import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { ApiStatus } from "../types/ApiStatus";
import {  getUserByEmailApi, getUserByIdApi, getUserListApi, unAssignFeedbackApi, unAssignProjectApi, unAssignRoleApi, updateUserApi } from "../services/UserService";
import { IUser } from "../../src/types/User";


const list : IUser[] = [];
const user : IUser = {};

const initialState = {
    list,
    listStatus: ApiStatus.ideal,
    LoginUserFormStatus:ApiStatus.ideal,
    user
}

export const getUserListAction = createAsyncThunk(
    "user/getUserListAction",
    async () => {
       const response = await getUserListApi();
       return response.data;
    }
);

export const UpdateUserAction = createAsyncThunk(
    "user/UpdateUserAction",
    async (data:IUser) => {
       const response = await updateUserApi(data);
       return response.data;
    }
);

export const GetUserByIdAction = createAsyncThunk(
    "user/GetUserByIdAction",
    async (id:number) => {
       const response = await getUserByIdApi(id);
       return response.data;
    }
);

export const getUserByEmailAction = createAsyncThunk(
    "user/getUserByEmailAction",
    async (email:string) => {
       const response = await getUserByEmailApi(email);
       const currentUser = JSON.stringify(response.data);
       localStorage.setItem("currentUser",currentUser);
       return response.data;
    }
);

export const unAssignRoleAction = createAsyncThunk(
    "user/unAssignRoleAction",
    async (data:IUser) => {
       const response = await unAssignRoleApi(data);
       return response.data;
    }
);

export const unAssignProjectAction = createAsyncThunk(
    "user/unAssignProjectAction",
    async (data:IUser) => {
       const response = await unAssignProjectApi(data);
       return response.data;
    }
);

export const unAssignFeedbackAction = createAsyncThunk("user/unAssignFeedbackAction", async (data : IUser) => {
    const response = await unAssignFeedbackApi(data);
    return response.data;
});





const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

    },
    extraReducers: (builder) =>{

    //  GetUserList Action
    builder.addCase(getUserListAction.pending,(state)=>{
        state.listStatus = ApiStatus.loading
    });

    builder.addCase(getUserListAction.fulfilled,(state,action)=>{
        state.listStatus=ApiStatus.ideal;
        state.list=action.payload;
    });

    builder.addCase(getUserListAction.rejected, (state) => {
        state.listStatus = ApiStatus.error;
      });

    // GetUserById Action 
    builder.addCase(GetUserByIdAction.pending,(state)=>{
        state.listStatus = ApiStatus.loading
    });

    builder.addCase(GetUserByIdAction.fulfilled,(state,action)=>{
        state.listStatus=ApiStatus.ideal;
        state.user=action.payload;
    });

    builder.addCase(GetUserByIdAction.rejected, (state) => {
        state.listStatus = ApiStatus.error;
      });


    //  GetUserByEmail Action
    builder.addCase(getUserByEmailAction.pending,(state)=>{
        state.listStatus = ApiStatus.loading
    });

    builder.addCase(getUserByEmailAction.fulfilled,(state,action)=>{
        state.listStatus=ApiStatus.ideal;
        state.user=action.payload;
    });

    builder.addCase(getUserByEmailAction.rejected, (state) => {
        state.listStatus = ApiStatus.error;
      });


    
    }
})

export default userSlice.reducer