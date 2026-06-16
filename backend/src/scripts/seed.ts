import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process...');
  const results: any[] = [];

  const csvFilePath = path.join(__dirname, '../../../../megaGymDataset.csv');
  
  if (!fs.existsSync(csvFilePath)) {
    console.error(`CSV file not found at ${csvFilePath}`);
    process.exit(1);
  }

  fs.createReadStream(csvFilePath)
    .pipe(csv())
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
        } catch (err) {
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
