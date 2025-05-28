// src/tests/room.test.ts
import { CreateBookingDtoSchema, RoomSchema } from '../schemas/schemas';

describe('Room Type Validation', () => {
  it('should validate a valid Room object', () => {
    const mockRoom = {
      _id: "room123",
      coverImage: { url: "https://example.com/cover.jpg" },
      description: "Beautiful room",
      dimension: "30x40",
      discount: 10,
      images: [
        { _key: "img1", url: "https://example.com/img1.jpg" }
      ],
      isBooked: false,
      isFeatured: true,
      name: "Deluxe Suite",
      numberOfBeds: 2,
      offeredAmenities: [
        { _key: "a1", amenity: "WiFi", icon: "wifi-icon" }
      ],
      price: 120,
      slug: { _type: "slug", current: "deluxe-suite" },
      specialNote: "Non-refundable",
      type: "suite"
    };

    expect(() => RoomSchema.parse(mockRoom)).not.toThrow();
  });

  it('should throw error for invalid Room object', () => {
    const invalidRoom = {
      _id: "room123",
      // missing coverImage
    };

    expect(() => RoomSchema.parse(invalidRoom)).toThrow();
  });
});

describe('CreateBookingDto Validation', () => {
  it('should validate a valid booking DTO', () => {
    const mockBooking = {
      user: "user123",
      hotelRoom: "room123",
      checkinDate: "2025-06-01",
      checkoutDate: "2025-06-05",
      numberOfDays: 4,
      adults: 2,
      children: 1,
      totalPrice: 400,
      discount: 20,
    };

    expect(() => CreateBookingDtoSchema.parse(mockBooking)).not.toThrow();
  });
});
