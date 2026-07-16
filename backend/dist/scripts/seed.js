"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Starting seed process...');
    const results = [];
    const csvFilePath = 'C:\\Users\\HP\\Desktop\\gym\\megaGymDataset.csv';
    if (!fs_1.default.existsSync(csvFilePath)) {
        console.error(`CSV file not found at ${csvFilePath}`);
        process.exit(1);
    }
    fs_1.default.createReadStream(csvFilePath)
        .pipe((0, csv_parser_1.default)())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
        console.log(`Parsed ${results.length} exercises from CSV.`);
        // Take only first 500 for fast seeding during dev
        const limit = 500;
        const exercisesToInsert = results.slice(0, limit);
        for (const row of exercisesToInsert) {
            try {
                await prisma.exercise.create({
                    data: {
                        name: row.Title || 'Unknown Exercise',
                        instructions: row.Desc || null,
                        category: row.Type || null,
                        muscleGroup: row.BodyPart || null,
                        equipmentRequired: row.Equipment || null,
                        difficulty: row.Level || null,
                    },
                });
            }
            catch (err) {
                console.error(`Failed to insert ${row.Title}`, err);
            }
        }
        console.log(`Successfully seeded ${exercisesToInsert.length} exercises.`);
        await prisma.$disconnect();
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
