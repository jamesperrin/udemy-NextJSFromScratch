export { default } from 'next-auth/middleware';

// This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   return NextResponse.redirect(new URL('/home', request.url));
// }
export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};
