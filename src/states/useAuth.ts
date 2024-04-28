import { create } from "zustand"
import { AuthStateType } from "./states.types"

const useAuth = create<AuthStateType>((set) => ({
    isAuth: false,
    setIsAuth: (isAuth) => set((state) => ({ isAuth })),
}))

export default useAuth
