import { Card, Container, Row, Col, Button, Table } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

function PostIndex() {
	//define state
	const [ posts, setPosts ] = useState([]);
	//useEffect hook
	useEffect(() => {
		fetchData();
	}, []);

	//function fetchdata
	const fetchData = async() => {
		//fetch data
		const response = await axios.get('http://localhost:3000/api/posts');
		//get response
		const data = await response.data.data;

		//assign response to state "posts"
		setPosts(data);
	}

	return (
		<Container className='mt-3'>
			<Row>
				<Col md="{12}">
					<Card className='border-0 rounded shadow-sm'>
						<Card.Body>
							<Button as={Link} to="/posts/create" variant='success' className='mb-3'>Add Post</Button>
							<Table striped bordered hover className='mb-1'>
								<thead>
									<tr>
										<th>NO</th>
										<th>TITLE</th>
										<th>CONTENT</th>
										<th>ACTION</th>
									</tr>
								</thead>
								<tbody>
									{posts.map((post, index) => (
										<tr key={post.id}>
											<td>{index+1}</td>
											<td>{post.title}</td>
											<td>{post.content}</td>
											<td className='text-center'></td>
										</tr>
									))}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default PostIndex;