import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Door } from '@/models/Door';
import { DoorList } from './DoorList';
import { buildDoor } from '@/factory';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

(useRouter as jest.Mock).mockReturnValue({ query: {} });

function renderDoorList(doors: Door[]) {
  return render(<DoorList doors={doors} />);
}

describe('DoorList', () => {
  it('redirects to door detail on row click', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    const door1 = buildDoor({
      id: '1',
      name: 'New Building',
    });
    const door2 = buildDoor({
      id: '2',
      name: 'Old Building',
    });

    renderDoorList([door1, door2]);

    const gridCell = screen.getByRole('gridcell', { name: 'New Building' });
    fireEvent.click(gridCell);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/doors/[doorId]',
      query: { doorId: '1' },
    });
  });
  it('renders the door list with proper data', () => {
    const door1 = buildDoor({
      name: 'Front Door',
      buildingName: 'Building A',
      connectionType: 'wired',
      connectionStatus: 'online',
      apartmentName: 'Apartment 1A',
    });
    const door2 = buildDoor({
      name: 'Back Door',
      buildingName: 'Building B',
      connectionType: 'wireless',
      connectionStatus: 'offline',
      apartmentName: 'Apartment 2B',
    });
    renderDoorList([door1, door2]);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Building')).toBeInTheDocument();
    expect(screen.getByText('Connection type')).toBeInTheDocument();
    expect(screen.getByText('Connection status')).toBeInTheDocument();
    expect(screen.getByText('Apartment name')).toBeInTheDocument();

    expect(screen.getByText('Front Door')).toBeInTheDocument();
    expect(screen.getByText('Building A')).toBeInTheDocument();
    expect(screen.getByText('wired')).toBeInTheDocument();
    expect(screen.getByText('online')).toBeInTheDocument();
    expect(screen.getByText('Apartment 1A')).toBeInTheDocument();

    expect(screen.getByText('Back Door')).toBeInTheDocument();
    expect(screen.getByText('Building B')).toBeInTheDocument();
    expect(screen.getByText('wireless')).toBeInTheDocument();
    expect(screen.getByText('offline')).toBeInTheDocument();
    expect(screen.getByText('Apartment 2B')).toBeInTheDocument();
  });
  it('renders connection status with correct color', () => {
    const door1 = buildDoor({
      connectionStatus: 'online',
    });
    const door2 = buildDoor({
      connectionStatus: 'offline',
    });
    renderDoorList([door1, door2]);

    const onlineStatus = screen.getByText('online');
    const offlineStatus = screen.getByText('offline');

    expect(onlineStatus).toHaveStyle('color: rgb(46, 125, 50)');
    expect(offlineStatus).toHaveStyle('color: rgb(211, 47, 47)');
  });
});
