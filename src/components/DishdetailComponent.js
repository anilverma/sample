import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'


function RenderDish({ dish }) {
    return (
        <div>
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

function RenderComments({ comments }) {
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
            <div>
                <h4>Comments</h4>
                <div>{comms}</div>
            </div>

        );
    }
    else {
        return (
            <div></div>
        )
    }
}

const DishDetail = (props) => {

    const dish = props.dish;

    if (dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish= {dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={dish.comments}/>
                    </div>
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