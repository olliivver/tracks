import { createContext, useEffect } from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const ContextPage = createContext();

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: -73.599382,
    latitude: 45.52886,
    zoom: 14,
  });

  useEffect(() => {
    //useContext
    if (currentUser) {
      setViewState({
        ...viewState,
        latitude: currentUser.latitude,
        longitude: currentUser.longitude,
      });
    }
  }, [currentUser]);

  return (
    <ContextPage.Provider
      value={{
        currentUser,
        setCurrentUser,
        viewState,
        setViewState,
      }}
    >
      {children}
    </ContextPage.Provider>
  );
};
