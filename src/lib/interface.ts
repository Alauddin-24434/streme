// Enums
export enum ReactionType {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
}

export enum MediaType {
  MOVIE = "MOVIE",
  SERIES = "SERIES",
  DOCUMENTARY = "DOCUMENTARY",
  SHORTFILM = "SHORTFILM",
}

// Interfaces

export interface IUser {
  id: string;
  email: string;
  password: string;
  name?: string | null;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  Subscription?: ISubscription[];
  Advertisement?: IAdvertisement[];
  reactions?: IReaction[];
}

export interface ISubscriptionPlan {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  duration: number;
  features: string[];
  subscriptions?: ISubscription[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubscription {
  id: string;
  userId: string;
  planId: string;
  status: string;
  startDate: Date;
  endDate?: Date | null;
  user?: IUser;
  plan?: ISubscriptionPlan;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdvertisement {
  id: string;
  title: string;
  description: string;
  price: number;
  userId: string;
  thumbnailUrl?: string | null;
  user?: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMediaContent {
  id: string;
  title: string;
  description?: string | null;
  category: string[];
  cast: string[];
  releaseDate?: Date | null;
  genres: string[];
  rating?: number | null;
  language?: string | null;
  director?: string | null;
  production?: string | null;
  country?: string | null;
  ageLimit?: string | null;
  thumbnailUrl?: string | null;
  trailerUrl?: string | null;
  isPublished: boolean;
  views: number;
  type: MediaType;
  likeCount: number;
  dislikeCount: number;
  episodes?: IEpisode[];
  reactions?: IReaction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IEpisode {
  id: number;
  title: string;
  description?: string | null;
  mediaContentId: string;
  likeCount: number;
  dislikeCount: number;
  mediaContent?: IMediaContent;
  reactions?: IReaction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IReaction {
  id: string;
  userId: string;
  type: ReactionType;
  mediaContentId?: string | null;
  episodeId?: number | null;
  mediaContent?: IMediaContent | null;
  episode?: IEpisode | null;
  createdAt: Date;
  User?: IUser;
}
