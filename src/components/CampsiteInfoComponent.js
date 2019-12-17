import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader,  Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

   function RenderCampsite({campsite})  {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                     <CardBody>
                            <CardText>{campsite.description}</CardText>
                     </CardBody>
                </Card> 
            </div>
       
        );
}
    
    function RenderComments({comments, addComment, campsiteId}) {

        if (comments) {
            return ( 
            <div className="col-md-5 m-1" >
                <h4>Commments</h4>
                {comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.text}<br /></p>
                            <p>{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </p>

                        </div>
                    );
                     
                    })}
                    <CommentForm campsiteId={campsiteId} addComment={addComment} />
             </div>
             
           );
            
        }
        
    return <div />;
    } 
        
class CommentForm extends Component {
    constructor (props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
       
    }

    render (){
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-md"/> Submit comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>
                    Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="group">
                            <div className="group">
                                    <div>
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                    </div>
                                </div>
                                <div className="group">
                                    <Control.select model=".Rating" name="Rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </div>
                            </div>
                            <div className="group">
                                <Label htmlFor="YourName">Your Name</Label>
                                <div className="group">
                                    <Control.text model=".author" id="yourName" name="yourName"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                        <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </div>
                                </div>
                                <div className="group">
                                <Label htmlFor="comment">Comment</Label>
                                <div className="group">
                                    <Control.textarea model=".text" id="comment" name="comment"
                                        rows="8"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            
                                <div className="group">
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </div>
                        
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


    function CampsiteInfo(props) {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        if (props.campsite) {
                return  ( 
                    <div className="container">
                    <div className="row">
                    <div className="col">
                    <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                </div>
                        
                            <div className="row">
                                <RenderCampsite campsite={props.campsite} />
                                <RenderComments 
                                comments={props.comments}
                                addComment={props.addComment}
                                campsiteId={props.campsite.id}
                             />
                
                            </div>
                        </div>
            );
         }
            return <div />;
     }

   
export default CampsiteInfo;