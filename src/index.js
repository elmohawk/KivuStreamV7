export default {

    async fetch(request, env) {

        const url = new URL(request.url);

        // CORS
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS"
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { headers });
        }

        // Home
      if (url.pathname === "/") {

    return new Response("HELLO FROM MY WORKER");

}

        }

        // ==========================
        // TMDB Search
        // ==========================

        if (url.pathname.startsWith("/tmdb/search/")) {

            const title = decodeURIComponent(
                url.pathname.replace("/tmdb/search/", "")
            );

            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${env.TMDB_API_KEY}&query=${encodeURIComponent(title)}`
            );

            if (!response.ok) {

                return Response.json({
                    error: "TMDB request failed"
                }, {
                    status: response.status,
                    headers
                });

            }

            const data = await response.json();

            if (!data.results.length) {

                return Response.json({
                    error: "Movie not found"
                }, {
                    status: 404,
                    headers
                });

            }

            return Response.json(data.results[0], {
                headers
            });

        }

        return new Response("Not Found", {
            status: 404,
            headers
        });

    }

}
