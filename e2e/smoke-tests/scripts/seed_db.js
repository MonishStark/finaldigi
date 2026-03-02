/** @format */

const dotenv = require("dotenv");
const path = require("path");

// Load env from parent directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.DATABASE_PASSWORD) {
	throw new Error("❌ DATABASE_PASSWORD environment variable is required.");
}
const knex = require("knex")({
	client: "mysql",
	connection: {
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		user: process.env.DATABASE_USER_NAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		charset: "utf8mb4",
		collation: "utf8mb4_unicode_ci",
	},
});

async function seed() {
	try {
		console.log("Seeding database (corrected order)...");

		// Users to insert (matching testData.ts)
		const users = [
			{
				id: 1000,
				firstname: "Admin",
				lastname: "One",
				email: "admin1@test.com",
				mobileCountryCode: "+1",
				mobileNumber: "1234567890",
				password: "Test@1234",
				role: 1,
				companyId: 100,
			},
			{
				id: 1001,
				firstname: "Admin",
				lastname: "Two",
				email: "admin2@test.com",
				mobileCountryCode: "+1",
				mobileNumber: "1234567891",
				password: "Test@1234",
				role: 1,
				companyId: 101,
			},
			{
				id: 1002,
				firstname: "Super",
				lastname: "Admin",
				email: "superadmin@test.com",
				mobileCountryCode: "+1",
				mobileNumber: "1234567892",
				password: "Test@1234",
				role: 4,
				companyId: 100,
			},
		];

		let bcrypt;
		try {
			bcrypt = require("bcryptjs");
		} catch (e) {
			console.error(
				"❌ bcryptjs module is required for secure password hashing. Please install bcryptjs.",
			);
			process.exit(1);
		}

		const seedPassword = process.env.TEST_USER_PASSWORD || "Test@1234";
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(seedPassword, saltRounds);
		const dateTime = new Date();

		// 1. Insert Users
		for (const user of users) {
			const exists = await knex("users").where({ email: user.email }).first();
			if (!exists) {
				console.log(`Inserting user ${user.email}`);
				await knex("users").insert({
					id: user.id,
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email,
					mobileCountryCode: user.mobileCountryCode,
					mobileNumber: user.mobileNumber,
					password: hashedPassword,
					accountStatus: 1,
					token: "dummy_token",
					token_issued: dateTime,
					created: dateTime,
					updated: dateTime,
				});
			} else {
				console.log(`User ${user.email} exists, ensure updated.`);
				await knex("users").where({ email: user.email }).update({
					password: hashedPassword,
					accountStatus: 1,
				});
			}
		}

		console.log("Seeding companies...");
		// 2. Insert Companies
		const companies = [
			{
				id: 100,
				adminId: 1000,
				company_name: "Company One",
				company_phone: "1234567890",
				company_phone_country_code: "+1",
				company_type: "1",
			},
			{
				id: 101,
				adminId: 1001,
				company_name: "Company Two",
				company_phone: "1234567890",
				company_phone_country_code: "+1",
				company_type: "1",
			},
		];

		for (const comp of companies) {
			const exists = await knex("companies").where({ id: comp.id }).first();
			if (!exists) {
				await knex("companies").insert({
					id: comp.id,
					adminId: comp.adminId,
					company_name: comp.company_name,
					company_phone: comp.company_phone,
					company_phone_country_code: comp.company_phone_country_code,
					company_type: comp.company_type,
					created: dateTime,
					updated: dateTime,
				});
			}
		}

		// 3. Insert Relationships
		for (const user of users) {
			if (user.companyId) {
				const relExists = await knex("user_company_role_relationship")
					.where({ userId: user.id, company: user.companyId })
					.first();
				if (!relExists) {
					console.log(
						`Linking user ${user.id} to company ${user.companyId} with role ${user.role}`,
					);
					await knex("user_company_role_relationship").insert({
						userId: user.id,
						company: user.companyId,
						role: user.role,
						createdAt: dateTime,
						updatedAt: dateTime,
					});
				} else {
					await knex("user_company_role_relationship")
						.where({ userId: user.id, company: user.companyId })
						.update({
							role: user.role,
							updatedAt: dateTime,
						});
				}
			}
		}

		console.log("Seeding complete.");
		process.exit(0);
	} catch (error) {
		console.error("Seeding failed:", error);
		process.exit(1);
	}
}

seed();
