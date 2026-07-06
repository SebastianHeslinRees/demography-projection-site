import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(307, resolve('/report'));
}
