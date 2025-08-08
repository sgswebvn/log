import createMiddleware from 'next-intl/middleware'

// Đảm bảo middleware bắt mọi URL (trừ _next, api, asset tĩnh)
export default createMiddleware({
  locales: ['en', 'vi'],
  defaultLocale: 'vi'
})

export const config = {
  matcher: [
    // loại trừ các file tĩnh và API
    '/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)'
  ]
}
