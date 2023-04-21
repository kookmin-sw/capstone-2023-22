import { useSelector } from "react-redux";
import { BookmarkInfo } from "../@types/BookmarkInfo";
import { RootReducer } from "../store";

export const useTotalBookmarkList = () => useSelector<RootReducer, BookmarkInfo[]>((state)=> state.bookmarkList.bookmarkList)