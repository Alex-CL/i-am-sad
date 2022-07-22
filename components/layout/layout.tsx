import { ReactNode } from 'react'
import Link from 'next/link'
import { Container, Typography, Box, Paper, Icon } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help';

type LayoutProps = {
	children: ReactNode
}

export const Layout = (props: LayoutProps) => {

	const title = {
		textAlign: 'center',
		fontSize: '3rem',
		fontWeight: '400',
	  }

	  const paper = {
		marginTop: '15px',
		marginBottom: 'auto',
		height: '700px',
	  };
	  

	return (
		<div style={{ background: "#F2F2F2", height: "100vh" }}>
			<Container maxWidth="md">
			  <Typography sx={title} gutterBottom>
				Demotivational Quotes
				<Link href="about"><HelpIcon sx={{cursor: 'pointer'}} /></Link>
			  </Typography>
			  <Paper sx={paper}>
			  	{props.children}
			  </Paper>
			</Container>
  		</div>
	)
}
