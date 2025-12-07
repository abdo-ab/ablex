import { route } from 'ziggy-js';

/**
 * A collection of type-safe route helpers.
 *
 * @example
 * import { dashboard, register, logout } from '@/routes';
 * <a href={dashboard()}>Go to dashboard</a>
 */

export const dashboard = () => route('dashboard');
export const login = () => route('login');
export const logout = () => route('logout');
export const register = () => route('register');
