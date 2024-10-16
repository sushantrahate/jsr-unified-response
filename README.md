# Unified Response

A package that provides a consistent response structure for backend APIs, allowing for easy handling of API responses across your application.

## Features

- Unified response format for all API calls.
- Flexible to include additional custom fields.
- Automatically includes a timestamp for logging and tracking.
- Supports both successful and error responses.

## Install

[@sushantrahate/unified-response](https://jsr.io/@sushantrahate/unified-response)

```bash
# Deno >= 2.x.x
deno add jsr:@sushantrahate/unified-response

# Node.js with ESM
npx jsr add @sushantrahate/unified-response

# Bun
bunx jsr add @sushantrahate/unified-response

# Yarn
yarn dlx jsr add @sushantrahate/unified-response

# pnpm
pnpm dlx jsr add @nshiab/simple-data-analysis
```

## Import

```typescript
import { createResponse } from '@sushantrahate/unified-response';
```

## Use

```typescript
// Basic
const response = createResponse(true, 200, 'Request was successful', {
  user: 'John Doe',
});

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
  200,
  'Request was successful',
  { user: 'Jane Doe' },
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

If you liked it then please show your love by ⭐ the repo
