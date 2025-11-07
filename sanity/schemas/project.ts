import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Project Type",
      type: "string",
      options: {
        list: [
          { title: "Technology", value: "UI" },
          { title: "Traditional Art", value: "Art" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      description: "Brief summary for homepage and listing pages",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "Author of this project",
      initialValue: "Chris West",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "keywords",
      title: "SEO Keywords",
      type: "text",
      description: "Comma-separated keywords for SEO (e.g., web development, react, typescript)",
      rows: 2,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
        {
          type: "table",
          title: "Table",
        },
      ],
      description: "Full project description with rich text",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      description: "Tech stack (for UI projects)",
      options: {
        layout: "tags",
      },
      hidden: ({ document }) => document?.type !== "UI",
    }),
    defineField({
      name: "publishedDate",
      title: "Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show this project prominently on the homepage",
      initialValue: false,
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "url",
      description: "Link to live project or external page",
    }),
    defineField({
      name: "githubLink",
      title: "GitHub Link",
      type: "url",
      description: "Link to GitHub repository (for UI projects)",
      hidden: ({ document }) => document?.type !== "UI",
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      media: "featuredImage",
      featured: "featured",
    },
    prepare(selection) {
      const { title, type, featured } = selection;
      return {
        ...selection,
        subtitle: `${type}${featured ? " • Featured" : ""}`,
      };
    },
  },
});
