import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';


export default function ActionAreaCard() {
  return (
    <>
     <Card sx={{ minWidth: 345 }} 
    
     >
      <CardActionArea >
        <CardContent>
            <InsertChartOutlinedIcon
            className='text-red-400'
            />
          <Typography gutterBottom variant="h5" component="div">
           Traffic
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            34573764874
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>

    <Card sx={{ minWidth: 345 }} >
      <CardActionArea>
        <CardContent>
            <DonutLargeOutlinedIcon
            className='text-orange-400 '
            />
          <Typography gutterBottom variant="h5" component="div">
           New Users
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            34573764874
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ minWidth: 345 }} >
      <CardActionArea>
        <CardContent>
            <GroupsOutlinedIcon
            className='text-yellow-400 '
            />
          <Typography gutterBottom variant="h5" component="div">
           Sales
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            34573764874
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ minWidth: 345, borderBlockStartColor: "royalblue" }} >
      <CardActionArea>
        <CardContent>
            <PercentOutlinedIcon
            className='text-blue-400'
            />
          <Typography gutterBottom variant="h5" component="div">
           Performance
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            34573764874
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
    </>
   
    
  );
}
