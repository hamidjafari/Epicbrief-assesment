import { Response } from "express";

export const errorHandler = (res: Response, error: unknown) => {
	console.error(error);

	res.status(500).json({
		error: {
			message: "An error occurred while processing your request.",
		},
	});
};
