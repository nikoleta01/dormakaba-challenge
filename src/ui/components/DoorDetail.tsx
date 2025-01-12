import Typography from '@mui/material/Typography';
import { Door } from '@/models/Door';
import { DetailPageContainer } from '@/ui/layout/DetailPageContainer';
import { DetailPageItem } from '@/ui/layout/DetailPageItem';

interface DoorDetailProps {
  door: Door;
}

export function DoorDetail({ door }: DoorDetailProps) {
  const connectionColor =
    door.connectionStatus === 'online' ? 'success.main' : 'error.main';
  return (
    <DetailPageContainer>
      <DetailPageItem label="ID">
        <Typography>{door.id}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Building">
        <Typography>{door.buildingName}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Connection type">
        <Typography>{door.connectionType}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Connection status">
        <Typography color={connectionColor}>{door.connectionStatus}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Apartment name">
        <Typography>{door.apartmentName}</Typography>
      </DetailPageItem>
    </DetailPageContainer>
  );
}
