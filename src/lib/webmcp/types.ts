/**
 * WebMCP (Web Model Context Protocol) Type Definitions
 * Experimental W3C Proposed Standard for Web-based Agent Tool Registration
 */

export interface JSONSchemaProperty {
  type: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object';
  description?: string;
  enum?: string[];
  items?: JSONSchemaProperty;
}

export interface JSONSchema {
  type: 'object';
  properties: Record<string, JSONSchemaProperty>;
  required?: string[];
}

export interface WebMCPTool<TInput = Record<string, any>, TOutput = any> {
  name: string;
  description: string;
  inputSchema: JSONSchema;
  execute: (args: TInput) => Promise<TOutput> | TOutput;
}

export interface ModelContextAPI {
  registerTool?: (tool: WebMCPTool) => void;
  provideTool?: (tool: WebMCPTool) => void;
  addTool?: (tool: WebMCPTool) => void;
  [key: string]: any;
}
