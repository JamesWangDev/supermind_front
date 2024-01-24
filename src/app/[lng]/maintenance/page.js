"use client";

import MaintenanceComponent from "@/Components/Maintenance";
import SettingProvider from "@/Helper/SettingContext/SettingProvider";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const Maintenance = (children) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={children.dehydratedState}>
        <SettingProvider>
          <MaintenanceComponent />
        </SettingProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default Maintenance;
