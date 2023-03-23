import React, { useState } from "react";
import { Alert, Card,  } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Icon,
  Col,
} from "../../../components/Component";
import {
  Form,
} from "reactstrap";
import { Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../app/store";
import { UpdateUserAction } from "../../../features/userSlice";
import { useNavigate } from "react-router-dom";


const UserProfileSettingPage = ({ sm, updateSm,user }) => {

  const passForm = useForm();
  const eForm = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [currentUser,setCurrentUser]= useState(user);
  const [loading, setLoading] = useState(false); 
  const [loadingDiff, setLoadingDiff] = useState(false);
   const [errorVal, setError] = useState("");
  const [successVal,setSuccessVal] =useState("");

  const onChangeEmail = async (data) =>{

    setLoadingDiff(true);
    const user = {
      id:currentUser.id,
      email:data?.email
    }

    await dispatch(UpdateUserAction(user)).unwrap().then(()=>{
      setLoadingDiff(false);
      setSuccessVal("Updated Succesfully")
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      setTimeout(() => {
        navigate("/login")
      }, 1000);
  
      // setModal(false);
      // window.location.reload(false);
    }).catch(()=>{
      setError("Email is already taken...");
      setLoadingDiff(false);
    });



  }

  const onChangePassword = async (data) =>{

    setLoading(true);
    const user = {
      id:currentUser.id,
      password:data?.nPassword
    }

    if(data?.nPassword !== data?.cPassword){
      setError("Passwords do not match...");
      setLoading(false);
    }else{
      await dispatch(UpdateUserAction(user)).unwrap().then(()=>{
        setLoading(false);
        setSuccessVal("Updated Succesfully")

        
        
        // setModal(false);
        // window.location.reload(false);
      }).catch(()=>{
        setError("Something went wrong...");
        setLoading(false);
      });
    }

  }




  return (
    <React.Fragment>
      <BlockHead size="lg">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h4">Security Settings</BlockTitle>
            <BlockDes>
              <p>These settings will help you to keep your account secure.</p>
            </BlockDes>
          </BlockHeadContent>
          <BlockHeadContent className="align-self-start d-lg-none">
            <Button
              className={`toggle btn btn-icon btn-trigger mt-n1 ${sm ? "active" : ""}`}
              onClick={() => updateSm(!sm)}
            >
              <Icon name="menu-alt-r"></Icon>
            </Button>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>

      {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> {errorVal}{" "}
                </Alert>
              </div>
            )}
                  
            {successVal && (
              <div className="mb-3">
                <Alert color="success" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> {successVal}{" "}
                </Alert>
              </div>
            )}

      <Block>
        <Card className="card-bordered">
          <div className="card-inner-group">
          <div className="card-inner">
              
              <div className="nk-block-text">
                <h6>Change Email</h6>
                <p>Set a unique email, If you procced to change your email you are required to logout.</p>
                
              </div>
              
              <Form className="row gy-4 " onSubmit={eForm.handleSubmit(onChangeEmail)}
              style={{marginTop: '0px'}}>

                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={currentUser.email}
                        placeholder="Enter email"
                        ref={eForm.register({
                          required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {eForm.errors.email && <span className="invalid">{eForm.errors.email.message}</span>}
                    </div>
                  </Col>

              
  
              <Col size="12">
                  <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                    <li>
                      <Button color="primary" size="md" type="submit">
                        {loadingDiff ? <Spinner size="sm" color="light" /> : "Change Email Address"}
                      </Button>
                    </li>

                    <li>

                    </li>
                    
                      
                  </ul>
                </Col>
                        
              </Form>
          </div>
          </div>
          </Card>
          <div style={{marginTop:5}}></div>
          <Card className="card-bordered">
            
          <div className="card-inner-group">

            <div className="card-inner">
              
                <div className="nk-block-text">
                  <h6>Change Password</h6>
                  <p>Set a unique password to protect your account.</p>
                </div>
                <Form className="row gy-4 " onSubmit={passForm.handleSubmit(onChangePassword)}
                style={{marginTop: '10px'}}>

                <Col md="6">
                    <div className="form-group">
                      <label className="form-label">New Password</label>
                      <input
                        className="form-control"
                        type="password"
                        name="nPassword"
                        defaultValue={""}
                        placeholder="Enter your new password"
                        ref={passForm.register({ required: "This field is required" })}
                      />
                      {passForm.errors.nPassword && <span className="invalid">{passForm.errors.nPassword.message}</span>}
                    </div>
                  </Col>

                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Confirm Password</label>
                      <input
                        className="form-control"
                        type="password"
                        name="cPassword"
                        defaultValue={""}
                        placeholder="Confirm your password"
                        ref={passForm.register({ required: "This field is required" })}
                      />
                      {passForm.errors.cPassword && <span className="invalid">{passForm.errors.cPassword.message}</span>}
                    </div>
                  </Col>

    
                <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          {loading ? <Spinner size="sm" color="light" /> : "Change Password"}
                        </Button>
                      </li>
                      
                        
                    </ul>
                  </Col>
                          
                </Form>
            </div>
          </div>
        </Card>
      </Block>
    </React.Fragment>
  );
};
export default UserProfileSettingPage;
