# Reed Elsevier Test Automation

Playwright test suite covering UI and API testing for [Cheapflights AU](https://www.cheapflights.com.au) and the [Restful Booker API](https://restful-booker.herokuapp.com).

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm

### Steps

1. Clone the repository
```bash
git clone https://github.com/your-repo/reedelseviertest.git
cd reedelseviertest
```

2. Install dependencies
```bash
npm install
```

3. Install Playwright browsers
```bash
npx playwright install
```

---

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run UI tests only:
```bash
npx playwright test tests/UI
```

Run API tests only:
```bash
npx playwright test tests/API
```

Run a specific test file:
```bash
npx playwright test tests/UI/searchresults.spec.js
```

Run in headed mode (visible browser):
```bash
npx playwright test --headed
```

View HTML report after run:
```bash
npx playwright show-report
```

---

## Project Structure

```
├── pages/                  # Page Object Models
│   ├── base.page.js        # Base page with shared methods
│   ├── searchresults.page.js
│   └── resultspage.page.js
├── tests/
│   ├── UI/                 # UI test specs
│   │   ├── homepage.spec.js
│   │   ├── searchresults.spec.js
│   │   └── resultspage.spec.js
│   └── API/                # API test specs
│       ├── CREATE_POST.js
│       ├── GET.spec.js
│       ├── UPDATE_PUT.spec.js
│       ├── UPDATE_PATCH.spec.js
│       └── DELETE.spec.js
├── test-data/
│   ├── UI/                 # UI test data JSON
│   └── API/                # API test data JSON
└── playwright.config.js
```

---

## Test Cases

### UI - Homepage

| Test Case ID | Test Case | Assertion |
|---|---|---|
| TC-01 | Navigate to homepage successfully | Page title matches expected title |
| TC-02 | Verify logo is displayed | Logo link is visible |
| TC-03 | Verify login button is displayed | Login button is visible |
| TC-04 | Verify login button is clickable | Login button is enabled |

---

### UI - Search Results Page

| Test Case ID | Test Case | Assertion |
|---|---|---|
| TC-11 | Search for a one-way flight | Result items are visible and count is greater than 0 |
| TC-12 | Search for a return flight | Result items are visible and count is greater than 0 |
| TC-13 | Search for a multi-city flight | Result items are visible and count is greater than 0 |
| TC-14 | Search without a destination | Error message "Please enter a Destination airport." is visible |
| TC-15 | Search without a departure and return date | Error messages for departure and return date are visible |
| TC-16 | Search without an origin | Origin location field is focused |
| TC-17 | Search with same origin and destination | Error message for duplicate airports is visible |

---

### UI - Results Page

| Test Case ID | Test Case | Assertion |
|---|---|---|
| TC-05 | Verify search results are displayed | Result items are visible and count is greater than 0 |
| TC-06 | Verify flight details are displayed | Flight time, type, duration and airline logo are visible for both departure and return legs |
| TC-07 | Verify price section is displayed | Price, cabin class, provider name and View Deal button are visible |
| TC-08 | Verify results are sorted by cheapest | Each price in the list is less than or equal to the next |
| TC-09 | Verify flight details element position | Logo is left of time; time is left of flight type; flight type is left of duration; origin and destination are below the time row |
| TC-10 | Verify price section elements position | Price is above cabin class; cabin class is above provider name; provider name is above View Deal button |

---

### API - Restful Booker

#### Create Booking (POST /booking)

| Test Case ID | Test Case | Assertion |
|---|---|---|
| - | Create a new booking | Status 200, response body matches request payload |
| - | Create a booking with missing required fields | Status 500 |
| - | Create a booking with invalid date format | Status 500 |

#### Get Booking (GET /booking/:id)

| Test Case ID | Test Case | Assertion |
|---|---|---|
| - | Retrieve an existing booking | Status 200, response body matches created booking payload |
| - | Retrieve a non-existent booking | Status 404 |

#### Update Booking (PUT /booking/:id)

| Test Case ID | Test Case | Assertion |
|---|---|---|
| - | Update an existing booking | Status 200, response body matches updated payload |
| - | Update a booking without authorization | Status 403 |
| - | Update a non-existent booking | Status 405 |

#### Partial Update Booking (PATCH /booking/:id)

| Test Case ID | Test Case | Assertion |
|---|---|---|
| - | Partial update firstname and lastname only | Status 200, updated fields match, unchanged fields remain the same |
| - | Partial update totalprice only | Status 200, totalprice updated, other fields unchanged |
| - | Partial update without authorization | Status 403 |
| - | Partial update on non-existent booking | Status 405 |

#### Delete Booking (DELETE /booking/:id)

| Test Case ID | Test Case | Assertion |
|---|---|---|
| - | Delete a recently added booking | Status 201, follow-up GET returns 404 |
| - | Delete a booking without authorization | Status 403 |
| - | Delete a non-existent booking | Status 405 |

---

## Configuration

The base URLs are configured in `playwright.config.js`:

- **UI tests:** `https://www.cheapflights.com.au`
- **API tests:** `https://restful-booker.herokuapp.com`
