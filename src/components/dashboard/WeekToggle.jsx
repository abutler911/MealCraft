// src/components/dashboard/WeekToggle.jsx - FIXED
import styled from "styled-components";

const ToggleContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors?.gray?.[800] || "#1f2937"};
  border-radius: ${(props) => props.theme.borderRadius?.lg || "0.75rem"};
  padding: 0.25rem;
`;

const ToggleButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["$active"].includes(prop),
})`
  padding: 0.5rem 1rem;
  border-radius: ${(props) => props.theme.borderRadius?.md || "0.5rem"};
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all
    ${(props) => props.theme.transitions?.fast || "150ms ease-in-out"};
  background-color: ${(props) =>
    props.$active ? props.theme.colors?.primary || "#10b981" : "transparent"};
  color: ${(props) =>
    props.$active
      ? props.theme.colors?.text?.primary || "white"
      : props.theme.colors?.text?.secondary || "#cbd5e1"};

  &:hover {
    color: ${(props) => props.theme.colors?.text?.primary || "white"};
  }
`;

export const WeekToggle = ({ currentWeek, onWeekChange }) => {
  return (
    <ToggleContainer>
      <ToggleButton $active={currentWeek === 1} onClick={() => onWeekChange(1)}>
        Week 1
      </ToggleButton>
      <ToggleButton $active={currentWeek === 2} onClick={() => onWeekChange(2)}>
        Week 2
      </ToggleButton>
      <ToggleButton $active={currentWeek === 3} onClick={() => onWeekChange(3)}>
        Week 3
      </ToggleButton>
      <ToggleButton $active={currentWeek === 4} onClick={() => onWeekChange(4)}>
        Week 4
      </ToggleButton>
    </ToggleContainer>
  );
};
