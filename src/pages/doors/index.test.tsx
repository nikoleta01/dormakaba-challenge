import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/ui/store';
import DoorListPage from './index';
import { useRouter } from 'next/router';
import { useGetAllDoorsQuery } from '@/ui/apiSlice';
import { buildDoor } from '@/factory';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/ui/apiSlice', () => ({
  ...jest.requireActual('@/ui/apiSlice'),
  useGetAllDoorsQuery: jest.fn(),
}));

function renderDoorListPage() {
  return render(
    <Provider store={store}>
      <DoorListPage />
    </Provider>,
  );
}

(useRouter as jest.Mock).mockReturnValue({ query: {} });
describe('DoorListPage', () => {
  it('renders heading', () => {
    const door1 = buildDoor({});
    const door2 = buildDoor({});

    (useGetAllDoorsQuery as jest.Mock).mockReturnValue({
      data: [door1, door2],
      isSuccess: true,
    });
    renderDoorListPage();
    expect(screen.getByRole('heading', { name: 'Doors' })).toBeInTheDocument();
  });
  it('renders door list', () => {
    const door1 = buildDoor({
      buildingName: 'Main Building',
    });
    const door2 = buildDoor({
      buildingName: 'Annex',
    });

    (useGetAllDoorsQuery as jest.Mock).mockReturnValue({
      data: [door1, door2],
      isSuccess: true,
    });

    renderDoorListPage();

    expect(screen.getByText('Main Building')).toBeInTheDocument();
    expect(screen.getByText('Annex')).toBeInTheDocument();
  });
  it('handles failed door list query', () => {
    (useGetAllDoorsQuery as jest.Mock).mockReturnValue({
      data: null,
      isSuccess: false,
      isError: true,
    });

    renderDoorListPage();

    expect(screen.getByRole('heading', { name: 'Doors' })).toBeInTheDocument();
    expect(screen.queryByText('New Building')).not.toBeInTheDocument();
  });
});
