import "./LeftPanel.scss";
import {
  VscDebugAlt,
  VscExtensions,
  VscFiles,
  VscSearch,
  VscSourceControl,
} from "react-icons/vsc";
import { SelectIcons } from "./SelectIcons";
import { useState } from "react";

export function LeftPanel() {
  const [selected, setSelected] = useState("files");
  const icons = [
    { key: "files", icon: <VscFiles className="icon" /> },
    { key: "search", icon: <VscSearch className="icon" /> },
    { key: "source", icon: <VscSourceControl className="icon" /> },
    { key: "debug", icon: <VscDebugAlt className="icon" /> },
    { key: "extensions", icon: <VscExtensions className="icon" /> },
  ];

  return (
    <div className="leftPanel">
      {icons.map(({ key, icon }) => (
        <SelectIcons
          key={key}
          icon={icon}
          selected={selected === key}
          onClick={() => setSelected(key)}
        />
      ))}
    </div>
  );
}
