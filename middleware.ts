export { default } from 'next-auth/middleware';

// TODO: extend to redirect to dashboard if user is logged in
export const config = { matcher: ['/dashboard/:path*'] };
