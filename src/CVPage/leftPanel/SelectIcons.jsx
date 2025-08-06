import "./LeftPanel.scss";
import PropTypes from "prop-types";

export function SelectIcons({ icon, selected, onClick }) {
  return (
    <div
      className={`sideMarker${selected ? " sideMarker--selected" : ""}`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
}

SelectIcons.propTypes = {
  icon: PropTypes.node.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
