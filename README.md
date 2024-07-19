# SWAPI App React Native - Documentation


## 1. Project Overview

### 1.1. Purpose

This application uses the Star Wars API (SWAPI) to display Star Wars characters and their detailed information in a React Native mobile app.

### 1.2. Use Cases

- List of characters
- Detailed view of characters
- Infinite scroll in the character list


## 2. Installation Guide

### 2.1. Requirements

- Node.js and npm (or Yarn) installed
- Expo CLI installed

### 2.2. Installation Steps

1. **Clone the project**

   ```bash
   git clone https://github.com/kittii9797/swapi-app-react-native.git


2. **Navigate to the project directory**

    ```bash
    npm install
    # or
    yarn install

3. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install

3. **Start the application**

    ```bash
    npm start
    # or
    yarn start

## 3. Project Structure

### 3.1. Folders and Files

- /src: Source code directory
    - /components: Reusable React components
    - /navigators: Navigation configurations
    - /utils: Helper functions and API calls
    - /screens: Different screens (e.g., Home)
- App.tsx: Entry point of the application
- package.json: Project configuration and dependencies
- jest.config.ts: Jest configuration file for testing.

### 3.2. Key Components

- Home.tsx: The main screen displaying the list of characters
- StarwarsCard.tsx: A card component displaying character details


## 4. API Integration

### 4.1. SWAPI

- Endpoint: https://swapi.dev/api/people/
- Data: Character names, URLs, films, vehicles, starships, etc.

### 4.2. Fetching Data
- fetchStarwarsCharacters: Function to retrieve the list of characters.
- fetchStarwarsCharacter: Function to retrieve detailed information about a specific character.
- fetchStarwarsPlanet: Function to fetch data about a planet.


## 5. Testing

### 5.1. Testing Environment

- Jest: Testing framework
- React Test Renderer: For rendering and testing React components

### 5.2. Running Tests

- To run the tests, use the following command:

    ```bash
    npm test
    # or
    yarn test

## 6. Development Guide

### 6.1. Development Tools

- Expo CLI: A command-line tool for managing and building React Native apps.
- VS Code: Recommended editor for working with this project.

### 6.2. Code Style and Conventions

- ESLint: For code quality and linting.
- Prettier: For code formatting and consistency.


## 7. License

This project is licensed under the MIT License. For more details, please refer to the LICENSE file included in the repository.


## 8. Preview

- Device: Pixel_4_API_28 (android)

![Preview Screen](./assets/swapi-preview.gif)

