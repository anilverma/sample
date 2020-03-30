import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Row, Label, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
function RenderDish({ dish }) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

class RenderComments extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isModalOpen: false
        };

    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    handleSubmit(values) {
        this.toggleModal();
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }
    render() {
        const comments = this.props.comments;
        if (comments != null) {
            const comms = comments.map((comment, i) => {
                const date = new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(Date.parse(comment.date)))

                return (
                    <ul key={comment.id} className="list-unstyled">
                        <li className="comment">{comment.comment}</li>
                        <li className="author">-- {comment.author}, {date}</li>
                    </ul>
                );
            })
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <div>{comms}</div>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-mg">Submit Comment</span>
                    </Button>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                    <Col md={10}>
                                        <Control.select model=".rating" name="rating" className="form-control" >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="author" md={2}>Your name</Label>
                                    <Col md={10}>
                                        <Control.text model=".author" id="author" name="author" placeholder="Author" className="form-control" validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} />
                                        <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less' }} />
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="feedback" md={2}>Your feedback</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" validators={{ required }} />
                                        <Errors className="text-danger" model=".comment" show="touched" messages={{ required: 'Required' }} />
                                    </Col>
                                </Row>

                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>


            );
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

const DishDetail = (props) => {

    const dish = props.dish;

    if (dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link> </BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3> {dish.name} </h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={dish} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        )

    } else {
        return (
            <div></div>
        )
    }
}



export default DishDetail;