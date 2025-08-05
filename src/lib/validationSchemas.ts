import { z } from "zod";

// ======================
// Enums
// ======================

export const MediaTypeEnum = z.enum(["ANIME", "MOVIE", "TV_SHOW"]);
export const ContentStatusEnum = z.enum(["UPCOMING", "ONGOING", "COMPLETED"]);

// ======================
// User
// ======================

export const UserSchema: z.ZodType<any> = z.object({
  
  email: z.string().email(),
  password: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  


});

// ======================
// Subscription Plan
// ======================

export const SubscriptionPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  price: z.number(),
  duration: z.number(),
  features: z.array(z.string()),

  subscriptions: z.array(z.lazy(() => SubscriptionSchema)).optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

// ======================
// Subscription
// ======================

export const SubscriptionSchema: z.ZodType<any> = z.object({
  id: z.string(),
  userId: z.string(),
  planId: z.string(),
  status: z.string(),
  startDate: z.date(),
  endDate: z.date().nullable().optional(),

  user: z.lazy(() => UserSchema).optional(),
  plan: z.lazy(() => SubscriptionPlanSchema).optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

// ======================
// Advertisement
// ======================

export const AdvertisementSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  userId: z.string(),
  thumbnailUrl: z.string().nullable().optional(),

  user: z.lazy(() => UserSchema).optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

// ======================
// Episode
// ======================

export const EpisodeSchema = z.object({

  title: z.string(),
  description: z.string().nullable().optional(),
  videoUrl: z.string().nullable().optional(),
  mediaContentId: z.string(),
  likeCount: z.number(),
  dislikeCount: z.number(),
  isPublished: z.boolean(),

  mediaContent: z.lazy(() => MediaContentSchema).optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

// ======================
// Media Content
// ======================

export const MediaContentSchema= z.object({

  title: z.string(),
  description: z.string().nullable().optional(),
  category: z.array(z.string()),
  releaseDate: z.date().nullable().optional(),
  genres: z.array(z.string()),
  country: z.string().nullable().optional(),
  thumbnailUrl: z.string().nullable().optional(),
  videoUrl: z.string().nullable().optional(),
  isPublished: z.boolean(),
  views: z.number(),
  type: MediaTypeEnum,
  status: ContentStatusEnum,
  
  createdAt: z.date(),
  updatedAt: z.date(),
});
