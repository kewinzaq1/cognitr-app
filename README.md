# Cognitr - Your Source for Top Articles

## Features

- **Authentication:** Secure login with validation.
- **Articles Feed:** Scrollable FlatList for easy access to the latest articles.
- **Logout Functionality:** Convenient logout through a modal.

## Implementation

I've used a powerful tech stack and testing tools:

- **React:** The core library for building user interfaces.
- **React Native with Expo:** Accelerates native mobile app development.
- **React Hook Form:** Simplifies form handling and validation.
- **Zod:** For client-side data validation and request handling.
- **Zustand:** Minimalistic state management for React.
- **React Native Testing Library with Jest:** Ensures component reliability.
- **MSW (Mock Service Worker):** Mocks API calls during testing.

## Folder Structure

- **utils:** Utility functions and helper modules.
- **types:** TypeScript type definitions.
- **stores:** State management.
- **mocks:** Mock data for testing.
- **constants:** Constants and configuration files.
- **components:** Reusable UI components.
- **assets:** Static assets.
- **app:** Main application code.

## How to Run the App

### Prerequisites

Before you begin, ensure that you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (recommended LTS version)
- [Yarn](https://yarnpkg.com/) package manager
- [Expo CLI](https://docs.expo.dev/get-started/installation/) globally
  installed. You can install it using the following command:

  ```bash
  npm i expo-cli -g
  ```

### Installation

1. Clone the project repository to your local machine:

   ```bash
   git clone https://github.com/kewinzaq1/cognitr-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cognitr-app
   ```

3. Install project dependencies using Yarn:

   ```bash
   yarn install
   ```

### Running the App

4. Start the development server using Yarn:

   ```bash
   yarn start
   ```

### Running the Tests

1. Start the development server using Yarn:

   ```bash
   yarn test
   ```
