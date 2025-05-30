import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      on,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      config
    ) {
      // implement node event listeners here
    },
  },
});
