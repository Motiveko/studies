import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import OrderEntry from "../OrderEntry";

jest.mock("axios");
test("jest mocking module axios", async () => {
  const baseUrl = "http://localhost:3030";
  axios.get.mockImplementation((url) => {
    if (url === `${baseUrl}/scoops`) {
      return Promise.reject("scoops 요청 실패");
    }
    if (url === `${baseUrl}/toppings`) {
      return Promise.reject("toppings 요청 실패");
    }
    throw new Error("요청이 이상한데로 가고 있습니다.");
  });
  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert", {
      name: "An unexpected error occureed. Please try again later",
    });
    expect(alerts).toHaveLength(2);
  });
});
