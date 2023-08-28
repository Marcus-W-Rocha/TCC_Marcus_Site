export {default} from 'next-auth/middleware'

export const config = {
    matcher: [
        '/menu/:path*',
        '/cadCliente/:path*',
        '/cadAdmin/:path*',
        '/consulta/:path*',
        '/editPerfil/:path*',
        '/editClient/:path*',
        '/relat/:path*',
        '/procPedido/:path*',
        '/cadAbate/:path*'
    ]
}