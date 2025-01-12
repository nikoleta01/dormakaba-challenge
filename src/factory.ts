import { ConnectionStatus } from './models/ConnectionStatus';
import { ConnectionType } from './models/ConnectionType';
import { Door } from './models/Door';
import { faker } from '@faker-js/faker';

export function buildDoor(door?: Partial<Door>) {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    buildingName: faker.lorem.words(2),
    connectionType: faker.helpers.enumValue(ConnectionType),
    connectionStatus: faker.helpers.enumValue(ConnectionStatus),
    lastConnectionStatusUpdate: faker.date.past().toISOString(),
    apartmentName: `Apartment ${faker.number.int(1000)}`,
    ...door,
  };
}
