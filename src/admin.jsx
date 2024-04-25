import { useEffect, useState} from "react";
import "./admin.css";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

function App(){
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getReport', {
                    params: {
                        email: 'anantaprajapati0@gmail.com' 
                    }
                });
                setUsers(response.data.success); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    
    return (
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <div className="w-50">
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            location
                        </th>
                        <th>
                            severity
                        </th>
                        <th>
                            image
                        </th>
                        <th>
                            description
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                     users.map(user =>{
                       return (
                       <tr key={user.id}>
                            <td>
                                {user.location}
                            </td>
                            <td>
                                {user.severity}
                            </td>
                            <td>
                                <img src={user.image} alt="User's Image"/>
                            </td>
                            <td>
                                {user.description}
                            </td>
                        </tr>
                       );
                     })   
                    }
                </tbody>
            </table>
            </div>

        </div>
    )
}

export default App;