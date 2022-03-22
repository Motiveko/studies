import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("displays image for each scoop option from the server", async () => {
  render(<Options optionType={"scoops"} />);

  // find image
  // img는 서버로부터 응답을 데이터를 응답받아 생성되는 비동기 동작이므로, 쿼리시 await findBy~ 메서드가 필수다. 없는거라면
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i }); // img의 option.name은 altText를 의미한다.
  expect(scoopImages).toHaveLength(2);

  // confirm alt text
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Vanilla scoop", "Chocolate scoop"]);
});

test("displays image for each topping option from the server", async () => {
  render(<Options optionType={"toppings"} />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
