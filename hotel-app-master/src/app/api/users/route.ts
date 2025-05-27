// app/api/users/route.ts
import { groq } from 'next-sanity';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sanityClient from '@/libs/sanity';

export async function GET() {
  try {
    const query = groq`*[_type == "user"]{
      _id,
      name,
      email,
      image,
      isAdmin,
      about
    }`;

    const users = await sanityClient.fetch(query);

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse('Failed to fetch users', { status: 500 });
  }
}
  export async function POST(req: Request) {
  try {
    const users = await req.json();

    if (!Array.isArray(users)) {
      return new NextResponse('Invalid payload format', { status: 400 });
    }

    const results = [];

    for (const user of users) {
      if (!user.email) continue;

      const hashedPassword = await bcrypt.hash('default123', 10); // Puedes cambiar 'default123'

      const newUser = {
        _type: 'user',
        name: user.name || 'Unnamed User',
        email: user.email,
        password: hashedPassword,
        image: user.image || '',
        isAdmin: user.isAdmin ?? false,
        about: user.about || '',
      };

      const result = await sanityClient.create(newUser);
      results.push(result);
    }

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

  export async function PUT(req: Request) {
  try {
    const user = await req.json();

    if (!user._id) {
      return new NextResponse('Missing user _id', { status: 400 });
    }

    // Campos a actualizar (solo los que existan)
    const updatedFields: Record<string, any> = {};
    if (user.name !== undefined) updatedFields.name = user.name;
    if (user.email !== undefined) updatedFields.email = user.email;
    if (user.image !== undefined) updatedFields.image = user.image;
    if (user.isAdmin !== undefined) updatedFields.isAdmin = user.isAdmin;
    if (user.about !== undefined) updatedFields.about = user.about;

    if (user.password) {
      updatedFields.password = await bcrypt.hash(user.password, 10);
    }

    const updatedUser = await sanityClient.patch(user._id).set(updatedFields).commit();

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const { _id } = await req.json();

    if (!_id) {
      return new NextResponse('Missing user _id', { status: 400 });
    }

    await sanityClient.delete(_id);

    return new NextResponse(`User with id ${_id} deleted successfully`, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

