import React, { FC } from "react";
import { useStoreZustandVit} from "./useStoreZustandVit";


export const UpdatePlaceId = (newId: number) => {
  const currentState = useStoreZustandVit.getState();
  
  //const { setUpdate } = useStoreZustandVit();
  // !!! ИСПРАВЛЕНИЕ ОШИБКИ !!!
  // Получаем функцию обновления состояния через getState()
  const setUpdate = useStoreZustandVit.getState().setUpdate;
  
  const updatedSession = {
    ...currentState.userSession,
    place_id: newId
  };

  useStoreZustandVit.getState().setUserSession(updatedSession);
  setUpdate ();
};
