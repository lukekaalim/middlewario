// @flow

export const middlewario = (wareConstructors) => (getState, dispatch) => {
  const wares = wareConstructors.map(wereConstructor => wereConstructor(getState, dispatch));

  return (next) => (action) => {
    wares.forEach(ware => ware(action));
    next(action);
  };
};

export const middlewaluigi = (wares) => (getState, dispatch) => next => dispatch => {
  wares.map(ware => ware(action, getState).then(action => action && dispatch(action)));
  next(action);
};