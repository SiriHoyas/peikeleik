import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "a3zxf562",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-08-16",
});

export default sanityClient;
