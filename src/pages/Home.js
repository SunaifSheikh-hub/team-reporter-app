import {Modal,Form, Button,Select } from 'antd';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth,signOut,db,collection,onAuthStateChanged,getDocs,addDoc,query, where } from "../routes/Firebase";
import { useNavigate } from 'react-router-dom'
const Home = () => {
    let navigate = useNavigate()
    const { Option } = Select;
    function SignOut(){
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/login')
          }).catch((error) => {
            // An error happened.
          });
    }
    let team = {name:'',
  timings:'',
 userid: ''};

 let loginUser={
   email:'',
   lastLogin:''
 }
    const [isModalVisible, setIsModalVisible] = useState(false);
    function handleChangefield(value) {
      console.log(`selected ${value}`);
      team.name=value
    }
    function handleChangetimings(value){
      console.log('Selected Timings',value);
      team.timings=value
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
      team.userid= user.email;
      loginUser.email=user.email;
      loginUser.lastLogin=user.lastLoggedin;

        // ...
      } else {
        // User is signed out
        // ...
        console.log("no user has logged in")
      }
    });
    const [myteams, setMyTeams] = useState([]);
    useEffect(async () => {
     

      let team = collection(db, 'teams');
      let q = query(team, where("userid", "==", loginUser.email))
      let allteams = await getDocs(q);
      let myTeamsClone = myteams.slice(0);
      allteams.forEach((doc) => {
        console.log(doc.id, doc.data());
        myTeamsClone.push(doc.data());
    });
    setMyTeams(myTeamsClone);
     console.log(myteams)
  }, []) 
 
    const addTeam = async () => {
      console.log(team);
      let teamRef = collection(db, 'teams');
      console.log(teamRef)
      await addDoc(teamRef, team);
  }
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    
    return (
        <div>
            <h1>This is Home Page</h1>
            <div class="left">
            <Button type="primary"
             onClick={showModal}
             >

        Create
      </Button>
      <Modal title="Basic Modal"
       visible={isModalVisible} 
      onOk={handleOk} onCancel={handleCancel} 
      >
      


      

        <p className="App">Create Your Own Team </p>
        <p className="newTeam">Categories</p>
        
        <Form.Item
            name={['Website Designer', 'Graphic Designer']}
            noStyle
            rules={[{ required: true, message: 'Field is required' }]}
          >
            <Select placeholder="Select Field" style={{ width: 120 }} onChange={handleChangefield}>
              <Option value="Website Designer">Website Designer</Option>
              <Option value="Graphic Designer">Graphic Designer</Option>
            </Select>
          </Form.Item>
        <p className="newTeam">Team Name</p>
        <Form.Item
            name={['2 to 5 team', '7 to 10 team']}
            noStyle
            rules={[{ required: true, message: 'Field is required' }]}
          >
            <Select placeholder="Select Field" style={{ width: 120 }} onChange={handleChangetimings} >
              <Option value="7 to 10 team">7 to 10 team</Option>
              <Option value="2 to 5 team">2 to 5 team</Option>
            </Select>
          </Form.Item>
          <Button type="primary"
             onClick={addTeam}
             >Create Team</Button>
      </Modal>
        </div>
            <Button onClick={SignOut}>Logout</Button>

        </div>
        
    );
}



export default Home