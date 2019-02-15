# MiddleWario

A small middleware for **Redux**. Track side effects, persist unserializable data, do things that don't depend on your react tree. That kind of stuff.

## Usage

Build a 'ware that does a thing when you get an action. They can be `async` if you like. Nobody waits for them. Don't bother returning. Just deal with your side effects, and when they are done, trigger some more actions.

```javascript
const eatFood = (dispatch) => async (action) => {
  if (action.type === EAT_FOOD_ACTION) {
    await gulp();
    await burp();
    dispatch(foodEatenAction('Mmmm. Delicious.'))
  }
};
```

Now, add it to your middleware chain with middlewario.

```javascript
const warioware = middlewario([eatFood]);

const store = createStore(reducer, createMiddleware(warioware))
```

Bam. Done.

Model side effects as easily as you like.

## API

```javascript
(wareConstructors) => (getState, dispatch) => {
  const wares = wareConstructors
    .map(wereConstructor => wereConstructor(getState, dispatch));

  return (next) => (action) => {
    wares.forEach(ware => ware(action));
    next(action);
  };
};
```

Whoops that was the entire source. Oh well. It's not that complicated.

## Even Leaner!

Use `middlewaluigi` instead to make an even skinnier action! Only `async`, and can only return one action.

```javascript
const eatFood = async (action) => {
  if (action.type === EAT_FOOD_ACTION) {
    await gulp();
    await burp();
    return foodEatenAction('Mmmm. Delicious.');
  }
};
```

Seriously just look at the source code for a how-to-use.

## Advanced

### Neat central place to put your hydration logic.

```javascript
const hydrator = async (action, getState) => {
  switch (action.type) {
    case 'REQUESTED_HYDRATE':
      try {
        const hydratedState = await getStoredState();
        return { type: 'HYDRATE_SUCCEEDED', hydratedState }
      } catch (error) {
        return { type: 'HYDRATE_FAILED', errorMessage: error.message };
      }
    case 'REQUESTED_FREEZE':
      try {
        const frozenState = getState();
        await setStoredState(frozenState);
        return { type: 'FREEZE_SUCCEEDED' };
      } catch (error) {
        return { type: 'FREEZE_FAILED', errorMessage: error.message };
      }
    default: break;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'HYDRATE_SUCCESS':
      return action.hydratedState;
  }
};

const App = ({ hydrate, freeze }) => [
  <button onClick={hydrate}>Hydrate State</button>,
  <button onClick={freeze}>Freeze State</button>,
];

const mapDispatchToProps = dispatch => {
  hydrate: () => dispatch({ type: 'REQUESTED_HYDRATE' }),
  freeze: () => dispatch({ type: 'REQUESTED_FREEZE' }),
};

const ConnectedApp = connect(null, mapDispatchToProps)(App);
```
