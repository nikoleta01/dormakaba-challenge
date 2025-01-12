import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useGetDoorByIdQuery } from '@/ui/apiSlice';
import { buildDoor } from '@/factory';
import DoorDetailPage from './[doorId]';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/ui/apiSlice', () => ({
  useGetDoorByIdQuery: jest.fn(),
}));

function renderDoorDetailPage() {
  return render(<DoorDetailPage />);
}

(useRouter as jest.Mock).mockReturnValue({ query: {} });
describe('DoorDetailPage', () => {
  it('renders heading', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { doorId: '1' },
    });
    const door1 = buildDoor({
      id: '1',
      name: 'New Building',
    });

    (useGetDoorByIdQuery as jest.Mock).mockReturnValue({
      data: door1,
      isSuccess: true,
    });

    renderDoorDetailPage();
    expect(screen.getByText(/new building/i)).toBeInTheDocument();
  });
  it('does not render door details when data is not fetched', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { doorId: '1' },
    });

    (useGetDoorByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isSuccess: false,
      isError: true,
    });

    renderDoorDetailPage();

    expect(screen.queryByText(/new building/i)).not.toBeInTheDocument();
  });
});
