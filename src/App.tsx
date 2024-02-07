import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import React from "react";
import {ArmyPage} from "@/pages/createArmy/ArmyPage";
import ListArmyPage from "@/pages/armyList/ListArmyPage";
import "./App.css";
import HomePage from "./pages/home/HomePage";

const App: React.FC = () => {
    return (
        <>
            <React.Suspense fallback="Loading...">
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/list" element={<ListArmyPage/>} />
                    <Route path="/create/:idRace" element={<ArmyPage/>} />
                    <Route path="/edit/:idArmy" element={<ArmyPage/>} />
                    <Route path="*" element={<Navigate to="/"/>} />
                </Routes>
            </React.Suspense>
        </>
    );
};export default App;