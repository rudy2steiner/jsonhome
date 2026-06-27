import {getApiKey, getBaseUrl, getModel} from "~/configs/openai";

export async function POST(req: Request) {

  const json = await req.json();

  const prompt = json.prompt;

  const body = {
    "model": getModel(),
    "prompt": prompt,
    "size": "1920X1080"
  }

  const result = await fetch(`${getBaseUrl()}/v1/video/generations`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${getApiKey()}`
    },
  }).then(v => v.json()).catch(err => console.log(err));
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
    status: 200
  });
}
