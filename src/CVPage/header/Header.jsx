import "./Header.scss";
import {
  VscArrowRight,
  VscArrowLeft,
  VscSearch,
  VscCopilot,
  VscChevronDown,
  VscLayout,
  VscLayoutSidebarLeft,
  VscLayoutPanel,
  VscLayoutSidebarRightOff,
  VscChromeMinimize,
  VscChromeRestore,
  VscClose,
} from "react-icons/vsc";

export function Header() {
  return (
    <div className="header">
      <div className="left">
        <img src="images/vscode.png" />
        <span>File</span>
        <span>Edit</span>
        <span>Selection</span>
        <span>View</span>
        <span>Go</span>
        <span>Run</span>
        <span>Terminal</span>
        <span>Help</span>
      </div>

      <div className="center">
        <VscArrowLeft className="leftArrow" />
        <VscArrowRight className="rightArrow" />
        <div className="search">
          <VscSearch />
          <span className="myWebsite">MyWebsite</span>
        </div>
        <VscCopilot className="copilot" />
        <VscChevronDown className="copilotArrow" />
      </div>

      <div className="right">
        <div className="layoutIcons">
          <VscLayout />
          <VscLayoutSidebarLeft />
          <VscLayoutPanel />
          <VscLayoutSidebarRightOff />
        </div>
        <div className="tabIcons">
          <VscChromeMinimize />
          <VscChromeRestore className="restore" />
          <VscClose className="close" />
        </div>
      </div>
    </div>
  );
}
