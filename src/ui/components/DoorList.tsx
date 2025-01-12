import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Door } from '@/models/Door';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';

interface DoorListProps {
  doors: Door[];
}

const connectionColor = (door: Door) =>
  door.connectionStatus === 'online' ? 'success.main' : 'error.main';

const columns: GridColDef<Door>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'buildingName',
    headerName: 'Building',
    flex: 1,
  },
  {
    field: 'connectionType',
    headerName: 'Connection type',
    flex: 1,
  },
  {
    field: 'connectionStatus',
    headerName: 'Connection status',
    flex: 1,
    renderCell: ({ row: door }) => {
      return (
        <Typography component="span" color={connectionColor(door)}>
          {door.connectionStatus}
        </Typography>
      );
    },
  },
  {
    field: 'apartmentName',
    headerName: 'Apartment name',
    flex: 1,
    renderCell: ({ row: door }) => {
      return <Typography component="span">{door.apartmentName}</Typography>;
    },
  },
];

export function DoorList({ doors }: DoorListProps) {
  const router = useRouter();

  const onDoorRowClick = useCallback(
    (gridRow: GridRowParams<Door>) => {
      router.push({
        pathname: '/doors/[doorId]',
        query: { doorId: gridRow.id },
      });
    },
    [router],
  );

  return (
    <DataGrid
      hideFooter
      rows={doors}
      columns={columns}
      disableRowSelectionOnClick
      onRowClick={onDoorRowClick}
    />
  );
}
