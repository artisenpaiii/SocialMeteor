import { z } from "zod";

export const PostSchema = z.object({
  author: z.string({
    required_error: "Author is required",
    invalid_type_error: "Author must be a string (user ID)",
  }),

  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(1, "Post content cannot be empty")
    .max(280, "Post content exceeds 280 characters"),

  created_At: z
    .preprocess((arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg), 
      z.date({
        required_error: "Created date is required",
        invalid_type_error: "Created date must be a valid Date object or ISO string",
      })
    ),

  imageUrl: z
    .string()
    .url("Image URL must be a valid URL")
    .optional(),

  gifUrl: z
    .string()
    .url("GIF URL must be a valid URL")
    .optional(),
});
