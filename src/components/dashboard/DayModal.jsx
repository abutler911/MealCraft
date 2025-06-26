// src/components/dashboard/DayModal.jsx
import styled from "styled-components";
import { Modal } from "../ui/Modal";
import { MealCard } from "./MealCard";
import { formatDateLong, isToday, isPast } from "../../utils/dateHelpers";

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  padding-bottom: ${(props) => props.theme.spacing.md};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[700]};
`;

const DayNumber = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$completed", "$isToday", "$isPast"].includes(prop),
})`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.5rem;
  background-color: ${(props) => {
    if (props.$isToday) return props.theme.colors.primary;
    if (props.$completed) return props.theme.colors.primary;
    if (props.$isPast) return props.theme.colors.gray[600];
    return props.theme.colors.gray[700];
  }};
  color: ${(props) => {
    if (props.$isToday || props.$completed)
      return props.theme.colors.text.primary;
    if (props.$isPast) return props.theme.colors.text.muted;
    return props.theme.colors.text.secondary;
  }};
  border: ${(props) =>
    props.$isToday ? `3px solid ${props.theme.colors.primary}` : "none"};
  box-shadow: ${(props) =>
    props.$isToday ? `0 0 0 4px ${props.theme.colors.primary}20` : "none"};
`;

const DayInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const DayTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }
`;

const TodayBadge = styled.span`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: ${(props) => props.theme.borderRadius.md};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DateDisplay = styled.div.withConfig({
  shouldForwardProp: (prop) => !["$isToday", "$isPast"].includes(prop),
})`
  font-size: 1.125rem;
  color: ${(props) => {
    if (props.$isToday) return props.theme.colors.primary;
    if (props.$isPast) return props.theme.colors.text.muted;
    return props.theme.colors.text.secondary;
  }};
  font-weight: 500;
  margin-top: 0.25rem;
`;

const MealGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.md};
  }
`;

const CompletionSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const CompleteButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["$completed"].includes(prop),
})`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: none;
  background-color: ${(props) =>
    props.$completed
      ? props.theme.colors.primary
      : props.theme.colors.gray[700]};
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};

  &:hover {
    background-color: ${(props) =>
      props.$completed
        ? props.theme.colors.primaryHover
        : props.theme.colors.gray[600]};
  }
`;

export const DayModal = ({
  isOpen,
  onClose,
  dayNumber,
  meals,
  date,
  isCompleted,
  onToggleComplete,
}) => {
  const dayIsToday = date ? isToday(date) : false;
  const dayIsPast = date ? isPast(date) : false;

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="900px">
      <ModalHeader>
        <DayNumber
          $completed={isCompleted}
          $isToday={dayIsToday}
          $isPast={dayIsPast}
        >
          {dayNumber}
        </DayNumber>
        <DayInfo>
          <DayTitle>
            Day {dayNumber}
            {dayIsToday && <TodayBadge>Today</TodayBadge>}
          </DayTitle>
          {date && (
            <DateDisplay $isToday={dayIsToday} $isPast={dayIsPast}>
              {formatDateLong(date)}
            </DateDisplay>
          )}
        </DayInfo>
        <CompletionSection>
          <CompleteButton
            $completed={isCompleted}
            onClick={() => onToggleComplete(dayNumber)}
          >
            {isCompleted ? "✓ Completed" : "○ Mark Complete"}
          </CompleteButton>
        </CompletionSection>
      </ModalHeader>

      <MealGrid>
        <MealCard mealType="breakfast" items={meals?.breakfast || []} />
        <MealCard mealType="lunch" items={meals?.lunch || []} />
        <MealCard mealType="snack" items={meals?.snack || []} />
        <MealCard mealType="dinner" items={meals?.dinner || []} />
      </MealGrid>
    </Modal>
  );
};
