/*
import { createContext, useContext } from "react";
import todoStore from "./components/TodoStore";

const store = {
  todoStore: todoStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};

export default store;
