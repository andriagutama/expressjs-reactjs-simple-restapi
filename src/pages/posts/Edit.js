import { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

function PostEdit() {
	//state
	const [ title, setTitle ] = useState('');
	const [ content, setContent ] = useState('');

	//state validation
	const [ validation, setValidation ] = useState({});

	//history
	const history = useHistory();

	//get id from params
	const { id } = useParams();

	//hook useEffect
	useEffect(() => {
		getPostByID();
	}, []);

	//function getPostByID
	const getPostByID = async() => {
		//fetch data
		const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
		//get response
		const data = await response.data.data;

		//assign data to state
		setTitle(data.title);
		setContent(data.content);
	};

	//function updatePost
	const updatePost = async(e) => {
		e.preventDefault();

		//send data to server
		await axios.patch(`http://localhost:3000/api/posts/update/${id}`, {
			title : title,
			content : content,
		}).then(() => {
			//redirect
			history.push('/posts');
		}).catch((error) => {
			//assign validation on state
			setValidation(error.response.data);
		});
	};

	return (
		<Container className='mb-3'>
			<Row>
				<Col md='{12}'>
					<Card className='border-0 rounded shadow-sm'>
						<Card.Body>
							{
								validation.errors &&
									<Alert variant='danger'>
										<ul className='mt-0 mb-0'>
											{
												validation.errors.map((error, index) => (
													<li key={index}>{ `${error.param}` } : { `${error.msg}` }</li>
												))
											}
										</ul>
									</Alert>
							}

							<Form onSubmit={updatePost}>
								<Form.Group className='mb-3' controlId='formBasicEmail'>
									<Form.Label>Title</Form.Label>
									<Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
								</Form.Group>

								<Form.Group className='mb-3' controlId='formBasicPassword'>
									<Form.Label>Content</Form.Label>
									<Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content' />
								</Form.Group>

								<Button variant='primary' type='submit'>Update</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default PostEdit;