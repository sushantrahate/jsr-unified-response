/**
 * @module UnifiedResponse
 *
 * UnifiedResponse is a Deno module that provides a consistent and extensible response structure
 * for backend APIs. It simplifies the handling of API responses by ensuring a uniform format
 * across different endpoints, making it easier to manage and extend as your application grows.
 *
 * ## Features
 * - **Unified Structure**: Ensures all API responses follow a consistent format.
 * - **Extensibility**: Allows adding custom fields to the response for additional data.
 * - **Timestamp**: Automatically includes a timestamp for logging and tracking purposes.
 * - **Type Safety**: Utilizes TypeScript generics to maintain type safety while allowing flexibility.
 *
 * ## Example Usage
 *
 * ### Without Custom Fields
 *
 * ```typescript
 * import { createResponse } from "@sushantrahate/unified-response";
 *
 * const response = createResponse(
 *   true,
 *   { user: 'John Doe' },
 *   'Request was successful',
 *   200
 * );
 *
 * console.log(response);
 * /*
 * {
 *   success: true,
 *   statusCode: 200,
 *   message: 'Request was successful',
 *   data: { user: 'John Doe' },
 *   error: null,
 *   metadata: null,
 *   timestamp: '2024-04-27T12:34:56.789Z',
 *   extraFields: {}
 * }
 * *\/
 * ```
 *
 * ### With Custom Fields
 *
 * ```typescript
 * import { createResponse } from "@sushantrahate/unified-response";
 *
 * interface CustomFields {
 *   userId: number;
 *   role: string;
 * }
 *
 * const responseWithCustomFields = createResponse<CustomFields>(
 *   true,
 *   { user: 'Jane Doe' },
 *   'Request was successful',
 *   200,
 *   null,
 *   null,
 *   { userId: 123, role: 'admin' }
 * );
 *
 * console.log(responseWithCustomFields);
 * /*
 * {
 *   success: true,
 *   statusCode: 200,
 *   message: 'Request was successful',
 *   data: { user: 'Jane Doe' },
 *   error: null,
 *   metadata: null,
 *   timestamp: '2024-04-27T12:34:56.789Z',
 *   extraFields: { userId: 123, role: 'admin' }
 * }
 * *\/
 * ```
 */

/**
 * The `Response` interface defines the structure of the unified response object.
 *
 * @template T - The type of the additional custom fields.
 */
export interface Response<T = Record<string, unknown>> {
  /** Indicates if the request was successful */
  success: boolean;

  /** The HTTP status code */
  statusCode: number;

  /** A message describing the result */
  message: string;

  /** The data returned by the API */
  data?: object | null;

  /** Any error information if the request failed */
  error?: object | null;

  /** Additional metadata related to the response */
  metadata?: object | null;

  /** ISO timestamp of when the response was created */
  timestamp: string;

  /** Optional additional custom fields */
  extraFields?: T;
}

/**
 * Creates a unified response object for API responses.
 *
 * @template T - The type of the additional custom fields.
 *
 * @param success - Indicates if the request was successful.
 * @param statusCode - The HTTP status code.
 * @param message - A message describing the result.
 * @param data - The data returned by the API.
 * @param error - Any error information if the request failed.
 * @param metadata - Additional metadata related to the response.
 * @param extraFields - Any additional custom fields to include in the response.
 *
 * @returns A `Response` object containing all the provided information.
 */
export const createResponse = <T = Record<string, unknown>>(
  success: boolean,
  statusCode: number = success ? 200 : 400,
  message: string = success ? 'Request was successful' : 'An error occurred',
  data: object | null = null,
  error: object | null = null,
  metadata: object | null = null,
  extraFields: T = {} as T
): Response<T> => {
  const response: Response<T> = {
    success,
    statusCode,
    message,
    timestamp: new Date().toISOString(),
  };

  if (data !== null && data !== undefined) response.data = data;
  if (error) response.error = error;
  if (metadata) response.metadata = metadata;
  if (extraFields && Object.keys(extraFields).length > 0)
    response.extraFields = extraFields;

  return response;
};
