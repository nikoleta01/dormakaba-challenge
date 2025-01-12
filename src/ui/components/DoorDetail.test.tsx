import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DoorDetail } from './DoorDetail';
import { buildDoor } from '@/factory';
import { Door } from '@/models/Door';

function renderDoorDetail(door: Door) {
  return render(<DoorDetail door={door} />);
}

describe('DoorDetail', () => {
  it('should render door details', () => {
    const door = buildDoor();
    renderDoorDetail(door);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText(door.id)).toBeInTheDocument();

    expect(screen.getByText('Building')).toBeInTheDocument();
    expect(screen.getByText(door.buildingName)).toBeInTheDocument();

    expect(screen.getByText('Connection type')).toBeInTheDocument();
    expect(screen.getByText(door.connectionType)).toBeInTheDocument();

    expect(screen.getByText('Connection status')).toBeInTheDocument();
    expect(screen.getByText(door.connectionStatus)).toBeInTheDocument();

    expect(screen.getByText('Apartment name')).toBeInTheDocument();
    expect(screen.getByText(door.apartmentName)).toBeInTheDocument();
  });
  it('applies green color to connection status online', () => {
    const door = buildDoor({
      connectionStatus: 'online',
    });
    renderDoorDetail(door);

    const connectionStatusElement = screen.getByText(door.connectionStatus);
    expect(connectionStatusElement).toHaveStyle('color: rgb(46, 125, 50)');
  });
  it('applies red color to connection status offline', () => {
    const door = buildDoor({
      connectionStatus: 'offline',
    });
    renderDoorDetail(door);

    const connectionStatusElement = screen.getByText(door.connectionStatus);
    expect(connectionStatusElement).toHaveStyle('color: rgb(211, 47, 47)');
  });
});
