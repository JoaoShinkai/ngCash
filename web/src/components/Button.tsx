
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';
import { cyan, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

  const ColorButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(cyan[600]),
    backgroundColor: cyan[600],
    '&:hover': {
      backgroundColor: cyan[700],
    },
    ':disabled': {
        backgroundColor: grey[800],
    }
  }));

interface Props {
    title: string;
    loading: boolean;
    onClick?: () => {};
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