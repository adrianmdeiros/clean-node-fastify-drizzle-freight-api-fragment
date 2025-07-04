import { relations } from "drizzle-orm";
import { numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const clients = sqliteTable('clients', {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    address: text().notNull(),
    phone: text().notNull().unique()
});

export const clientsRelations = relations(clients, ({ many }) => ({
    freights: many(freights)
}))

export const cities = sqliteTable('cities', {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    uf: text().notNull(),
    tax: numeric({ mode: 'number' }).notNull().default(0)
})

export const citiesRelations = relations(cities, ({ many }) => ({
    freights: many(freights)
}))

export const freights = sqliteTable('freights', {
    id: text().primaryKey().notNull(),
    description: text().notNull(),
    weight: numeric({ mode: 'number' }).notNull(),
    value: numeric({ mode: 'number' }).notNull(),
    clientId: text().notNull().references(() => clients.id),
    cityId: text().notNull().references(() => cities.id)
})

export const freightsRelations = relations(freights, ({ one }) => ({
    client: one(clients, {
        fields: [freights.clientId],
        references: [clients.id]
    }),
    city: one(cities, {
        fields: [freights.cityId],
        references: [cities.id]
    })
}))
