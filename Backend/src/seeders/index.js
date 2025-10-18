const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Compound } = require('../models/index.js');

(async () => {
    try {
        await Compound.truncate({ cascade: true });

        console.log('Existing data deleted from the Compound table.');

        const results = [];

        fs.createReadStream(path.join(__dirname, 'compound.csv'))
            .pipe(csv())
            .on('data', (data) => {
                results.push({
                    id: data.id,
                    name: data.CompoundName,
                    description: data.CompounrDescription,
                    image: data.strImageSource,
                    imageAttribution: data.strImageAttribution,
                    dateModified: data.dateModified || null,
                });
            })
            .on('end', async () => {
                try {
                    await Compound.bulkCreate(results);
                    console.log('Database reseeded successfully.');
                } catch (err) {
                    console.error('Error inserting seed data:', err);
                    throw err;
                }
            });

    } catch (error) {
        console.error('Error during database seeding:', error);
        throw error;
    }
})();