import { z } from 'zod';

export const AppearanceSchema = z.object({
  'eye-color': z.string(),
  gender: z.string(),
  'hair-color': z.string(),
  height: z.array(z.string()),
  race: z.string(),
  weight: z.array(z.string()),
});

export const BiographySchema = z.object({
  aliases: z.array(z.string()),
  alignment: z.string(),
  'alter-egos': z.string(),
  'first-appearance': z.string(),
  'full-name': z.string(),
  'place-of-birth': z.string(),
  publisher: z.string(),
});

export const ConnectionsSchema = z.object({
  'group-affiliation': z.string(),
  relatives: z.string(),
});

export const ImageSchema = z.object({
  url: z.string(),
});

export const PowerstatsSchema = z.object({
  combat: z.string(),
  durability: z.string(),
  intelligence: z.string(),
  power: z.string(),
  speed: z.string(),
  strength: z.string(),
});

export const WorkSchema = z.object({
  base: z.string(),
  occupation: z.string(),
});

export const SuperheroSchema = z.object({
  appearance: AppearanceSchema,
  biography: BiographySchema,
  connections: ConnectionsSchema,
  id: z.string(),
  image: ImageSchema,
  name: z.string(),
  powerstats: PowerstatsSchema,
  work: WorkSchema,
});

export const SuperheroApiResponseSchema = SuperheroSchema.extend({
  response: z.string(),
});

export const SearchResponseSchema = z.union([
  z.object({
    response: z.literal('success'),
    'results-for': z.string(),
    results: z.array(SuperheroSchema),
  }),
  z.object({
    response: z.literal('error'),
    error: z.string(),
  }),
]);

export type Superhero = z.infer<typeof SuperheroSchema>;
export type SuperheroApiResponse = z.infer<typeof SuperheroApiResponseSchema>;
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
export type Appearance = z.infer<typeof AppearanceSchema>;
export type Biography = z.infer<typeof BiographySchema>;
export type Connections = z.infer<typeof ConnectionsSchema>;
export type Image = z.infer<typeof ImageSchema>;
export type Powerstats = z.infer<typeof PowerstatsSchema>;
export type Work = z.infer<typeof WorkSchema>;
