import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const applications = sqliteTable("applications", {
 businessType: text("business_type"),
 id: text("id").primaryKey(), website:text("website").notNull(), problem:text("problem").notNull(), aiUsage:text("ai_usage").notNull(), phone:text("phone").notNull(), consentVersion:text("consent_version").notNull(), createdAt:integer("created_at").notNull(),
}, table=>[index("idx_applications_phone_created").on(table.phone,table.createdAt),index("idx_applications_created").on(table.createdAt)]);
