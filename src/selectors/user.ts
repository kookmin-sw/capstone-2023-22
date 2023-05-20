import { useSelector } from "react-redux";
import { UserInfo } from "../@types/UserInfo";
import { RootReducer } from "../store";

export const useMyInfo = () => useSelector<RootReducer, UserInfo | null>((state)=> state.userInfo.userInfo);