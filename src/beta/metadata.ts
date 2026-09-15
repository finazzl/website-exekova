import path from 'node:path';
import data from './content/page.json';
import { buildMetadata, schemaForPage } from '@/lib/seo';
import { taskFaq } from './data/offer';

const page = { ...data, sourceFile: path.join(process.cwd(), 'src/beta/content/page.json') };
export const betaMetadata = buildMetadata(page);
export const betaSchema = () => schemaForPage(page, taskFaq);
