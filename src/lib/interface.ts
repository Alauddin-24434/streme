export enum MediaType {
  ANIME = "ANIME",
  MOVIE = "MOVIE",
  TV_SHOW = "TV_SHOW",
}

export enum ConetentStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
}



export interface IUser {
  id: string;
  email: string;
  password?: string | null;
  name?: string | null;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  Subscription?: ISubscription[];
  Advertisement?: IAdvertisement[];
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
  genres: string[];
  country?: string | null;
  thumbnailUrl?: string | null;
  videoUrl?: string | null;
  isPublished: boolean;
  views: number;
  type: MediaType;
  status: ConetentStatus;
  episodes?: IEpisode[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IEpisode {
  id: number;
  title: string;
  description?: string | null;
  videoUrl?: string | null;
  mediaContentId: string;

  likeCount: number;
  dislikeCount: number;
  isPublished: boolean;

  mediaContent?: IMediaContent;

  createdAt: Date;
  updatedAt: Date;
}
