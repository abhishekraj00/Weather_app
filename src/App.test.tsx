
import renderer from "react-test-renderer";
import App from "./App";

// snapshot test for component
describe("SnapShot Test For Checking ui", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

