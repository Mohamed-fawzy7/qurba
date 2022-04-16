import mongoose from 'mongoose';

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
};
const mongoConnectionString = process.env.MONGO_CONNECTION_STRING as string;

function connectDB() {
  mongoose.connect(mongoConnectionString, mongoConfig);

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error(err);
  });
  db.once('open', () => {
    console.log('connected to db successfully');
  });
}

connectDB();
