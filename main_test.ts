import { createResponse } from './mod.ts';
import { assertEquals } from '@std/assert';

interface CustomResponseFields {
  customField1: string;
  customField2: number;
  customField3: boolean;
  customField4?: string; // Optional field
}

Deno.test('createResponse should return the correct structure', () => {
  const response = createResponse(
    true,
    { user: 'John Doe' },
    'Request was successful',
    200
  );

  // Assertions
  assertEquals(response.success, true);
  assertEquals(response.data, { user: 'John Doe' });
  assertEquals(response.statusCode, 200);
});

// Test the createResponse function with extra fields
Deno.test(
  'createResponse should return the correct structure with multiple fields',
  () => {
    const response = createResponse<CustomResponseFields>(
      true,
      { user: 'John Doe' },
      'Success',
      200,
      null,
      null,
      {
        customField1: 'Custom Data 1',
        customField2: 42,
        customField3: true,
        customField4: 'Optional Data',
      }
    );

    // Assertions
    assertEquals(response.success, true);
    assertEquals(response.data, { user: 'John Doe' });
    assertEquals(response.message, 'Success');
    assertEquals(response.statusCode, 200);
    assertEquals(response.extraFields?.customField1, 'Custom Data 1');
    assertEquals(response.extraFields?.customField2, 42);
    assertEquals(response.extraFields?.customField3, true);
    assertEquals(response.extraFields?.customField4, 'Optional Data');
  }
);
