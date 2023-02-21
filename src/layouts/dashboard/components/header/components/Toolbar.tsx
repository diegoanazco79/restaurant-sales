import { styled } from '@mui/material/styles';
import { Toolbar } from '@mui/material';

import { HEADER_MOBILE, HEADER_DESKTOP } from 'theme/helpers/constants';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default StyledToolbar