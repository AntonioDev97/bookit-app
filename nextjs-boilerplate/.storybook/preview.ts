import type { Preview } from "@storybook/react";
import "../app/globals.scss";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [],
  loaders: [
    async () => ({
      store: await import('../stories/redux/store'),
    })
  ]
};

export default preview;
