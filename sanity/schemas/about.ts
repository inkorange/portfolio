import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
      description: "Your biography in rich text format",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
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
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
      description: "List your skills and expertise",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              title: "Platform",
              options: {
                list: [
                  { title: "GitHub", value: "github" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Twitter", value: "twitter" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Dribbble", value: "dribbble" },
                  { title: "Behance", value: "behance" },
                  { title: "Email", value: "email" },
                  { title: "Website", value: "website" },
                  { title: "Other", value: "other" },
                ],
              },
            },
            {
              name: "url",
              type: "url",
              title: "URL",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              platform: "platform",
              url: "url",
            },
            prepare({ platform, url }) {
              return {
                title: platform || "Link",
                subtitle: url,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page Content",
      };
    },
  },
});
