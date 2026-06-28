export default {

    async fetch(request, env) {

        const url = new URL(request.url);

        if (url.pathname === "/") {

            return Response.json({

                status: "online",

                api: "KivuStream"

            });

        }

        return new Response("Not Found", {

            status: 404

        });

    }

}
