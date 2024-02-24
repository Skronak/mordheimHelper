import React, {useEffect, useState} from "react";
import {Equipement, PlayerUnit, UnitRef} from "@/army";
import {getPortraitAssetUrl} from "@/components/Utils";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./unit-modal.css";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Layout from "@/pages/Layout";

interface Props {
  title: string;
  onClose: () => void;
  onAddUnit: (u: UnitRef, w: number[], a: number[]) => void;
  onEdit: (id: number, u: UnitRef, w: number[], a: number[]) => void;
  playerUnit?: PlayerUnit;
  data: UnitRef[];
}

export default function UnitPage(props: Props) {
  const [currentUnit, setCurrentUnit] = useState<UnitRef>();
  const [availableWeapons, setAvailableWeapons] = useState<Equipement[]>([]);
  const [availableArmors, setAvailableArmors] = useState<Equipement[]>([]);
  const [selectedWeapons, setSelectedWeapons] = useState<number[]>([]);
  const [selectedArmors, setSelectedArmors] = useState<number[]>([]);
  const profilsLabel = ["Global", "Defensive", "Offensive"];
  const profilsHeader = [["Adv", "Mar", "Dis", "Rat", "Upk", "Lvl"], ["HP", "Def", "Res", "Arm"], ["Att", "Off", "Str", "AP", "Agi", "Aim"]];

  useEffect(() => {
    setCurrentUnit(props.playerUnit ? (props.data.filter(unit => unit.id === props.playerUnit!.id_unit)[0]) : props.data[0]);
    setSelectedWeapons(props.playerUnit ? props.playerUnit.weapon : []);
    setSelectedArmors(props.playerUnit ? props.playerUnit.armor : []);
  }, []);

  const handleToggleWeapon = (value: number) => () => {
    if (selectedWeapons.includes(value)) {
      setSelectedWeapons(selectedWeapons.filter(id => id !== value));
    } else {
      setSelectedWeapons([...selectedWeapons, value]);
    }
  }

  const onChangeCarousel = (index: number) => {
    setCurrentUnit(props.data[index]);
  }
  const getDefaultIndexCarousel = () => {
    return props.playerUnit ? props.data.map(elt => elt.id).indexOf(props.playerUnit.id_unit) : 0;
  }

  return (
      <Layout onPrevious={props.onClose} title={''} readonly={true}>
        <div title={props.title}>
          <div className={"modal-units-select-container"}>
            <Carousel onChange={onChangeCarousel} className={"unit-carousel"} autoPlay={false} animation={"slide"}
                      navButtonsAlwaysVisible={true} cycleNavigation={false} index={getDefaultIndexCarousel()}>
              {props.data.sort((e1, e2) => e1.cost - e2.cost)
                  .map(elt => (
                          <div className="modal-unit-select-container" key={elt.id}>
                                <span className="modal-unit-select" onClick={() => setCurrentUnit(elt)}>
                                <span>{elt.name} - {elt.cost}gc</span>
                                <img className={"modal-unit-icon"} src={getPortraitAssetUrl(elt.icon)}/>
                                </span>
                          </div>
                      )
                  )}
            </Carousel>
          </div>

          <div>
            <Accordion defaultExpanded>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1-content"
                  id="panel3-header"
              >
                Unit Profil {currentUnit?.name}
              </AccordionSummary>
              <AccordionDetails>
                <div className={"modal-unit-container"}>
                  {currentUnit && currentUnit.profils && currentUnit.profils.map((profil, i) => (
                      <>
                        <p>{profilsLabel[i]}</p>
                        <table className={"modal-unit-profil-table"}>
                          <tr>{profilsHeader[i].map((header) => <th>{header}</th>)}</tr>
                          <tr>{profil.map(elt => <td>{elt}</td>)}</tr>
                        </table>
                      </>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel2-content"
                  id="panel2-header"
              >
                Rules
              </AccordionSummary>
              <AccordionDetails>
                <span>Rules</span>
                <div className={"modal-unit-container modal-unit-rules"}>
                  {currentUnit && currentUnit.rules && currentUnit.rules.map(rule =>
                      <div>{rule.name} : {rule.effect}</div>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel3-content"
                id="panel2-header"
            >
              Equipement
            </AccordionSummary>
            <AccordionDetails>
              <div className={"modal-units-select-container"}>
                <div className={'weapon-bloc'}>
                  {currentUnit && currentUnit.availableHtHWeapons.map(elt =>
                      <div className="modal-weapon-select-container" key={elt.id}>
                                                      <span className="modal-weapon-select">
                                                        <span>{elt.name} - {elt.cost}pts</span>
                                                        <input onClick={handleToggleWeapon(elt.id)}
                                                               checked={selectedWeapons && selectedWeapons.includes(elt.id)}
                                                               type="checkbox"></input>
                                                      </span>
                      </div>
                  )}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          <div className={"modal-unit-container"}>

            <label>Total Cost : {currentUnit ? currentUnit.cost : 0}</label>
          </div>
          <button onClick={props.onClose}>Annuler</button>
          <button
              onClick={() => props.playerUnit ? props.onEdit(props.playerUnit.id, currentUnit!, selectedWeapons, selectedArmors) : props.onAddUnit(currentUnit!, selectedWeapons, selectedArmors)}>Enregistrer
          </button>
        </div>
      </Layout>
  )
}