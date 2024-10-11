# Unified Response

A package that provides a consistent response structure for backend APIs, allowing for easy handling of API responses across your application.

## Features

- Unified response format for all API calls.
- Flexible to include additional custom fields.
- Automatically includes a timestamp for logging and tracking.
- Supports both successful and error responses.

## Import

```typescript
import { createResponse } from 'https://your-package-url/unified-response.ts';
```

## Use

```typescript
// Basic
const response = createResponse(
  true,
  { user: 'John Doe' },
  'Request was successful',
  200
);

// Output
console.log(response);
```

```typescript
// Example with CustomResponseFields

interface CustomResponseFields {
  customField1: string;
  customField2: number;
  customField3: boolean;
}

// Creating a response with custom fields
const responseWithCustomFields = createResponse<CustomResponseFields>(
  true,
  { user: 'Jane Doe' },
  'Request was successful',
  200,
  null,
  null,
  {
    customField1: 'Custom Data 1',
    customField2: 42,
    customField3: true,
  }
);

// Output
console.log(responseWithCustomFields);
```

## Response Structure

```typescript
interface Response<T = Record<string, unknown>> {
  success: boolean;
  data: object | null;
  message: string;
  statusCode: number;
  error: object | null;
  metadata: object | null;
  timestamp: string;
  extraFields?: T; // Generic type for extra fields
}
```
