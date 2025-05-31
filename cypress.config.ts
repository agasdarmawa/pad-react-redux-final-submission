import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // baseUrl: 'https://pad-react-redux-final-submission-79.vercel.app',
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      on,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      config
    ) {
      // implement node event listeners here
    },
    video: false,
  },
});
