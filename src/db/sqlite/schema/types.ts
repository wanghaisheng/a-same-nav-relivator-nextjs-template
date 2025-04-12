import { categories } from './categories';
import { features } from './features';
import { items } from './items';
import { products } from './products';
import { testimonials } from './testimonials';
import { users } from './users';

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Feature = typeof features.$inferSelect;
export type NewFeature = typeof features.$inferInsert;

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert; 