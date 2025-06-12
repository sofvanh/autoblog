# Autoblog

[**Autoblog**](https://autoblog.sofiavanhanen.fi/) is an experimental interface meant to help writers *publish their most authentic thoughts* and readers *make sense of those thoughts in their unique context*. Inspired by [Live machinery](https://www.lesswrong.com/posts/9KamjXbTaQpPnNsxp/live-machinery-interface-design-workshop-for-ai-safety-ea), Autoblog *scales that which used to not be scalable*; That is, nuance, context, and personalization.

[Live demo and more info here!](https://autoblog.sofiavanhanen.fi/)

## Quickstart

You'll need the `ANTHROPIC_API_KEY` environment variable set (e.g. in a `.env` file).

```sh
npm install
npm run dev
```

Then open http://localhost:3000

### Docker

```sh
docker build -t autoblog .
docker run -e ANTHROPIC_API_KEY=your_key -p 3000:3000 autoblog
```

## CI/CD

A GitHub Action is listening to commits on `main`, building new Docker images, pushing them to Google Cloud Build, and deploying on Google Cloud Run, with the result visible [on my website](https://autoblog.sofiavanhanen.fi/).