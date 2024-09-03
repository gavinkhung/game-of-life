# Conway's Game of Life

Conway's Game of Life built with React and TypeScript. This is a zero-player game that models underpopulation, overpopulation, and reproduction using a grid of cells. The cells are either alive or dead. The state of each cell is determined by the states of its neighbors.

## Website

![Conway](./public/cell.gif)

## Usage

### Running the program locally

Start the service

```sh
npm install
npm run dev
```

Build the service

```sh
npm run build
```

### Running via Docker

Build the Docker image and start it

```sh
docker build -t game-of-life .
docker run --rm -p 80:80 -v "$(pwd)":/app game-of-life
```

Navigate to the following URL: [http://localhost:80](http://localhost:80)

### Running via Docker Compose

Start the Docker image

```bash
docker compose up serve --build -d
```

Navigate to the following URL: [http://localhost:80](http://localhost:80)

Clean up the Docker container

```bash
docker compose down --volumes --rmi local
```

Build the service

```bash
docker compose up node-build --build -d
docker compose down --volumes --rmi local
```

### Development with Docker Compose

Start the service with hot reload enabled

```bash
docker compose up dev --build -d
docker compose down --volumes --rmi local
```

Make edits and navigate to the following URL: [http://localhost:80](http://localhost:80)
