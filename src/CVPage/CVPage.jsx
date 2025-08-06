import "./CVPage.scss";
import { Header } from "./header/Header";
import { LeftPanel } from "./leftPanel/LeftPanel";

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
      <Header />
      <div className="fileNameLeft"></div>
      <div className="fileNameRight"></div>

      <LeftPanel />
      <div className="explorer">Explorer</div>
      <div className="codeWindowLeft">Code Window Left</div>
      <div className="codeWindowRight">Code Window Right</div>
      <div className="terminal">Terminal</div>
    </div>
  );
}

export default CVPage;
