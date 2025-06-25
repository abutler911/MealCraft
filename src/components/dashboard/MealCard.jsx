import styled from "styled-components";

const MealContainer = styled.div`
  background-color: ${(props) => props.theme.colors?.gray?.[800] || "#1f2937"};
  border: 1px solid ${(props) => props.theme.colors?.gray?.[700] || "#374151"};
  border-radius: ${(props) => props.theme.borderRadius?.lg || "0.75rem"};
  padding: ${(props) => props.theme.spacing?.md || "1.5rem"};
  transition: all
    ${(props) => props.theme.transitions?.fast || "150ms ease-in-out"};

  &:hover {
    border-color: ${(props) => props.theme.colors?.gray?.[600] || "#4b5563"};
  }
`;

const MealHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing?.xs || "0.5rem"};
  margin-bottom: ${(props) => props.theme.spacing?.sm || "1rem"};
`;

const MealTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors?.text?.primary || "white"};
  text-transform: capitalize;
  margin: 0;
`;

const MealList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MealItem = styled.li`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors?.text?.secondary || "#cbd5e1"};
  line-height: 1.4;
  position: relative;
  padding-left: 1rem;

  &:before {
    content: "•";
    color: ${(props) => props.theme.colors?.primary || "#10b981"};
    position: absolute;
    left: 0;
  }
`;

const mealIcons = {
  breakfast: "🍳",
  lunch: "🥗",
  snack: "🥜",
  dinner: "🍽️",
};

export const MealCard = ({ mealType, items }) => {
  return (
    <MealContainer>
      <MealHeader>
        <span style={{ fontSize: "1.125rem" }}>
          {mealIcons[mealType] || "🍴"}
        </span>
        <MealTitle>{mealType}</MealTitle>
      </MealHeader>
      <MealList>
        {items?.map((item, index) => (
          <MealItem key={index}>{item}</MealItem>
        )) || <MealItem>No items available</MealItem>}
      </MealList>
    </MealContainer>
  );
};
