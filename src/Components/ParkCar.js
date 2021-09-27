import React, { Component } from "react";
import car_pic from "../parking.svg";
import AlotDefaultParking from "./AlotDefaultParking.js";
import "./ParkCar.css";
class ParkCar extends Component {
  constructor(props) {
    super(props);
    const {parkingSize,defaultParked}=this.props.history.location.state;

console.log(parkingSize)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = mm + "-" + dd + "-" + yyyy;


    this.state = {
      ownerName: "",
      carName: "",
      numberPlate: "",
      entryDate: new Date(),
      curDate: '',
      NameError: "",
      carError: "",
      numberPlateError: "",
      DateError: "",
      car_alotted: 0,
      color: "",
      carColorError: "",
      refereshed_details:[],
      SearchItem:'',
      parkingSize:parkingSize,
      defaultParked:defaultParked,
      NodataError:''
    };
    console.log(this.state.parkingSize)
  }

  submithandler = (e) => {
    console.log("called")
    const value =
      e.target.name == "numberPlate"
        ? e.target.value.toUpperCase()
        : e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  };

  validForm = () => {
    var isValid = true;
    // console.log()

    // alert("submitData called")

    if (this.state.ownerName.length == 0) {
      this.setState({ NameError: "Owner Name Should Not Be Blank" ,
     
    });
      isValid = false;
    } else if (this.state.ownerName.length <= 1) {
      this.setState({
        NameError: "Owner Name Should be greater than atleast 1 character",
       });
      isValid = false;
    } 
    else if (this.state.ownerName.match(/[0-9]/)!=null){
      this.setState({ NameError: " name should not contain number " });
      isValid = false;
    }
    else {
      this.setState({ NameError: "" });
      isValid = true;
    }
    
    if (this.state.carName.length === 0) {
      this.setState({ carError: "Car Name Should Not Be Blank",
          });
      isValid = false;
    } else if (this.state.carName.length <= 1) {
      this.setState({
        carError: "Car Name Should be greater than 1 character",
     
      });
      isValid = false;
    } else if (this.state.carName.length > 0) {
      this.setState({ carError: "" });
      isValid = true;
    }


    if (
      !this.state.numberPlate.match(/^[a-zA-Z]{1,3}-[0-9]{2}-[a-zA-Z]{1,2}-[0-9]{1,4}/)

    ) {
      this.setState({
        numberPlateError: "Entered car number plate is not valid",

      });
      isValid = false;
      console.log(isValid)
    } 
    else
     {    
      this.setState({ numberPlateError: "" });
      isValid = true;
      console.log("if of pattern called"+isValid);
      
    }
   
 if (this.state.color == "" || this.state.color==undefined ) {
  this.setState({
    carColorError: "Please entere valid car color",
       
  });
  isValid = false;
} else {
  this.setState({
    carColorError: ""
  });
  isValid = true;
}
   
    return isValid;
  };

