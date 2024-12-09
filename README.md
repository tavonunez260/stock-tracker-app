# Stock Tracker App

A simple React Native application to monitor a set of stocks, displaying their details, with features like sorting, filtering, smooth transitions, and basic unit tests.

---

## Features

- Displays a list of stocks with their name, current price, and daily percentage change.
- Supports filtering by stock name or symbol.
- Allows sorting by price or daily percentage change (ascending/descending).
- Includes a details screen for each stock.
- Smooth transitions between screens.
- Unit tests for core functionality and components.

---

## Setup and Run the Application

### Prerequisites

1. **Node.js**: Install Node.js (version 14 or higher recommended).
2. **Expo CLI**: Install Expo CLI globally:
   ```bash
   npm install -g expo-cli
   ```

### Installation

1. Clone the repository.
   ```bash
   git clone https://github.com/tavonunez260/stock-tracker-app.git
   cd stock-tracker-app
2. Install dependencies.
   ```bash
   npm install
3. Start the application.
   ```bash
   npm start

### Testing
Run unit tests
   ```bash
   npm test
   ```

## Trade-offs and Decisions
- **Offline Support:** Offline functionality with AsyncStorage was planned but excluded due to implementation issues. Data currently does not persist between app sessions.
- **Expo Framework:** Chosen for simplicity and rapid prototyping. While it limits access to native modules, it suits the project's requirements.
- **Custom Sorting and Filtering::** Sorting and filtering logic is implemented inline in the Home Screen for simplicity. This avoids over-complicating the app but could be refactored for scalability.
- **Animations:** Used built-in React Navigation animations for screen transitions. Advanced animations like shared element transitions were skipped to save time.
- **Unit Testing:** Focused on core functions (filtering, sorting) and navigation behavior. Tests for animations or transitions were not included due to their complexity.

## Implemented Requirements
### Core Requirements
- Displayed a list of stocks with basic styling.
- Displayed name, current price, and daily percentage change.
### Auxiliary Requirements
- Added sorting and filtering capabilities.
- Implemented a details screen.
- Added basic transitions (slide and fade) between screens.