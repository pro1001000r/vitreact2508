import React, { FC } from "react";
import { useStoreZustandVit } from "./useStoreZustandVit";


export const UpdatePlaceId = (newId: number) => {
  const currentState = useStoreZustandVit.getState();
  
  const updatedSession = {
    ...currentState.userSession,
    place_id: newId
  };

  useStoreZustandVit.getState().setUserSession(updatedSession);
};
