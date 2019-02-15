// @flow

export const middlewario = (wareConstructors) => ({ getState, dispatch }) => {
  const wares = wareConstructors.map(wereConstructor => wereConstructor(dispatch, getState));

  return (next) => (action) => {
    wares.forEach(ware => ware(action));
    return next(action);
  };
};

export const middlewaluigi = (wares) => ({ getState, dispatch }) => next => action => {
  wares.map(ware => ware(action, getState).then(action => action && dispatch(action)));
  return next(action);
};