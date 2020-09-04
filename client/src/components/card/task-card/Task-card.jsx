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

const TaskCard = ({
	title,
	description,
	task_id,
	status,
	deadline,
	handleOpenTaskModal,
	setCardId,
	card_id,
	setCurrentTask,
	task,
	allocatedTo
}) => {
	return (
		<CardActions
			onClick={() => {
				handleOpenTaskModal();
				setCurrentTask(task);
				setCardId(card_id);
			}}
		>
			<Card className="task-card" key={task._id}>
				<CardContent>
					<Typography className="date" component="p">
						{status}
					</Typography>
					<Typography className="date" component="p">
						Deadline: <br /> {deadline}
					</Typography>
					<Typography gutterBottom variant="h5" component="h2">
						{title}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{description}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{allocatedTo}
					</Typography>
				</CardContent>
			</Card>
		</CardActions>
	);
};

export default TaskCard;
