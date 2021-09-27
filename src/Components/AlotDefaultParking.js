import React, { Component } from "react";

class AlotDefaultParking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parkingSize: "",
      defaultParked: "",
      color_arr: ["red", "black", "white"],
      names: [
        "Alena",
        "siri",
        "Alexa",
        "Pandya",
        "John",
        "kalya",
        "Aliyana",
        "Roy",
        "Doe",
        "Ram",
        "Google",
      ],
      carName: ["BMW", "Swift", "Audi"],
    };
  }
  componentWillMount() {
    let obj1 = this.props.obj;
    console.log(obj1);
    // console.log(typeof(obj1.parkingSize));
    this.setState({
      parkingSize: obj1.parkingSize,
      defaultParked: obj1.DefaultParked,
    });
  }

  dynamicNoplate = () => {
    var one = String.fromCharCode(Math.floor(Math.random() * (88- 65 + 1)) + 65);
    var one_n = String.fromCharCode(Math.floor(Math.random() * (80- 65 + 1)) + 65);


    var two = Math.floor(Math.random() * 50);

    var n = Math.floor(Math.random() * (88- 65 + 1)) + 65;

    var three = String.fromCharCode(n);
    var four = String.fromCharCode(n + Math.floor(Math.random() * 3));

    var no = Math.floor(Math.random() * 10000);
    var noPlate = one+""+one_n+"-" + two + "-" + three + "" + "" + four + "-" + no;
    return noPlate;
  };

  randomArray = () => {
    let temp = [];
    let i = 1;
    while(true)
    {
     let n = Math.floor(Math.random() * (this.state.parkingSize-1)+1);

     if (temp.indexOf(n) === -1)
     temp.push(n);
     i++;
     if(temp.length == this.state.defaultParked)
       break;

   }

    return temp;
  };

  componentDidMount() {
    sessionStorage.clear();
    var car_detail = {
      isempty: true,
      car_alotted: "",
      ownerName: "",
      carName: "",
      numberPlate: "",
      entryDate: "",
      color: "",
      time: "",
    };

    let arr = JSON.parse(sessionStorage.getItem("car_parked"));
    // console.log(typeof(this.state.parkingSize))

    var random_no = this.randomArray();
    console.log("random array " + random_no);
    if (arr == null) {
      arr = [];
      var i = 1;

      while (i <= this.state.parkingSize) {
        arr.push(car_detail);
        i++;
      }

      for (let i = 0; i < arr.length; i++) {
        // let n = Math.floor(
        //   Math.random() * (this.state.parkingSize - 0) + 1);
        for (let j = 0; j < random_no.length; j++) {
          if (i == random_no[j]) {
            

            var name_random = Math.floor(
              Math.random() * this.state.names.length
            );
            var car_name_random = Math.floor(
              Math.random() * this.state.carName.length
            );

            var color_length = Math.floor(
              Math.random() * this.state.color_arr.length
            );
            var noPlate = this.dynamicNoplate();
            var car_detail = {
              isempty: false,
              car_alotted: i+1,
              ownerName: this.state.names[name_random],
              carName: this.state.carName[car_name_random],
              numberPlate: noPlate,
              entryDate: new Date().toLocaleDateString(),
              color: this.state.color_arr[color_length],
              time: new Date().toLocaleTimeString(),
            };
            arr[i] = car_detail;
          }
        }
      }

      console.log(arr);
      sessionStorage.setItem("car_parked", JSON.stringify(arr));
    }
  }

  render() {
    // console.log(this.props.obj)
    return <div></div>;
  }
}

export default AlotDefaultParking;
