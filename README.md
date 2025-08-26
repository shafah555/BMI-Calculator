# BMI Calculator

A simple, single-file web app that calculates BMI from height in feet/inches and weight in pounds.

## Run

Open `index.html` directly in your browser, or serve the folder with any static server.

### Quick static server (Node)

```bash
npx serve .
```

Then visit the printed URL.

## Usage

- Height formats supported: `5' 8"`, `5 8`, `5ft 8in`, or total inches like `68`.
- Weight formats supported: `150`, `150 lbs`, `150lb`.

BMI is computed with `703 * weight(lb) / height(in)^2` and rounded to one decimal place. 