import "dotenv/config";
import { genkit, type Plugin } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import { firebase } from "@genkit-ai/firebase";

const firebaseConfigured: Plugin<any> | undefined = process.env
  .GCLOUD_PROJECT
  ? firebase()
  : undefined;

const plugins: Plugin<any>[] = [googleAI()];
if (firebaseConfigured) {
  plugins.push(firebaseConfigured);
}

export const ai = genkit({
  plugins,
  logLevel: "debug",
  enableTracingAndMetrics: true,
});
