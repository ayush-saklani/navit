# A simple qr-code scanner for react

This is a simple qr-code scanner component for react. Check out a simple demo [here](https://mitchellston.github.io/qr-code-scanner/)!

## Installing

A step by step series guide to setup this component.

### Start a react project

- For Vite react JavaScript starter template, run the following command:

```
npm create vite@latest my-qr-code-scanner-application -- --template react
```

- For Vite react TypeScript starter template, use the command:

```
npm create vite@latest my-qr-code-scanner-application -- --template react-ts
```

### Install the package with npm

```
npm i react-simple-qr-code-scanner
```

## Demos

### Basic

The code snippet below demonstrates the basic usage of the QR code scanner component:

```tsx
import { QrCodeScanner } from "react-simple-qr-code-scanner";
function App() {
  return (
    <QrCodeScanner
      onResult={(result, rawResult) => {
        console.log(result);
      }}
      Errors={(error) => {
        console.log(error);
      }},
      facingMode={"environment"} // Or "user"
    />
  );
}
```

### Custom styling

The code snippet below demonstrates how to customize the styling of the QR code scanner component:

```tsx
import { QrCodeScanner } from "react-simple-qr-code-scanner";

const App = () => (
  <div style={{ width: "50vw" }}>
    <QrCodeScanner
      onResult={(result) => {
        console.log(result);
      }}
    >
      {(videoElement) => (
        <div
          style={{
            borderColor: "rgb(147 197 253)",
            borderWidth: "4px",
            width: "100%",
          }}
        >
          <video ref={videoElement} style={{ width: "100%", height: "100%" }} />
        </div>
      )}
    </QrCodeScanner>
  </div>
);
```

### Validating qr code data

Currently, the component only supports Zod as a validator (or custom validators) for QR code data. See the example below:

```tsx
import { QrCodeScanner } from "react-simple-qr-code-scanner";
import { ZodQrCodeDataValidator } from "react-simple-qr-code-scanner/validators";
import { z } from "zod";
const QrCodeData = z.object({
  foo: z.string(),
  bar: z.number().min(500, "bar must be greater than 500"),
});
function App() {
  return (
    <>
      <QrCodeScanner
        validate={(data) => ZodQrCodeDataValidator(data, QrCodeData)}
        onResult={(result) => {
          console.log(result); // Result will be of the type {foo: string; bar: number;}
        }}
        onError={(error) => {
          console.log(error); // Displays an error message if 'bar' is less than 500
        }}
      />
    </>
  );
}
```

### Validating qr code data with custom validation

In this example, custom validation is performed on the QR code data:

```tsx
import { QrCodeScanner } from "react-simple-qr-code-scanner";
type QrCodeData = {
  foo: string;
  bar: number;
};
function App() {
  return (
    <>
      <QrCodeScanner
        validate={(data) => {
          if (!data || data == null || typeof data != "object")
            throw new Error("data is required");
          if (
            !Object.prototype.hasOwnProperty.call(data, "foo") ||
            !("foo" in data) ||
            data.foo == null ||
            typeof data.foo != "string"
          )
            throw new Error("foo is required");
          if (
            !Object.prototype.hasOwnProperty.call(data, "bar") ||
            !("bar" in data) ||
            data.bar == null ||
            typeof data.bar != "number"
          )
            throw new Error("bar is required");
          return { foo: data.foo, bar: data.bar };
        }}
        onResult={(result) => {
          console.log(result); // Result will be of type QrCodeData due to the validation defined in the 'validate' property
        }}
        onError={(errorScan) => {
          console.log(errorScan.message); // Log the validation error messages
        }}
      />
    </>
  );
}
```

## Updating to version 2.0.0 (or higher)

Starting from version 2.0.0, the onResult function now takes two parameters. The rawResult parameter represents the original result.

### Examples

Before 2.0.0:

```tsx
import { QrCodeScanner } from "react-simple-qr-code-scanner";
function App() {
  return (
    <QrCodeScanner
      onResult={(result) => {
        console.log(result.getText());
      }}
    />
  );
}
```

Since Version 2.0.0:

```tsx
import { QrCodeScanner } from "react-simple-qr-code-scanner";
function App() {
  return (
    <QrCodeScanner
      onResult={(result, raw) => {
        console.log(result); // Returns the text, parsing and validating it if necessary.
        console.log(raw.getText()); //
      }}
    />
  );
}
```

## License

This project is licensed under the [MIT License](LICENSE) License. See the [LICENSE](LICENSE) file for more details.
