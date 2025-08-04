import "./CVPage.scss";
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

function CVPage() {
  return (
    // <div className="wrapper">
    //   <div className="header">

    //     </div>
    //   <div className="name">Simas Safronovas</div>
    //   <div className="contact-info">
    //     <div className="contact-number">+370 693 81 525</div>
    //     <div className="contact-email">simas.safr@gmail.com </div>
    //     <div className="contact-location">Vilnius, Lithuania</div>
    //     <div className="contact-birthday">1997-07-23</div>
    //   </div>
    // </div>

    <div className="grid">
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
            <VscSearch className="magnifyingGlass" />
            <span className="myWebsite">MyWebsite</span>
          </div>
          <VscCopilot />
          <VscChevronDown />
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
      <div className="fileNameLeft"></div>
      <div className="fileNameRight"></div>

      <div className="leftPanel">Left Panel</div>
      <div className="explorer">Explorer</div>
      <div className="codeWindowLeft">Code Window Left</div>
      <div className="codeWindowRight">Code Window Right</div>
      <div className="terminal">Terminal</div>
    </div>
  );
}

export default CVPage;
