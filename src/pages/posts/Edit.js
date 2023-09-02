import { Card, Container, Row, Col } from 'react-bootstrap';

function PostEdit() {
	return (
		<Container className='mt-3'>
			<Row>
				<Col md="{12}">
					<Card className='border-0 rounded shadow-sm'>
						<Card.Body>
							Halaman Edit Post
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default PostEdit;