import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
   const session = req.cookies.get('auth-session');
   if (session) {
      req.headers.set('Authorization', `Bearer ${session}`);
   }
   return NextResponse.next();
}
