import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
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
      name: "summary",
      title: "Summary",
      type: "text",
      description: "Brief summary of the product (up to 1000 characters)",
      rows: 6,
      validation: (Rule) => Rule.required().max(1000),
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
      description: "Full product description with rich text",
    }),
    defineField({
      name: "image",
      title: "Product Image",
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
      name: "url_link",
      title: "Product URL",
      type: "url",
      description: "Link to the live product or web project",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "article_link",
      title: "Related Article",
      type: "reference",
      to: [{ type: "blogPost" }, { type: "project" }],
      description: "Optional link to a related article (blog post or project) in your portfolio",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      hasArticle: "article_link",
    },
    prepare(selection) {
      const { title, hasArticle } = selection;
      return {
        ...selection,
        subtitle: hasArticle ? "With linked article" : "Product",
      };
    },
  },
});
