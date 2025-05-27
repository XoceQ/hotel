import {defineField} from "sanity";

const account = {
    // 'name' es el identificador interno del documento (clave del esquema)
    name: "account",
    // 'title' es el nombre legible que aparecerá en el estudio de Sanity (interfaz del editor)
    title: "Account",
    // 'type' indica que este esquema es de tipo 'document', lo que significa que se puede almacenar como una entrada en la base de datos.
    type: "document",
    fields: [
        defineField({
          name: 'providerType',
            type: 'string',

        }),
        defineField({
            name: 'providerId',
            type: 'string',

        }),
        defineField({
            name: 'providerAccountId',// ID único proporcionado por el proveedor de autenticación
            type: 'string',

        }),
        defineField({
            name: 'refreshToken',// token para renovar el accessToken sin volver a iniciar sesión
            type: 'string',

        }),
        defineField({
            name: 'accessToken',// token para autenticar al usuario en el proveedor
            type: 'string',

        }),
        defineField({
            name: 'accessTokenExpires', // fecha de expiración del token (como timestamp numérico)
            type: 'number',

        }),
        // Relación entre este documento y el documento de usuario (tipo "user").
        // Indica que este campo es una referencia a otro documento.
        defineField({
            name: 'user',
            title: "user",
            type: "reference",
            to: {type: 'user'},
        }),
    ],
}; export default account