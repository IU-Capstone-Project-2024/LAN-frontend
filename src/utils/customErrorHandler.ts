type ConsoleError = (...args: any[]) => void;

const originalConsoleError: ConsoleError = console.error;

const isNextRouterError = (error: any): boolean => {

  return error && error.name === 'NextRouterError';
};

console.error = function (...args: any[]) {
  if (args[0] == null) {
    console.log("Error argument is null or undefined:", args);
  } else if (isNextRouterError(args[0])) {
    console.log("This is a NextRouterError:", args[0]);
  } else {
    originalConsoleError.apply(console, args);
  }
};
