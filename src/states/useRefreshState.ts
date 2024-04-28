import { create } from "zustand";
import { RefreshStateType } from "./states.types";

const useRefreshState = create<RefreshStateType>((set) => ({
  refreshState: false,
  setRefreshState: (refreshState: boolean) =>
    set((state) => ({ refreshState })),
}));

export default useRefreshState;
