import styled from 'styled-components';

export const PaymentStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: sans-serif;
`;

export const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-bottom: 1rem;
  background-color: ${({ color }) => color};
`;

export const StatusText = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
`;

export const DetailsTable = styled.div`
  margin-bottom: 1.5rem;

  table {
    border-collapse: collapse;
    width: 100%;
  }

  td {
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    font-size: 0.875rem;
  }
`;

export const TableLabel = styled.td`
  font-weight: 600;
  color: #6b7280;
  background: #f9fafb;
`;

export const TableContent = styled.td`
  color: #1a1a1a;
  word-break: break-all;
`;

export const ViewDetails = styled.a`
  display: inline-flex;
  align-items: center;
  color: #0055de;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 1rem;
`;

export const RetryButton = styled.a`
  color: #6b7280;
  text-decoration: underline;
  font-size: 0.875rem;
`;