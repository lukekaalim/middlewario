import { middlewario } from '../src';

describe('middlewario', () => {
  it('should exec each \'ware when used', () => {
    const testWare = jest.fn();
    const testWareConstructor = jest.fn(() => testWare);

    const mockNextAction = { type: 'NEXT_ACTION' };
    const mockNext = jest.fn(() => mockNextAction);
    const warioware = middlewario([testWareConstructor]);
    const connectedWare = warioware({ getState: 'mockGetState', dispatch: 'mockDispatch' })(mockNext);

    expect(testWareConstructor.mock.calls[0]).toContain('mockGetState');
    expect(testWareConstructor.mock.calls[0]).toContain('mockDispatch');

    const action = { type: 'EXAMPLE_ACTION' };
    const returnedAction = connectedWare(action);

    expect(returnedAction).toEqual(mockNextAction);
    expect(mockNext.mock.calls[0]).toEqual([action]);
    expect(testWare.mock.calls[0]).toEqual([action]);
  });
});