import { useSelector } from "react-redux";
import { AreaCafeInfo } from "../@types/AreaCafeInfo";
import { RootReducer } from "../store";

export const useTotalAreaCafeList = () => useSelector<RootReducer, AreaCafeInfo[]>((state)=> state.areaCafe.areaCafeList)
