import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { table } from "@sanity/table";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Portfolio CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio", // Path where Studio will be available

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // About page singleton
            S.listItem()
              .title("About")
              .child(
                S.document()
                  .schemaType("about")
                  .documentId("about")
                  .title("About Page")
              ),
            // Divider
            S.divider(),
            // Other document types
            ...S.documentTypeListItems().filter(
              (listItem) => !["about"].includes(listItem.getId() as string)
            ),
          ]),
    }),
    visionTool(),
    codeInput(),
    table(),
  ],

  schema: {
    types: schemaTypes,
  },
});
