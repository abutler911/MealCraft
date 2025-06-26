import styled from "styled-components";
import { Modal } from "../ui/Modal";
import { MealCard } from "./MealCard";
import { formatDateLong, isToday, isPast } from "../../utils/dateHelpers";

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  padding-bottom: ${(props) => props.theme.spacing.lg};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[700]};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
    gap: ${(props) => props.theme.spacing.md};
    padding-bottom: ${(props) => props.theme.spacing.md};
    margin-bottom: ${(props) => props.theme.spacing.lg};
  }
`;

const DayNumber = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$completed", "$isToday", "$isPast"].includes(prop),
})`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.75rem;
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
  flex-shrink: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
`;

const DayInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    align-items: center;
    text-align: center;
  }
`;

const DayTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  flex-wrap: wrap;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 1.875rem;
    justify-content: center;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.xs};
  }
`;

const TodayBadge = styled.span`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.375rem 0.75rem;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 0.6875rem;
    padding: 0.25rem 0.5rem;
  }
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
  margin-top: 0.5rem;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 1rem;
    margin-top: 0.375rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;

const MealGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${(props) => props.theme.spacing.lg};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    gap: ${(props) => props.theme.spacing.md};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.md};
  }
`;

const CompletionSection = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100%;
    justify-content: center;
  }
`;

const CompleteButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["$completed"].includes(prop),
})`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.lg};
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
  white-space: nowrap;
  min-height: 44px;

  &:hover {
    background-color: ${(props) =>
      props.$completed
        ? props.theme.colors.primaryHover
        : props.theme.colors.gray[600]};
    transform: translateY(-1px);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: ${(props) => props.theme.spacing.md}
      ${(props) => props.theme.spacing.xl};
    font-size: 1rem;
    min-width: 200px;
    justify-content: center;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
    max-width: 280px;
    padding: ${(props) => props.theme.spacing.md};
  }
`;

const MobileOptimizedModal = styled(Modal)`
  .modal-content {
    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
      margin: 1rem;
      max-height: calc(100vh - 2rem);
      border-radius: ${(props) => props.theme.borderRadius.xl};
    }
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
    <MobileOptimizedModal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      maxWidth="1000px"
    >
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
    </MobileOptimizedModal>
  );
};
