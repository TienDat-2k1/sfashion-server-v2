import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    nodeEnv: process.env.NODE_ENV || 'developer',
    port: parseInt(process.env.PORT, 10) || 3000,
  };
});
