# React Modal Pop

An easy to use, ultra light and customizable modal package for React, letting you easily launch modal dialogs in your app!

Check out the [live demo](https://mesutrk95.github.io/react-modal-pop/) of the modal in action.

## Installation

You can install the package via **yarn** or **npm**:

```bash
yarn add react-modal-pop
```

or

```bash
npm install react-modal-pop
```

## Usage

### Step 1: Add the CSS

To use the styles provided by the package, import the CSS file in your index.ts (or `index.js`):

```typescript
import "react-modal-pop/dist/index.min.css";
```

### Step 2: Add the Modals Container

To enable modals, ensure you add the ModalContainer component to the app root. This is usually done in your main `index.tsx` file:

```jsx
import { ModalContainer } from 'react-modal-pop';

...

root.render(
  <React.StrictMode>
    <App />
    <ModalContainer /> // add this line to the application root
  </React.StrictMode>
);
```

### Step 3: Use the Modal in Your Components

Now you can easily trigger modals in your components using the `useModal` hook:

```jsx
import { useModal } from "react-modal-pop";

const MyModal1 = ({ close, name }: { close: any; name: string }) => {
  return (
    <div className="modal">
      <div className="modal-body">
        <h1>Hello {name}!</h1>
        <p>Welcome to the react-modal-pop example app.</p>
        <button onClick={() => close({ status: "ok" })}>Close</button>
      </div>
    </div>
  );
};

function App() {
  const { show } = useModal();

  const onShowClick = async () => {
    const modal = show(MyModal1, { name: "John" });
    const result = await modal.result()
    console.log('result', result)
  };

  return (
    <div>
      <button onClick={onShowClick}>Show Modal</button>
    </div>
  );
}

export default App;
```