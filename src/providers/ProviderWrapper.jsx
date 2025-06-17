"use client"; 

import { Provider } from "react-redux";
import { store } from "@/store/redux/store";

export default function ProviderWrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
