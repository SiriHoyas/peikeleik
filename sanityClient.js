// sanity.js
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "iakgoej6",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2024-16-08", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

export default sanityClient;
