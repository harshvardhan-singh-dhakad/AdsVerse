import "dotenv/config";
import { genkit, type Plugin } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

const plugins: Plugin<any>[] = [googleAI()];

export const ai = genkit({
  plugins,
});
