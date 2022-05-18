import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
	Sentry.init({
		dsn: "https://0c33cb96bf3d480c80764ab759818196@o1211559.ingest.sentry.io/6351123",
		integrations: [new BrowserTracing()],
		tracesSampleRate: 1.0,
	});
}

function log(error) {
	Sentry.captureException(error);
}

export default {
	init,
	log,
};
