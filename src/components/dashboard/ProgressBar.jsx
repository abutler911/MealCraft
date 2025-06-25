// src/components/dashboard/ProgressBar.jsx
import styled from "styled-components";

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const ProgressTrack = styled.div`
  width: 120px;
  height: 8px;
  background-color: ${(props) => props.theme.colors.gray[700]};
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: ${(props) => props.theme.colors.primary};
  transition: width ${(props) => props.theme.transitions.normal};
  border-radius: 4px;
`;

const ProgressText = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  min-width: 40px;
`;

const ProgressLabel = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.text.muted};
  text-align: right;
`;

export const ProgressBar = ({ completed, total, label }) => {
  const percentage = (completed / total) * 100;

  return (
    <div>
      {label && <ProgressLabel>{label}</ProgressLabel>}
      <ProgressContainer>
        <ProgressTrack>
          <ProgressFill percentage={percentage} />
        </ProgressTrack>
        <ProgressText>
          {completed}/{total}
        </ProgressText>
      </ProgressContainer>
    </div>
  );
};
