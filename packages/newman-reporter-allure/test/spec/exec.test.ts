/* eslint-disable @stylistic/quotes */
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { server } from "../mocks/server.js";
import { runNewmanCollection } from "../utils.js";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("empty exec", async () => {
  const { tests } = await runNewmanCollection({
    item: [
      {
        name: "Header Test Request",
        event: [
          {
            listen: "test",
            script: {
              exec: [""],
              type: "text/javascript",
            },
          },
          {
            listen: "prerequest",
            script: {
              exec: [""],
              type: "text/javascript",
            },
          },
        ],
        request: {
          method: "GET",
          header: [
            {
              key: "A-Header",
              value: "with some value",
            },
            {
              key: "B-Header",
              value: "with other value",
            },
          ],
          body: {
            mode: "raw",
            raw: '{\r\n    testVal1: "body",\r\n    testVal2: 1,\r\n    testVal3: true,\r\n}',
          },
          url: {
            host: ["example", "com"],
            path: ["headers"],
          },
        },
        response: [],
      },
    ],
  });

  expect(tests).toHaveLength(1);
  expect(tests[0].attachments).toEqual([
    {
      name: "Request Headers",
      source: expect.stringContaining("attachment.json"),
      type: "application/json",
    },
    {
      name: "Request Body",
      source: expect.stringContaining("attachment.txt"),
      type: "text/plain",
    },
    {
      name: "Response Headers",
      source: expect.stringContaining("attachment.json"),
      type: "application/json",
    },
    {
      name: "Response Body",
      source: expect.stringContaining("attachment.txt"),
      type: "text/plain",
    },
  ]);
});
