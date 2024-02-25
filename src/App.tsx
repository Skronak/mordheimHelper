import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import React from "react";
import {ArmyParentPage} from "@/pages/armyEdit/ArmyParentPage";
import ListArmyPage from "@/pages/armySearch/ListArmyPage";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

const App: React.FC = () => {
    return (
        <>
            <React.Suspense fallback="Loading...">
                <MantineProvider forceColorScheme={'dark'}>
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