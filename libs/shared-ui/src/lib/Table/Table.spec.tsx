import React from "react";
import { render } from "@testing-library/react";

import { Table } from "./Table";

describe("SharedUi", () => {
	it("should render successfully", () => {
		const { baseElement } = render(<Table columns={[]} data={[]} />);
		expect(baseElement).toBeTruthy();
	});
});
