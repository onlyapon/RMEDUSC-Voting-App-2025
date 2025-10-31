# RMEDUSC Voting App

A simple and customizable web-based voting application for club elections.

## Features

- **Two Voter Categories:** Supports different voter categories with different ballots.
- **Multiple Positions:** Easily configurable positions for each voter category.
- **Multiple Candidates:** Add as many candidates as you need for each position.
- **Multiple Votes:** Supports positions where voters can cast more than one vote (e.g., for executive committees).
- **Real-time Results:** View election results in real-time.
- **Flashcard-style Results:** Reveal results one position at a time in a clean, flashcard-style interface.
- **Bar Chart Visualization:** Results are visualized with bar charts to easily see the vote distribution.
- **Multi-device Support:** Cast votes from any device on the same network.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm) must be installed on the server machine.

### Installation

1. Clone this repository or download the source code.
2. Open a terminal and navigate to the `server` directory:
   ```bash
   cd "/Volumes/Blankspace/RMEDUSC Voting App/server"
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. In the `server` directory, start the server:
   ```bash
   node index.js
   ```
2. The server will be running on `http://localhost:3000`.

## Usage

### Casting a Vote

1. Open a web browser and go to `http://localhost:3000`.
2. Select your voter category.
3. Make your selections for each position.
4. Click the "Submit Vote" button.

To cast votes from other devices, see the [Multi-device Voting](#multi-device-voting) section.

### Viewing Results

1. Open a web browser and go to `http://localhost:3000/results.html`.
2. Click the "Reveal Next Position" button to see the results for each position one by one.

### Multi-device Voting

1. Find the IP address of the server machine. On macOS, you can use the command `ipconfig getifaddr en0` in the terminal.
2. Make sure the other devices are on the same network as the server.
3. On the other devices, open a web browser and go to `http://<server-ip-address>:3000` (replace `<server-ip-address>` with the actual IP address of the server).

## Configuration

### Customizing the Election

You can customize the election by editing the JSON files in the `database` directory.

- **`database/positions.json`**: Defines the positions for each voter category.
  - `id`: A unique ID for the position.
  - `name`: The name of the position.
  - `category`: The voter category that can vote for this position (`RME 10` or `RME 1-9`).
  - `max_votes`: (Optional) The number of votes a user can cast for this position. If not specified, it defaults to 1.

- **`database/candidates.json`**: Defines the candidates for each position.
  - `id`: A unique ID for the candidate.
  - `name`: The name of the candidate.
  - `positionId`: The ID of the position the candidate is running for (must match an `id` in `positions.json`).

### Resetting the Database

To start a new election and clear all the votes, replace the content of `database/votes.json` with an empty array `[]`.
