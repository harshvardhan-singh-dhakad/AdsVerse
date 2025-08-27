import "dotenv/config";
import { genkit, type Plugin } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import { firebase } from "@genkit-ai/firebase";

const plugins: Plugin<any>[] = [firebase(), googleAI()];

export const ai = genkit({
  plugins,
});
