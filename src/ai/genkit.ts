import "dotenv/config";
import { genkit, type Plugin } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import { firebase } from "@genkit-ai/firebase";

const plugins: Plugin<any>[] = [googleAI()];

// Conditionally add Firebase plugin if the GCLOUD_PROJECT is set.
// This is often the case in a deployed Firebase environment.
if (process.env.GCLOUD_PROJECT) {
  plugins.push(firebase());
}

export const ai = genkit({
  plugins,
});
