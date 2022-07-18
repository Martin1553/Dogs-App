import React from "react";
import { configure, mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import DogForm from "./components/DogForm";
import rootReducer from "../src/reducer";
import { render, screen } from '@testing-library/react';
import Card from './components/Card';
import { MemoryRouter } from 'react-router-dom';


describe("Reducer", () => {
  const state = {
    dogs: [],
    alldogs: [],
    temperaments: [],
    detail: [],
  };

  it("should return the initial state if no valid type is passed", () => {
    expect(rootReducer(undefined, [])).toEqual({ dogs: [], alldogs: [], temperaments: [], detail: [] });
  })
})

describe("<Card />", () => {
test('Should render Card component', () => {
  render(
    <MemoryRouter>
      <Card />
    </MemoryRouter>
  );
  expect(screen.getByText(/temperaments:/i)).toBeInTheDocument();
  expect(screen.getByText(/Weight:/i)).toBeInTheDocument();
});
});

configure({ adapter: new Adapter() });

describe("<DogForm />", () => {
  const state = {
    temperaments: [
      {
        id: 1,
        name: "Stubborn",
      },
    ],
  };
  const mockStore = configureStore([thunk]);

  describe("Estructura", () => {
    let dogForm;
    let store = mockStore(state);
    beforeEach(() => {
      dogForm = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/create"]}>
            <DogForm />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Should render a form", () => {
      expect(dogForm.find("form")).toHaveLength(1);
    });

    it("Should have a label with text Name", () => {
      expect(dogForm.find("label").at(0).text()).toEqual("Name: ");
    });

    it("Should render an input for name", () => {
      expect(dogForm.find('input[name="name"]')).toHaveLength(1);
    });

    it("Should have a label with text Image", () => {
      expect(dogForm.find("label").at(1).text()).toEqual("Image: ");
    });

    it("Should render an input for image", () => {
      expect(dogForm.find('input[name="image"]')).toHaveLength(1);
    });

    it("Should have a label with text Height", () => {
      expect(dogForm.find("label").at(2).text()).toEqual("Height(Cm): ");
    });

    it("Should render an input for Height Min", () => {
      expect(dogForm.find('input[name="heightMin"]')).toHaveLength(1);
    });

    it("Should render an input for Height Max", () => {
      expect(dogForm.find('input[name="heightMax"]')).toHaveLength(1);
    });

    it("Should have a label with text Weight", () => {
      expect(dogForm.find("label").at(3).text()).toEqual("Weight(Kg): ");
    });

    it("Should render an input for Weight Min", () => {
      expect(dogForm.find('input[name="min_weight"]')).toHaveLength(1);
    });

    it("Should render an input for Weight Max", () => {
      expect(dogForm.find('input[name="max_weight"]')).toHaveLength(1);
    });

    it("Should have a label with text Life Span", () => {
      expect(dogForm.find("label").at(4).text()).toEqual("Life Span: ");
    });

    it("Should render an input for Life Span Min", () => {
      expect(dogForm.find('input[name="lifeSpanMin"]')).toHaveLength(1);
    });

    it("Should render an input for Life Span Max", () => {
      expect(dogForm.find('input[name="lifeSpanMax"]')).toHaveLength(1);
    });

    it("should render a button Create for submit", () => {
      expect(dogForm.find('button[type="submit"]')).toHaveLength(1);
      expect(dogForm.find("button").at(0).text()).toEqual("Create");
    });
  });
});