import PropTypes from "prop-types";
import { createContext, useContext, useMemo, useReducer } from "react";
import { CharacterTypes } from "../constants";

// Create MaterialUI context
const MaterialUIContext = createContext();
MaterialUIContext.displayName = "MaterialUIContext";

const INITIAL_STATE = {
  maxPasswordLength: 14,
  passwordCharacter: CharacterTypes,
};

// Reducer for context state updates
const ACTION_TYPES = {
  SET_MAX_PASSWORD_LENGTH: "SET_MAX_PASSWORD_LENGTH",
  SELECT_PASSWORD_CHARACTERS: "SELECT_PASSWORD_CHARACTERS",
};

// Reducer for context state updates
function materialUIReducer(state, { type, value }) {
  switch (type) {
    case ACTION_TYPES.SET_MAX_PASSWORD_LENGTH:
      return { ...state, maxPasswordLength: value };
    case ACTION_TYPES.SELECT_PASSWORD_CHARACTERS:
      return { ...state, passwordCharacter: value };
    default:
      return state;
  }
}
// Context provider
function MaterialUIProvider({ children }) {
  const [state, dispatch] = useReducer(materialUIReducer, INITIAL_STATE);

  const value = useMemo(() => [state, dispatch], [state, dispatch]);

  return <MaterialUIContext.Provider value={value}>{children}</MaterialUIContext.Provider>;
}

// Custom hook for accessing context values
function useMaterialUIProvider() {
  const context = useContext(MaterialUIContext);

  if (!context) {
    throw new Error("useMaterialUIController must be used within the MaterialUIControllerProvider.");
  }

  return context;
}

// PropTypes for MaterialUIControllerProvider
MaterialUIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Dispatch actions
const updateMaxPasswordLength = (dispatch, value) => dispatch({ type: ACTION_TYPES.SET_MAX_PASSWORD_LENGTH, value });
const selectPasswordCharacter = (dispatch, value) => dispatch({ type: ACTION_TYPES.SELECT_PASSWORD_CHARACTERS, value });

export { MaterialUIProvider, useMaterialUIProvider, updateMaxPasswordLength, selectPasswordCharacter };
