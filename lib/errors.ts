// Classe para erros customizados da API
export class APIError extends Error {
  public statusCode: number;
  public code?: string;

  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class ValidationError extends APIError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export class AuthenticationError extends APIError {
  constructor(message: string = 'Não autorizado') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

export class NotFoundError extends APIError {
  constructor(message: string = 'Recurso não encontrado') {
    super(message, 404, 'NOT_FOUND_ERROR');
  }
}

export class RateLimitError extends APIError {
  constructor(message: string = 'Muitas tentativas. Tente novamente mais tarde.') {
    super(message, 429, 'RATE_LIMIT_ERROR');
  }
}

export class PaymentError extends APIError {
  constructor(message: string) {
    super(message, 422, 'PAYMENT_ERROR');
  }
}

// Função para lidar com erros da API
export function handleAPIError(error: unknown): APIError {
  if (error instanceof APIError) {
    return error;
  }
  
  if (error instanceof Error) {
    // Mapear erros específicos do Supabase
    if (error.message.includes('JWT')) {
      return new AuthenticationError('Token de acesso inválido');
    }
    
    if (error.message.includes('duplicate key')) {
      return new ValidationError('Este recurso já existe');
    }
    
    if (error.message.includes('foreign key')) {
      return new ValidationError('Referência inválida');
    }
    
    // Erro genérico
    return new APIError(error.message, 500, 'INTERNAL_ERROR');
  }
  
  // Erro desconhecido
  return new APIError('Erro interno do servidor', 500, 'UNKNOWN_ERROR');
}

// Middleware para tratamento de erros
export function withErrorHandling<T extends any[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await handler(...args);
    } catch (error) {
      const apiError = handleAPIError(error);
      
      // Log do erro (em produção, usar serviço de logging)
      console.error('API Error:', {
        message: apiError.message,
        statusCode: apiError.statusCode,
        code: apiError.code,
        stack: process.env.NODE_ENV === 'development' ? apiError.stack : undefined,
        timestamp: new Date().toISOString(),
      });
      
      throw apiError;
    }
  };
}

// Função para criar respostas de erro consistentes
export function createErrorResponse(error: APIError) {
  const response = {
    error: {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    },
    success: false,
    timestamp: new Date().toISOString(),
  };

  // Em desenvolvimento, incluir stack trace
  if (process.env.NODE_ENV === 'development') {
    (response.error as any).stack = error.stack;
  }

  return Response.json(response, { 
    status: error.statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}