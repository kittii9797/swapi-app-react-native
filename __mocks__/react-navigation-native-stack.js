export const createNativeStackNavigator = jest.fn().mockReturnValue({
    Navigator: jest.fn(({ children }) => children),
    Screen: jest.fn(({ children }) => children),
});
  