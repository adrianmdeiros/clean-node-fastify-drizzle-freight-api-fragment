import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    out: './src/app/infra/orm/drizzle/migrations',
    schema: './src/app/infra/orm/drizzle/schema.ts',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DB_FILE_NAME!
    }
})