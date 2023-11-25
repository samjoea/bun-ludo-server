# bun-docker

> Deploy a simple Bun [HTTP server](https://bun.sh/docs/api/http) on Render

[Bun](https://bun.sh/) is a JavaScript runtime that serves as a bundler, test runner, and package manager.

## Prerequisites

Refer to the [Bun documentation](https://bun.sh/docs/installation) to install Bun.

## Usage

### `bun install`

To run this app locally, first run `bun install` to install the dependencies.

### `bun dev`

Run `bun dev` to start the server locally.

Running the app in dev uses the [`--hot` reload flag](https://bun.sh/docs/runtime/hot#hot-mode), which Bun uses to re-run changed files without restarting the `bun` process.

The server will run on port `8081` if not `PORT` is specified. Visit [http://localhost:8081](http://localhost:8081) to view the app.

### `bun start`

Run `bun start` to start the server locally without the `--hot` reload flag.


Use the official [Bun Docker image](https://hub.docker.com/r/oven/bun) to deploy this app to Render.


# bun-ludo-server

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.7. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
