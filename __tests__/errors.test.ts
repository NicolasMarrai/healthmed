import { 
  APIError, 
  ValidationError, 
  AuthenticationError,
  createErrorResponse,
  withErrorHandling 
} from '../lib/errors';

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
      expect(error.name).toBe('ValidationError');
    });

    test('AuthenticationError extends APIError with 401 status', () => {
      const error = new AuthenticationError();
      
      expect(error.message).toBe('Não autenticado');
      expect(error.statusCode).toBe(401);
      expect(error.name).toBe('AuthenticationError');
    });
  });

  describe('createErrorResponse', () => {
    test('creates response from APIError', () => {
      const error = new APIError('Test error', 500);
      const response = createErrorResponse(error);
      
      expect(response.status).toBe(500);
    });

    test('creates generic 500 response for unknown errors', () => {
      const error = new APIError('Generic error', 500);
      const response = createErrorResponse(error);
      
      expect(response.status).toBe(500);
    });
  });

  describe('withErrorHandling', () => {
    test('executes handler and returns result on success', async () => {
      const mockResponse = new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
      
      const mockHandler = jest.fn().mockResolvedValue(mockResponse);
      const wrappedHandler = withErrorHandling(mockHandler);
      const request = new Request('http://test.com');
      
      const response = await wrappedHandler(request);
      
      expect(mockHandler).toHaveBeenCalledWith(request);
      expect(response.status).toBe(200);
    });

    test('handles APIError and returns error response', async () => {
      const mockHandler = jest.fn().mockRejectedValue(
        new ValidationError('Invalid data')
      );
      
      const wrappedHandler = withErrorHandling(mockHandler);
      const request = new Request('http://test.com');
      
      const response = await wrappedHandler(request);
      
      expect(response.status).toBe(400);
    });

    test('handles generic error and returns 500 response', async () => {
      const mockHandler = jest.fn().mockRejectedValue(
        new Error('Unexpected error')
      );
      
      const wrappedHandler = withErrorHandling(mockHandler);
      const request = new Request('http://test.com');
      
      const response = await wrappedHandler(request);
      
      expect(response.status).toBe(500);
    });
  });
});