import styled from "styled-components";
import { Button } from "../ui/Button";
import { useState } from "react";

const DatePickerCard = styled.div`
  background-color: ${(props) => props.theme.colors.gray[900]};
  border: 1px solid ${(props) => props.theme.colors.gray[700]};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  padding: ${(props) => props.theme.spacing.lg};
  transition: all ${(props) => props.theme.transitions.normal};
  overflow: hidden;
  width: 100%;
  min-width: 350px;

  &:hover {
    border-color: ${(props) => props.theme.colors.gray[600]};
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

const CompactHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};

  &:hover {
    background-color: ${(props) => props.theme.colors.gray[800]};
    border-radius: ${(props) => props.theme.borderRadius.md};
  }
`;

const CompactLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  flex: 1;
`;

const CalendarIcon = styled.span`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.md};
  flex-shrink: 0;
`;

const CompactText = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const CompactTitle = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  white-space: nowrap;
`;

const CompactDate = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.text.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text.muted};
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  transition: all ${(props) => props.theme.transitions.fast};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.gray[800]};
  }
`;

const ExpandedContent = styled.div`
  padding-top: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.md};
  border-top: 1px solid ${(props) => props.theme.colors.gray[700]};
  animation: ${(props) => (props.isVisible ? "slideDown" : "slideUp")}
    ${(props) => props.theme.transitions.normal};

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;

const DateControls = styled.div`
  display: flex;
  align-items: end;
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${(props) => props.theme.spacing.md};
  }
`;

const DateInputWrapper = styled.div`
  flex: 1;
  min-width: 200px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    min-width: unset;
  }
`;

const DateLabel = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 0.375rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DateInput = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.gray[800]};
  border: 2px solid ${(props) => props.theme.colors.gray[600]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1rem;
  font-weight: 500;
  transition: all ${(props) => props.theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.gray[500]};
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    transition: all ${(props) => props.theme.transitions.fast};

    &:hover {
      background-color: ${(props) => props.theme.colors.gray[700]};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.xs};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const ActionButton = styled(Button)`
  font-size: 0.875rem;
  white-space: nowrap;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex: 1;
    max-width: 120px;
  }
`;

const DatePreview = styled.div`
  margin-top: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.gray[800]};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border-left: 4px solid ${(props) => props.theme.colors.primary};
`;

const PreviewText = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0;

  strong {
    color: ${(props) => props.theme.colors.primary};
    font-weight: 600;
  }
`;

const formatDateForDisplay = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateCompact = (dateString) => {
  if (!dateString) return "No date selected";
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const getDateStatus = (dateString) => {
  if (!dateString) return "";
  const today = new Date();
  const selectedDate = new Date(dateString + "T00:00:00");
  const diffTime = selectedDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Starting today";
  if (diffDays === 1) return "Starting tomorrow";
  if (diffDays > 1) return `Starting in ${diffDays} days`;
  if (diffDays === -1) return "Started yesterday";
  if (diffDays < -1) return `Started ${Math.abs(diffDays)} days ago`;
  return "";
};

export const DatePicker = ({ startDate, onStartDateChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDateChange = (e) => {
    onStartDateChange(e.target.value);
  };

  const setToday = () => {
    const today = new Date().toISOString().split("T")[0];
    onStartDateChange(today);
  };

  const clearDate = () => {
    onStartDateChange("");
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const dateStatus = getDateStatus(startDate);
  const formattedDate = formatDateForDisplay(startDate);
  const compactDate = formatDateCompact(startDate);

  return (
    <DatePickerCard>
      <CompactHeader onClick={toggleExpanded}>
        <CompactLeft>
          <CalendarIcon>📅</CalendarIcon>
          <CompactText>
            <CompactTitle>Start Date</CompactTitle>
            <CompactDate>{compactDate}</CompactDate>
          </CompactText>
        </CompactLeft>
        <ExpandButton>
          {isExpanded ? "Collapse" : "Change"}
          <span
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 200ms ease-in-out",
            }}
          >
            ▼
          </span>
        </ExpandButton>
      </CompactHeader>

      {isExpanded && (
        <ExpandedContent isVisible={isExpanded}>
          <DateControls>
            <DateInputWrapper>
              <DateLabel htmlFor="start-date">Select Date</DateLabel>
              <DateInput
                id="start-date"
                type="date"
                value={startDate}
                onChange={handleDateChange}
                placeholder="Choose your start date"
              />
            </DateInputWrapper>

            <ButtonGroup>
              <ActionButton variant="outline" size="sm" onClick={setToday}>
                📍 Today
              </ActionButton>
              {startDate && (
                <ActionButton variant="secondary" size="sm" onClick={clearDate}>
                  🗑️ Clear
                </ActionButton>
              )}
            </ButtonGroup>
          </DateControls>

          {startDate && (
            <DatePreview>
              <PreviewText>
                Your meal plan will begin on <strong>{formattedDate}</strong>
                {dateStatus && (
                  <>
                    {" • "}
                    <strong>{dateStatus}</strong>
                  </>
                )}
              </PreviewText>
            </DatePreview>
          )}
        </ExpandedContent>
      )}
    </DatePickerCard>
  );
};