  dynamicSearch=(e)=>{


    this.setState({
      SearchItem: e.target.value,
      NodataError:''
    },()=>this.searchData());
  

    // this.renderCarParkedDeatil() 
}

searchData=()=>{
  // e.preventDefault();
  // console.log(this.state.SearchItem+" ")

  let arr=JSON.parse(sessionStorage.getItem('car_parked'));
  // console.log("start array")
// console.log(arr)
  if(this.state.SearchItem=="default")
  {
    this.setState({
      refereshed_details:arr,
      NodataError:''
    })
  }
  else{
    let temparr= arr.filter(a=>a.color.toLowerCase().includes(this.state.SearchItem))
    // console.log("temp array")
    // console.log(temparr)
  // let arr_updated=JSON.parse(sessionStorage.getItem('car_parked'));
  if(temparr.length==0){
    this.setState({
      NodataError:'no data to display'

    })
  }
  else{
    this.setState({
      refereshed_details:temparr
    })
  }
 
  


  // if(this.state.SearchItem=='default'){
  //   this.setState({
  //     NodataError:'no data to display',
  //   })
  // }
   
  }
  
   
}
submitData = (e) => {
  e.preventDefault()
  var Parked_car_detail = JSON.parse(sessionStorage.getItem("car_parked"));
console.log(Parked_car_detail.length)
console.log("parking size" +this.state.parkingSize)
  const validForm = this.validForm();
  console.log(validForm)
  var car_detail={} ;

  var OccupiedSlots= Parked_car_detail.filter((a)=>a.isempty==true)
  console.log(OccupiedSlots.length)

if(OccupiedSlots.length==0){
  alert("parking is full")
}
else{


  if(Parked_car_detail==null && validForm==true){
    Parked_car_detail=[]
console.log("in if ")
    car_detail = {
      isempty: false,
      car_alotted: 1,
      ownerName: this.state.ownerName,
      carName: this.state.carName,
      numberPlate: this.state.numberPlate,
      entryDate: this.state.entryDate,
      color: this.state.color,
      time: new Date().toLocaleTimeString(),
    };
    Parked_car_detail.push(car_detail);
    // Parked_car_detail.push({});

    sessionStorage.setItem("car_parked", JSON.stringify(Parked_car_detail));
    var Parked_car_detail_u = JSON.parse(sessionStorage.getItem("car_parked"));
    this.setState({
      refereshed_details:Parked_car_detail_u
    })
    this.setState({
      ownerName: "",
          carName: "",
          numberPlate: "",
          color: '',
          SearchItem:'',
          entryDate:this.state.entryDate

    
    })
 }
 else if(Parked_car_detail.length>0 && validForm==true){
// console.log("in else if ")
  
 let cnt =true;
for(let i = 0 ; i <=Parked_car_detail.length-1;i++){
  if(Parked_car_detail[i].isempty==true){
    car_detail = {
      isempty: false,
      car_alotted: i+1,
      ownerName: this.state.ownerName,
      carName: this.state.carName,
      numberPlate: this.state.numberPlate,
      entryDate: this.state.entryDate,
      color: this.state.color,
      time: new Date().toLocaleTimeString()
    };
    cnt=false;
    Parked_car_detail[i]=car_detail;

    sessionStorage.setItem("car_parked", JSON.stringify(Parked_car_detail));
    var Parked_car_detail_u = JSON.parse(sessionStorage.getItem("car_parked"));
    this.setState({
      refereshed_details:Parked_car_detail_u
    })
  break;

  }

}
  if(cnt==true){
// console.log("in if true ")

    car_detail = {
      isempty: false,
      car_alotted:Parked_car_detail.length+1,
      ownerName: this.state.ownerName,
      carName: this.state.carName,
      numberPlate: this.state.numberPlate,
      entryDate: this.state.entryDate,
      color: this.state.color,
      time: new Date().toLocaleTimeString(),
    };
    Parked_car_detail.push(car_detail);
    sessionStorage.setItem("car_parked", JSON.stringify(Parked_car_detail));
    var Parked_car_detail_u = JSON.parse(sessionStorage.getItem("car_parked"));
    this.setState({
      refereshed_details:Parked_car_detail_u
    })

    this.setState({
      ownerName: "",
          carName: "",
          numberPlate: "",
          color: '',
          SearchItem:'',
      entryDate: new Date(),

    
    })
  }
  this.setState({
    ownerName: "",
        carName: "",
        numberPlate: "",
        color: '',
        SearchItem:'',
      entryDate: new Date(),

  
  })

// console.log(Parked_car_detail)
}

}

}
  
  remove_car(i){
    var Parked_car_detail = JSON.parse(sessionStorage.getItem("car_parked"));
    var car_detail = {
      isempty: true,
      car_alotted: '',
      ownerName: '',
      carName: '',
      numberPlate: '',
      entryDate: '',
      color: '',
      time: '',
    };
    Parked_car_detail[i]=car_detail
    sessionStorage.setItem("car_parked", JSON.stringify(Parked_car_detail));
    var Parked_car_detail = JSON.parse(sessionStorage.getItem("car_parked"));

      this.setState({
        refereshed_details:Parked_car_detail
      })
    this.renderCarParkedDeatil()
    // alert("called renderCarParkedDeatil from remove car")

  }

  componentWillMount(){
    var arr = JSON.parse(sessionStorage.getItem("car_parked"));
    if(arr==null){
      arr=[]
      this.setState({
        refereshed_details:[]
      })
    }

  }
  componentDidMount() {
    // console.log(this.state.entryDate);
    // console.log(this.props.location.state)
    // this.alotDefaultParking();
   
      var Parked_car_detail = JSON.parse(sessionStorage.getItem("car_parked"));
      if(Parked_car_detail==null){
        Parked_car_detail=[]
      }
      // console.log("new dat is "+today)
this.setState({
  refereshed_details:Parked_car_detail,
  // curDate: today
})
  }
  renderCarParkedDeatil = () => {
    // alert("renderCarParkedDeatil called")
    var Parked_car_detail = JSON.parse(sessionStorage.getItem("car_parked"));

    console.log("hello ")
    if (Parked_car_detail == null) {
      Parked_car_detail = [];
    }
    var i=1;
    return this.state.refereshed_details.map((parking_detail, index) => {
        

      // console.log(Parked_car_detail)
      const {car_alotted,color,entryDate,carName,numberPlate,ownerName,time,isempty} = parking_detail;
      var n=new Date(entryDate)
      // console.log(typeof(n))
      var dd = String(n.getDate()).padStart(2, "0");
    var mm = String(n.getMonth() + 1).padStart(2, "0");
      var yyyy = n.getFullYear();
      n = yyyy + "-" + mm + "-" + dd;
      if(isempty==false){
      return (
        
        <tr key={index}>
          <td>{i++} </td>

          <td>{ownerName}</td>
          <td>{carName}</td>
          <td>{numberPlate}</td>
          <td>{n}</td>
          <td> {time}</td>
          <td> {car_alotted}</td>

      <td> {color}</td>
          
          <td>
            <button class="btn btn-danger delete" onClick={()=>this.remove_car(index)}>X</button>
          </td>
        </tr>
      );

      }

    }

    );
  };

