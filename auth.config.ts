import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
	providers: [],
	pages: {
		signIn: '/login',
	},
	callbacks: {
		authorized(t) {
			const isLoggedIn = !!t.auth?.user;
			console.log('isLoggedIn', t.auth?.user, isLoggedIn);
			const isOnDashboard = t.request.nextUrl.pathname.startsWith('/dashboard');
			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				Response.redirect(new URL('/dashboard', t.request.nextUrl));
			}
			return true;
		},
	},
} satisfies NextAuthConfig;
