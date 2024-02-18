import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import React from "react";
import {ArmyPage} from "@/pages/createArmy/ArmyPage";
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
                        <Route path="/mordheimHelper/create/:idRace" element={<ArmyPage/>} />
                        <Route path="/mordheimHelper/edit/:idArmy" element={<ArmyPage/>} />
                        <Route path="*" element={<Navigate to="/"/>} />
                    </Routes>
                </MantineProvider>
            </React.Suspense>
        </>
    );
};export default App;