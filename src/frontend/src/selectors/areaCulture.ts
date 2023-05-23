import { useSelector } from "react-redux";
import { AreaCultureInfo } from "../@types/AreaCultureInfo";
import { RootReducer } from "../store";

export const useTotalAreaCultureList = () => useSelector<RootReducer, AreaCultureInfo[]>((state)=> state.areaCulture.areaCultureList)
