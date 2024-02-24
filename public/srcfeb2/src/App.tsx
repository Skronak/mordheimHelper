import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import React from "react";
import {ArmyParentPage} from "../../../src/pages/createArmy/ArmyParentPage";
import ListArmyPage from "@/pages/armyList/ListArmyPage";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import { MantineProvider } from "@mantine/core";

const App: React.FC = () => {
    return (
        <>
            <React.Suspense fallback="Loading...">
                <MantineProvider>
                    <Routes>
                        <Route path="/mordheimHelper/" element={<HomePage/>} />
                        <Route path="/mordheimHelper/home" element={<HomePage/>} />
                        <Route path="/mordheimHelper/list" element={<ListArmyPage/>} />
                        <Route path="/mordheimHelper/create/:idRace" element={<ArmyParentPage/>} />
                        <Route path="/mordheimHelper/edit/:idArmy" element={<ArmyParentPage/>} />
                        <Route path="*" element={<Navigate to="/"/>} />
                    </Routes>
                </MantineProvider>
            </React.Suspense>
        </>
    );
};export default App;