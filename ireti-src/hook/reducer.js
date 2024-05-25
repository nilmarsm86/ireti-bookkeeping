import { useEffect, useRef } from "react";

/**
 * State y dispath global
 * @param {Object} combinedReducers
 * @param {Array} middlewareBefore
 * @param {Array} middlewareAfter
 * @returns
 */
export const useCombinedReducers = (
  combinedReducers,
  middlewareBefore = [],
  middlewareAfter = []
) => {
  // Global State
  const state = Object.keys(combinedReducers).reduce(
    (acc, cur) => ({ ...acc, [cur]: combinedReducers[cur][0] }),
    {}
  );

  // Global Dispatch Function
  const dispatch = (action) =>
    Object.keys(combinedReducers)
      .map((key) => combinedReducers[key][1])
      .forEach((fn) => fn(action));

  const actionReference = useRef(null);

  //middlewares
  const dispatchWithMiddleware = (action) => {
    middlewareBefore.forEach((middleware) => middleware(action)); //antes
    //obtener la referencia a la accion
    actionReference.current = action;
    dispatch(action);
  };

  useEffect(() => {
    //si no hay action no se hace nada
    if (actionReference.current === null) {
      return;
    }

    middlewareAfter.forEach((middleware) =>
      middleware(actionReference.current)
    ); //despues

    actionReference.current = null;
  }, [middlewareAfter]);

  return [state, dispatchWithMiddleware];
};
