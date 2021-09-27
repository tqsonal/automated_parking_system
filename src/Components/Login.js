import React, { Component } from "react";
import "./ParkCar.css";

var that;
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DefaultParked: '',
      ParkingLength: '',
      DefaultParkingError: '',
      ParkingLengthError:''
    };
    that=this;
  }
  submithandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validForm = () => {
    var isValid = false;
    if(this.state.ParkingLength==''){
      this.setState({
          ParkingLengthError:'please enter the valid number for slot length'
      })
      isValid=false;
          }
          else{
            this.setState({
              ParkingLengthError:''
          })
          isValid=true;
          }
    
    if(Number(this.state.ParkingLength)<Number(this.state.DefaultParked )) {
      // console.log("parking size"+this.state.ParkingLength)
      // console.log("default"+this.state.DefaultParked)

      // alert('in if')

      this.setState({
        DefaultParkingError: "Parked cars count should not be greater than parking slot length",
      
      });

      isValid = false;
    }
    
    
          else{
              this.setState({
                  DefaultParkingError:''
              })
              isValid=true;
          }
    return isValid;
  };

  submitData = (e) => {
    e.preventDefault()


    const isvalid= this.validForm();
    // alert(" i am from submit "+isvalid)

      if(isvalid===true){
// alert(isvalid+"called from login")
        that.props.history.push({pathname:'/main',state:{parkingSize:this.state.ParkingLength,DefaultParked:this.state.DefaultParked}})
        // this.props.history.push('/main')
      
      }

    };

  render() {
    return (
        <>
        
        <header className="header shadow mt-2">
          <div class="header-content d-flex justify-content-center p-2">
            <div className="ml-5 align-self-center heading_n">
              Welcome to Automated Parking System{" "}
            </div>
          </div>
        </header>
      <div className="container mt-5">

        <form class="w-50 mx-auto mt-3" autoComplete="off">
          <div class="form-group">
            <label for="owner">No of Parking lots to be available:</label>
            <input
              type="number"
              class="form-control rounded-1 shadow-sm"
              name="ParkingLength"
              placeholder="Enter the count of total slots you want"
              value={this.state.ParkingLength}
              onChange={this.submithandler}
            />
          <span style={{ color: "red" }}> {this.state.ParkingLengthError}</span>

          </div>
          <div class="form-group">
            <label for="owner">Parked cars count:</label>
            <input
              type="number"
              class="form-control rounded-1 shadow-sm"
              name="DefaultParked"
              placeholder="How many cars are already parked"
              value={this.state.DefaultParked}
              onChange={this.submithandler}
            />
          </div>
          <span style={{ color: "red" }}> {this.state.DefaultParkingError}</span>

          <button
            type="submit"
            class="btn mx-auto d-block mt-2 rounded-0 shadow "
            id="btnOne"
            onClick={this.submitData}
          >
            Create Parking
          </button>
        </form>
      </div>
      </>

    );
  }
}

export default Login;
