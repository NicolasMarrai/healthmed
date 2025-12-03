import { 
  APIError, 
  ValidationError, 
  AuthenticationError
} from '../lib/errors';

// Mock global Response for testing
global.Response = {
  json: (data: any, init?: any) => ({
    status: init?.status || 200,
    headers: init?.headers || {},
    data
  })
} as any;

// Mock global Request for testing
global.Request = class {
  constructor(public url: string, public init?: any) {}
} as any;

describe('Error Handling Utilities', () => {
  describe('APIError classes', () => {
    test('APIError creates correct error', () => {
      const error = new APIError('Test message', 500);
      
      expect(error.message).toBe('Test message');
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe('APIError');
    });

    test('ValidationError extends APIError with 400 status', () => {
      const error = new ValidationError('Invalid input');
      
      expect(error.message).toBe('Invalid input');
      expect(error.statusCode).toBe(400);
      // Note: ValidationError extends APIError, so name will be APIError
      expect(error instanceof APIError).toBe(true);
    });

    test('AuthenticationError extends APIError with 401 status', () => {
      const error = new AuthenticationError();
      
      expect(error.statusCode).toBe(401);
      expect(error instanceof APIError).toBe(true);
    });
  });
});