import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-util";
import OrderEntry from "../OrderEntry";

import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handles error for scoops and toppings routes", async () => {
  // 기본 설정한 서버를 에러를 던지도록 reset
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(
    async () => {
      const alerts = await screen.findAllByRole("alert", {
        name: "An unexpected error occureed. Please try again later",
      });
      console.log("슉슈슈슉");
      expect(alerts).toHaveLength(2);
    },
    { timeout: 100 }
  );
});
