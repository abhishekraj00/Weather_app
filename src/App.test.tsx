import { render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import Home from "./pages/Home/Home";
// import Link from '../Link';

// describe("Country List Data", () => {
//   it("should render country list when api call", async () => {
//     render(<Home />);
//     await waitFor(() => {
//       screen.getByText("india");
//     });
//   });
// });

// create snapshot test for each component

describe("Country List Data", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
