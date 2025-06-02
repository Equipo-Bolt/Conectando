// * using type here because we have a discriminate union, it basically allows the | operator to enable two or more posibles types

export type ServerActionResponse = 
  | { success: true; message: string }
  | { success: false; error: string };