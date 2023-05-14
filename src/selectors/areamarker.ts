import { useSelector } from "react-redux";
import { AreaMarkerInfo } from "../@types/AreaMarkerInfo";
import { RootReducer } from "../store";

export const useTotalAreaMarkerList = () => useSelector<RootReducer, AreaMarkerInfo[]>((state)=> state.areaMarker.areaMarkerList)
