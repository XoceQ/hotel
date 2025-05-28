import axios from 'axios';
import sanityClient from '../schemas/sanity';
import * as queries from '../schemas/sanityQueries';
import {
  getFeaturedRoom,
  getRooms,
  getRoom,
  createBooking,
} from '../services/api';    // ← ruta real hasta tu módulo API

describe('API Sanity y Booking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getFeaturedRoom debe llamar a sanityClient.fetch sin cache', async () => {
    const fakeRoom = { _id: 'r1', name: 'A' };
    (sanityClient.fetch as jest.Mock).mockResolvedValue(fakeRoom);

    const result = await getFeaturedRoom();
    expect(sanityClient.fetch).toHaveBeenCalledWith(
      queries.getFeaturedRoomQuery,
      {},
      { cache: 'no-cache' }
    );
    expect(result).toBe(fakeRoom);
  });

  it('getRooms debe llamar a sanityClient.fetch y devolver array', async () => {
    const fakeRooms = [{ _id: 'r1' }, { _id: 'r2' }];
    (sanityClient.fetch as jest.Mock).mockResolvedValue(fakeRooms);

    const result = await getRooms();
    expect(sanityClient.fetch).toHaveBeenCalledWith(
      queries.getRoomsQuery,
      {},
      { cache: 'no-cache' }
    );
    expect(result).toBe(fakeRooms);
  });

  it('getRoom debe pasar el slug correctamente', async () => {
    const fake = { _id: 'r1' };
    (sanityClient.fetch as jest.Mock).mockResolvedValue(fake);

    const slug = 'deluxe';
    const result = await getRoom(slug);
    expect(sanityClient.fetch).toHaveBeenCalledWith(
      queries.getRoom,
      { slug },
      { cache: 'no-cache' }
    );
    expect(result).toBe(fake);
  });

  it('createBooking debe construir la mutación y llamar a axios.post', async () => {
    const bookingDto = {
      user: 'u1',
      hotelRoom: 'r1',
      checkinDate: '2025-01-01',
      checkoutDate: '2025-01-05',
      numberOfDays: 4,
      adults: 2,
      children: 1,
      totalPrice: 500,
      discount: 50,
    };

    const fakeResponse = { data: { transactionId: 'tx123' } };
    (axios.post as jest.Mock).mockResolvedValue(fakeResponse);

    const data = await createBooking(bookingDto);

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
    const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET!;
    const expectedUrl = `https://${projectId}.api.sanity.io/v2021-10-21/data/mutate/${dataset}`;

    expect(axios.post).toHaveBeenCalledWith(
      expectedUrl,
      { mutations: [ expect.objectContaining({ create: expect.any(Object) }) ] },
      { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
    );
    expect(data).toEqual(fakeResponse.data);
  });
});