  render() {
    // console.log("called")
    return (
      <div>
<AlotDefaultParking obj={this.props.location.state}/>
{/* <AlotDefaultParking /> */}

        <header class="shadow" className="header">
          <div class="header-content d-flex justify-content-center p-2">
            <img
              src={car_pic}
              className="img"
              alt="not found"
              id="header-logo"
            />
            <div className="ml-5 align-self-center heading_n">Parking Lot</div>
          </div>
        </header>
        <div className="container">
          <form class="w-50 mx-auto mt-3" autoComplete="off">
            <h5 class="text-center">Add Car to Parking Lot</h5>
            <div class="form-group">
              <label for="owner">Owner:</label>
              <input
                type="text"
                class="form-control rounded-1 shadow-sm"
                name="ownerName"
                placeholder="Owner Name"
                value={this.state.ownerName}
                onChange={this.submithandler}
              />
              <span style={{ color: "red" }}> {this.state.NameError}</span>
            </div>
            <div class="form-group">
              <label for="car">Car:</label>
              <input
                type="text"
                class="form-control rounded-1 shadow-sm"
                name="carName"
                placeholder="Car Name"
                value={this.state.carName}
                onChange={this.submithandler}
              />
              <span style={{ color: "red" }}> {this.state.carError}</span>
            </div>
            <div class="form-group">
              <label for="licensePlate">Car Number Plate:</label>
              <input
                type="text"
                class="form-control rounded-1 shadow-sm"
                name="numberPlate"
                placeholder="MH-15-XX-1111"
                value={this.state.numberPlate}
                onChange={this.submithandler}
              />
              <span style={{ color: "red" }}>
                {" "}
                {this.state.numberPlateError}
              </span>
            </div>
            <div class="row">
              {/* <div class="col-6 form-group">
                <label for="entryDate">Entry Date:</label>
                <input
                  type="text"
                  class="form-control rounded-1 shadow-sm"
                  name="entryDate" 
                  // min={this.state.entryDate}
                  value={this.state.entryDate}
                  onChange={this.submithandler}
                  disabled
                />
                <span style={{ color: "red" }}> {this.state.DateError}</span>
              </div> */}

              {/* <div className="col-3"> </div> */}
              <div class="col-12 form-group">
                <label for="color">Color:</label>
                <select
                  class="form-control rounded-1 shadow-sm"
                  name="color" value={this.state.color}
                  onChange={this.submithandler}
                >
                  {/* <option value="default"> </option> */}
                  
                  <option value=""> select car color </option>
                  <option value="red"> Red </option>
                  <option value="black"> Black </option>
                  <option value="white"> White </option>
                  {/* <option value="Other"> Other </option> */}
                </select>
                <span style={{ color: "red" }}>
                  {" "}
                  {this.state.carColorError}
                </span>
              </div>
             
            </div>
            <button
              type="submit"
              class="btn mx-auto d-block mt-2 rounded-0 shadow "
              id="btnOne"
              onClick={this.submitData}
            >
              Add Car
            </button>
            </form>

          <div class="table-container mt-5 mb-5 w-75 mx-auto">
            <h5 class="text-center mb-3">List of Cars in Parking Lot</h5>
            {/* <div className='row'> */}
            <form>
              <div className='form-group'>          
                  <input type="text" autoComplete="off" className='form-control mb-2' name='SearchItem' value={this.state.SearchItem} onChange={(e)=>this.dynamicSearch(e)} placeholder="Search for car color"></input>
           
                  {/* <div class="col-12 form-group">
                <select
                  class="form-control rounded-1 shadow-sm"
                  name="color"
                  onChange={this.dynamicSearch}
                >
                  <option value="default"> select car color </option>
                  <option value="red"> Red </option>
                  <option value="black"> Black </option>
                  <option value="white"> White </option>
                </select>
              </div> */}
           
            </div>
            </form>
            {/* </div> */}

            <table class="table table-striped shadow ">
              <thead class="text-white header">
                <tr>
                  <th>sr no</th>
                  <th>Owner</th>
                  <th>Car Name</th>
                  <th>License Plate</th>
                  <th>Entry Date</th>
                  
                  <th> Time</th>
                  <th> Parking allotted</th>
                  <th> Color</th>
                  <th>Actions</th>
                </tr>
              </thead>
              
              {
                this.state.NodataError!=''?<tbody><tr ><th colspan="9">{this.state.NodataError}</th></tr></tbody>:<tbody>{this.renderCarParkedDeatil()}</tbody>
              }
            </table>
          </div>

        </div>
      </div>
    );
  }
}

export default ParkCar;
