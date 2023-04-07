import mongoose from 'mongoose';

const dbURI = process.env.DB_URI || '';

mongoose
  .connect(dbURI)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected to mongoDB');
  })
  // eslint-disable-next-line no-console
  .catch((error) => console.log(error));

const db = mongoose.connection;

export default db;
