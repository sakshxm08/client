import React from "react";

import { Banner } from "../components/Banner";
import { Categories } from "../components/Categories";
import Transitions from "../components/Transition";

export const Home = () => {
  return (
    <Transitions>
      <div>
        <Banner />
        <Categories />
      </div>
    </Transitions>
  );
};
