// import React, { FC } from "react";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { IUserSession } from "../inrefaces";

interface IContextVit {
  userSession: IUserSession;
  setUserSession: (i: IUserSession) => void;
}

const FVit: StateCreator<IContextVit, [["zustand/persist", unknown]], []> = (
  set
) => ({
  userSession: {
    id: undefined,
    name: "",
    status: "U",
    active: false,
    storage_id: undefined,
    place_id: undefined,
  },
  setUserSession: (userSession) => set(() => ({ userSession })),
});

const useStoreZustandVit = create<IContextVit, [["zustand/persist", unknown]]>(
  persist(FVit, { name: "userSession" })
);

//Селекторы
export const useUserSession = () =>
  useStoreZustandVit((state) => state.userSession);
export const useSetUserSession = (i: IUserSession) =>
  useStoreZustandVit.getState().setUserSession(i);
