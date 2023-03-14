import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { combineProviders } from "react-combine-providers";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import theme from "./theme";

function CombinedProviders({ children }: React.PropsWithChildren) {
	const providers = combineProviders();
	providers.push(ChakraProvider, { theme });
	providers.push(BrowserRouter);

	const queryClient = new QueryClient();
	providers.push(QueryClientProvider, { client: queryClient });

	const MasterProvider = providers.master();
	return <MasterProvider>{children}</MasterProvider>;
}

export default CombinedProviders;
