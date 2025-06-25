// src/components/dashboard/DatePicker.jsx
import styled from "styled-components";
import { Button } from "../ui/Button";

const DatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.gray[800]};
  border: 1px solid ${(props) => props.theme.colors.gray[700]};
  border-radius: ${(props) => props.theme.borderRadius.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const DateLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  white-space: nowrap;
`;

const DateInput = styled.input`
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  background-color: ${(props) => props.theme.colors.gray[900]};
  border: 1px solid ${(props) => props.theme.colors.gray[600]};
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 500;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`;

const TodayButton = styled(Button)`
  font-size: 0.75rem;
  padding: 0.5rem 0.75rem;
`;

export const DatePicker = ({ startDate, onStartDateChange }) => {
  const handleDateChange = (e) => {
    onStartDateChange(e.target.value);
  };

  const setToday = () => {
    const today = new Date().toISOString().split("T")[0];
    onStartDateChange(today);
  };

  return (
    <DatePickerContainer>
      <DateLabel htmlFor="start-date">Start Date:</DateLabel>
      <DateInput
        id="start-date"
        type="date"
        value={startDate}
        onChange={handleDateChange}
      />
      <TodayButton variant="outline" size="sm" onClick={setToday}>
        Today
      </TodayButton>
    </DatePickerContainer>
  );
};
