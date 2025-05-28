import { z } from "zod";

export const CoverImageSchema = z.object({
  url: z.string().url(),
});

export const ImageSchema = z.object({
  _key: z.string(),
  url: z.string().url(),
});

export const AmenitySchema = z.object({
  _key: z.string(),
  amenity: z.string(),
  icon: z.string(),
});

export const SlugSchema = z.object({
  _type: z.string(),
  current: z.string(),
});

export const RoomSchema = z.object({
  _id: z.string(),
  coverImage: CoverImageSchema,
  description: z.string(),
  dimension: z.string(),
  discount: z.number(),
  images: z.array(ImageSchema),
  isBooked: z.boolean(),
  isFeatured: z.boolean(),
  name: z.string(),
  numberOfBeds: z.number(),
  offeredAmenities: z.array(AmenitySchema),
  price: z.number(),
  slug: SlugSchema,
  specialNote: z.string(),
  type: z.string(),
});

export const CreateBookingDtoSchema = z.object({
  user: z.string(),
  hotelRoom: z.string(),
  checkinDate: z.string(),
  checkoutDate: z.string(),
  numberOfDays: z.number(),
  adults: z.number(),
  children: z.number(),
  totalPrice: z.number(),
  discount: z.number(),
});
