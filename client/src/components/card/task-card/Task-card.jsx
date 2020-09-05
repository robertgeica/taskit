import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './Task-card.styles.scss';

const TaskCard = ({ title, description, task_id, status, deadline,handleOpenTaskModal,setCardId, card_id, setCurrentTask, task}) => {
  return (<CardActions
	onClick={()=>{
		handleOpenTaskModal();
    setCurrentTask(task);
	}}
	>
    <Card className="task-card" key={task._id}>
      <CardContent>
        <div className="task-header">
        <Typography className="status" component="p">
        	{status}
        </Typography>
        <Typography className="deadline" component="p">
          {deadline}
        </Typography>
        </div>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography gutterBottom className="date" component="p">
          {task.createdAt}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{task.allocatedTo}
					</Typography>
      </CardContent>
      
    </Card>
	</CardActions>
  );
};

export default TaskCard;
