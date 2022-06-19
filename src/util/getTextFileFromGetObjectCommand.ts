import internal from "stream";

type FuncType = (
  body: internal.Readable | ReadableStream<any> | Blob | undefined
) => Promise<string>;

export const getTextFileFromGetObjectCommand: FuncType = (body) => {
  return new Promise((res, rej) => {
    if (!body) return res("");

    const chunks: string[] = [];

    if (body instanceof internal.Readable) {
      body.on("data", (data) => chunks.push(data));
      body.once("error", (err) => rej(err));
      return body.once("end", () => res(chunks.join("")));
    }

    if (body instanceof ReadableStream) {
      const reader = body.getReader();
      return reader
        .read()
        .then((data) => res(data.value))
        .catch((err) => rej(err));
    }

    if (body instanceof Blob) {
      return body
        .text()
        .then((data) => res(data))
        .catch((err) => rej(err));
    }

    rej(new Error("body type not supported"));
  });
};
