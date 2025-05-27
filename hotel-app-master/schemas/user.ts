import { defineField } from 'sanity';

// Se define el esquema 'user', que representará a un usuario en el sistema.
const user = {
    name: 'user',
    title: 'user',
    type: 'document',
    fields: [
        // Campo que indica si el usuario es administrador (true/false).
        defineField({
            name: 'isAdmin',
            title: 'Is Admin',
            type: 'boolean',
            description: 'Check if the user is admin',
            initialValue: false,
            validation: Rule => Rule.required(),
            //   readOnly: true,
            //   hidden: true,
        }),
        // Campo para almacenar el nombre del usuario
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Name of the user',
            readOnly: true,
            validation: Rule => Rule.required(),
        }),
        // Campo para la URL de la imagen del usuario
        defineField({
            name: 'image',
            title: 'Image',
            type: 'url',
        }),
        // Campo para la contraseña del usuario (oculta en el Studio)
        defineField({
            name: 'password',
            type: 'string',
            hidden: true,
        }),
        // Campo para almacenar el email del usuario
        defineField({
            name: 'email',
            type: 'string',
            title: 'Email',
        }),
        // Campo para almacenar la fecha de verificación del email
        defineField({
            name: 'emailVerified',
            type: 'datetime',
            hidden: true,
        }),
        // Campo tipo texto para que el usuario escriba una breve descripción sobre sí mismo
        defineField({
            name: 'about',
            title: 'About',
            type: 'text',
            description: 'A brief dsecription about the user',
        }),
    ],
};

export default user;