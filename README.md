# Autoblog

[**Autoblog**](https://autoblog.sofiavanhanen.fi/) is an experimental interface meant to help writers *publish their most authentic thoughts* and readers *make sense of those thoughts in their unique context*. Inspired by [Live machinery](https://www.lesswrong.com/posts/9KamjXbTaQpPnNsxp/live-machinery-interface-design-workshop-for-ai-safety-ea), Autoblog *scales that which used to not be scalable*; That is, nuance, context, and personalization.

See the [live demo](https://autoblog.sofiavanhanen.fi/), doubling as project docs, to see what this project is all about.

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