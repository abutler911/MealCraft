import styled from "styled-components";
import { Card, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";
import { formatDate, isToday, isPast } from "../../utils/dateHelpers";

const DayNumber = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$completed", "$isToday", "$isPast"].includes(prop),
})`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
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
  transition: all ${(props) => props.theme.transitions.fast};
  border: ${(props) =>
    props.$isToday ? `2px solid ${props.theme.colors.primary}` : "none"};
  box-shadow: ${(props) =>
    props.$isToday ? `0 0 0 3px ${props.theme.colors.primary}20` : "none"};
`;

const Flex = styled.div.withConfig({
  shouldForwardProp: (prop) => !["$gap"].includes(prop),
})`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$gap || "0.75rem"};
`;

const DayInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const DayTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
`;

const DateDisplay = styled.div.withConfig({
  shouldForwardProp: (prop) => !["$isToday", "$isPast"].includes(prop),
})`
  font-size: 0.875rem;
  color: ${(props) => {
    if (props.$isToday) return props.theme.colors.primary;
    if (props.$isPast) return props.theme.colors.text.muted;
    return props.theme.colors.text.secondary;
  }};
  font-weight: 500;
  margin-top: 0.125rem;
`;

const TodayBadge = styled.span`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 0.125rem 0.375rem;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

const MealPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${(props) => props.theme.spacing.xs};
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.text.muted};

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MealPreviewItem = styled.div`
  padding: 0.25rem 0.5rem;
  background-color: ${(props) => props.theme.colors.gray[800]};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  text-align: center;
`;

const CompleteButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["$completed"].includes(prop),
})`
  padding: 0.5rem;
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: none;
  border: none;
  color: ${(props) =>
    props.$completed
      ? props.theme.colors.primary
      : props.theme.colors.text.muted};
  transition: all ${(props) => props.theme.transitions.fast};
  cursor: pointer;
  font-size: 1.25rem;

  &:hover {
    color: ${(props) =>
      props.$completed
        ? props.theme.colors.primaryHover
        : props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.gray[800]};
  }
`;

export const DayCard = ({
  dayNumber,
  meals,
  isCompleted,
  onOpenModal,
  onToggleComplete,
  date,
}) => {
  const dayIsToday = date ? isToday(date) : false;
  const dayIsPast = date ? isPast(date) : false;

  return (
    <Card $completed={isCompleted} $hover={true}>
      <CardHeader>
        <Flex $gap="12px">
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
                {formatDate(date)}
              </DateDisplay>
            )}
          </DayInfo>
        </Flex>
        <Flex $gap="8px">
          <CompleteButton
            $completed={isCompleted}
            onClick={() => onToggleComplete(dayNumber)}
            title={isCompleted ? "Mark incomplete" : "Mark complete"}
          >
            {isCompleted ? "✓" : "○"}
          </CompleteButton>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onOpenModal(dayNumber)}
          >
            📋 View Meals
          </Button>
        </Flex>
      </CardHeader>

      <MealPreview>
        <MealPreviewItem>🍳 {meals?.breakfast?.length || 0}</MealPreviewItem>
        <MealPreviewItem>🥗 {meals?.lunch?.length || 0}</MealPreviewItem>
        <MealPreviewItem>🥜 {meals?.snack?.length || 0}</MealPreviewItem>
        <MealPreviewItem>🍽️ {meals?.dinner?.length || 0}</MealPreviewItem>
      </MealPreview>
    </Card>
  );
};
