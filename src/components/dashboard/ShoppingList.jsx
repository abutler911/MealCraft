import styled from "styled-components";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { shoppingList } from "../../data/mealPlans";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const CategorySection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing?.lg || "2rem"};
`;

const CategoryTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors?.primary || "#10b981"};
  margin-bottom: ${(props) => props.theme.spacing?.sm || "1rem"};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing?.xs || "0.5rem"};
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${(props) => props.theme.spacing?.xs || "0.5rem"};
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing?.xs || "0.5rem"};
  padding: ${(props) => props.theme.spacing?.xs || "0.5rem"};
  border-radius: ${(props) => props.theme.borderRadius?.md || "0.5rem"};
  cursor: pointer;
  transition: all
    ${(props) => props.theme.transitions?.fast || "150ms ease-in-out"};

  &:hover {
    background-color: ${(props) =>
      props.theme.colors?.gray?.[800] || "#1f2937"};
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${(props) => props.theme.colors?.primary || "#10b981"};
  cursor: pointer;
`;

const ItemText = styled.span`
  font-size: 0.875rem;
  color: ${(props) =>
    props.checked
      ? props.theme.colors?.text?.muted || "#94a3b8"
      : props.theme.colors?.text?.secondary || "#cbd5e1"};
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
  transition: all
    ${(props) => props.theme.transitions?.fast || "150ms ease-in-out"};
`;

const ShoppingStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing?.md || "1.5rem"};
  background-color: ${(props) => props.theme.colors?.gray?.[800] || "#1f2937"};
  border-radius: ${(props) => props.theme.borderRadius?.lg || "0.75rem"};
  margin-bottom: ${(props) => props.theme.spacing?.lg || "2rem"};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors?.primary || "#10b981"};
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors?.text?.muted || "#94a3b8"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing?.sm || "1rem"};
  margin-top: ${(props) => props.theme.spacing?.lg || "2rem"};

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const ShoppingList = ({ isOpen, onClose }) => {
  const [checkedItems, setCheckedItems] = useLocalStorage(
    "keto-shopping-checked",
    {}
  );

  const handleItemToggle = (category, item) => {
    const key = `${category}-${item}`;
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const clearAllChecked = () => {
    setCheckedItems({});
  };

  const checkAllItems = () => {
    const allItems = {};
    shoppingList.forEach((category) => {
      category.items.forEach((item) => {
        const key = `${category.category}-${item}`;
        allItems[key] = true;
      });
    });
    setCheckedItems(allItems);
  };

  const totalItems = shoppingList.reduce(
    (total, category) => total + category.items.length,
    0
  );
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercentage =
    totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🛒 Keto Shopping List"
      maxWidth="800px"
    >
      <ShoppingStats>
        <StatItem>
          <StatNumber>{checkedCount}</StatNumber>
          <StatLabel>Checked</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{totalItems - checkedCount}</StatNumber>
          <StatLabel>Remaining</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{Math.round(progressPercentage)}%</StatNumber>
          <StatLabel>Complete</StatLabel>
        </StatItem>
      </ShoppingStats>

      {shoppingList.map((category, categoryIndex) => (
        <CategorySection key={categoryIndex}>
          <CategoryTitle>
            {category.category}
            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
              ({category.items.length} items)
            </span>
          </CategoryTitle>
          <ItemGrid>
            {category.items.map((item, itemIndex) => {
              const key = `${category.category}-${item}`;
              const isChecked = checkedItems[key] || false;

              return (
                <CheckboxItem key={itemIndex}>
                  <Checkbox
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleItemToggle(category.category, item)}
                  />
                  <ItemText checked={isChecked}>{item}</ItemText>
                </CheckboxItem>
              );
            })}
          </ItemGrid>
        </CategorySection>
      ))}

      <ActionButtons>
        <Button
          variant="outline"
          onClick={clearAllChecked}
          disabled={checkedCount === 0}
        >
          ✓ Clear All
        </Button>
        <Button
          variant="secondary"
          onClick={checkAllItems}
          disabled={checkedCount === totalItems}
        >
          Check All
        </Button>
        <Button onClick={onClose}>Done Shopping</Button>
      </ActionButtons>
    </Modal>
  );
};
