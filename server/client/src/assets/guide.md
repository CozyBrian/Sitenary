# Getting Started

Start by installing the Sitenary npm package by running in your project directory
```bash
npm install sitenary
```
or if you're using yarn:
```bash
yarn add sitenary
```

After installing the package, head over to your website entry point. We will use index.tsx in our example.
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Sitenary from "sitenary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (process.env.NODE_ENV !== "development") {
  new Sitenary("YOUR_SITE_ID_HERE");
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
Replace YOUR_SITE_ID_HERE with your site id. You can find your site id in the Sitenary dashboard.
Now you can deploy your site and start tracking your website's trafic.