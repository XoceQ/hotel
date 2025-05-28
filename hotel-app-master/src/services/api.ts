import axios from 'axios';
import sanityClient from '../schemas/sanity';
import * as queries from '../schemas/sanityQueries';
import { CreateBookingDto, Room } from '@/models/room';

/**
 * Obtiene la habitación destacada desde Sanity
 */
export async function getFeaturedRoom(): Promise<Room> {
  const result = await sanityClient.fetch(
    queries.getFeaturedRoomQuery,
    {},
    { cache: 'no-cache' }
  );
  return result as Room;
}

/**
 * Obtiene todas las habitaciones desde Sanity
 */
export async function getRooms(): Promise<Room[]> {
  const result = await sanityClient.fetch(
    queries.getRoomsQuery,
    {},
    { cache: 'no-cache' }
  );
  return result as Room[];
}

/**
 * Obtiene una habitación por slug desde Sanity
 * @param slug - Identificador único de la habitación
 */
export async function getRoom(slug: string): Promise<Room> {
  const result = await sanityClient.fetch(
    queries.getRoom,
    { slug },
    { cache: 'no-cache' }
  );
  return result as Room;
}

/**
 * Crea una nueva reserva en Sanity
 * @param data - Datos de la reserva
 */
export async function createBooking(
  data: CreateBookingDto
): Promise<any> {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'booking',
          user: { _type: 'reference', _ref: data.user },
          hotelRoom: { _type: 'reference', _ref: data.hotelRoom },
          checkinDate: data.checkinDate,
          checkoutDate: data.checkoutDate,
          numberOfDays: data.numberOfDays,
          adults: data.adults,
          children: data.children,
          totalPrice: data.totalPrice,
          discount: data.discount,
        },
      },
    ],
  };

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
  const url = `https://${projectId}.api.sanity.io/v2021-10-21/data/mutate/${dataset}`;

  const response = await axios.post(url, mutation, {
    headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` },
  });

  return response.data;
}