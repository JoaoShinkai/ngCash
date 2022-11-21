
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

  const ColorButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    color: 'white',
    backgroundColor: '#1976D2',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
    ':disabled': {
        backgroundColor: grey[800],
    }
  }));

interface Props {
    title: string;
    loading: boolean;
    onClick?: () => Promise<void>;
}
  
export default function CustomizedButtons({title, loading, onClick}: Props) {
    return (
        <Stack spacing={2} direction="row" className='my-4'>
            <ColorButton
                variant="contained"
                loading={loading}
                onClick={onClick}
            >
                {title}
            </ColorButton>
        </Stack>
    );
}