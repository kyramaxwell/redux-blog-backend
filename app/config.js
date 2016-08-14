import dotenv from 'dotenv';
dotenv.config({ silent: true });
export default {
  api_secret: process.env.API_SECRET,
};
