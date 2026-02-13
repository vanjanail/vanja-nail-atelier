export const onRequest = async () => {
  return new Response("pong", {
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
