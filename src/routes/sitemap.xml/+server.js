// /src/routes/sitemap.xml/+server.js
import * as sitemap from 'super-sitemap';
import { categories } from '$lib/categories';

export const GET = async () => {
  return await sitemap.response({
    origin: 'https://randomobject.site',
    paramValues: {
        '/categories/[category]': categories.map(category => category.id),
    },
  });
};
