import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        width: '100%',
        backgroundColor: '#6b7280',
        color: '#fff',
        fontSize: '0.70rem',
        fontWeight: '400',
        padding: '5px 4px',
        borderRadius: '7px',
        letterSpacing: '0.1px',
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: '#6b7280',
    },
});

export default CustomTooltip;
