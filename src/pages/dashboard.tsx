import React, { useEffect, useState } from 'react';
import {useRouter } from 'next/router';
import axios from '../utils/axiosConfig';
import logout from '../utils/authUtils'; 

const Dashboard = () => {
  const router = useRouter(); //Initialize router hook

  const [profileComplete, setProfileComplete] = useState<boolean | null>(null);
  // Removing Username because its getting User ID and that can't be changed and the user doesn't need to see it.
//   const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [field, setField] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [fetchedProfile, setFetchedProfile] = useState<any>(null);
  const [editing, setEditing] = useState(false); // State to toggle editing mode

//   const fetchDashboardData = async () => {
//     try {
//       const token = localStorage.getItem('jwt_token');
//       const config = {
//         headers: { Authorization: `Bearer ${token}` },
//       };
//       const response = await axios.get('dashboard/dashboard', config);
//       setProfileComplete(response.data.profile_complete);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchProfileDetails = async () => {
//     try {
//       const token = localStorage.getItem('jwt_token');
//       const config = {
//         headers: { Authorization: `Bearer ${token}` },
//       };
//       const response = await axios.get('profile/get-user-profile', config);
//         console.log('Fetched profile:', response.data); // Debugging line
//         setFetchedProfile(response.data);
//     } catch (error) {
//         console.log('Error fetching profile:', error); // Debugging line
//     }
//   };

  const handleLogoutClick = async () => {
    const result = await logout();
    if (result) {
      // Navigate to login or do other things
        router.push('/login');
    }
  };

  const handleProfileCompletion = async () => {
    console.log('Profile completion clicked'); // Debugging line
    console.log("Frontend Payload:", {
        first_name: firstName,
        last_name: lastName,
        location: location,
        field: field,
        bio: bio, 
    })
    try {
      const token = localStorage.getItem('jwt_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.post('profile/setup-user-profile', {
        // Removing Username because its getting User ID and that can't be changed and the user doesn't need to see it.
        // user_id: username,
        first_name: firstName,
        last_name: lastName,
        location: location,
        field: field,
        bio: bio,
      }, config);
      setProfileComplete(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle profile update
  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.put('profile/edit-profile', fetchedProfile, config);
      setEditing(false); // Turn off editing mode
      fetchUserProfile(); // Refresh the profile
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get('profile/view-profile', config);
      setFetchedProfile(response.data);
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  };

//   useEffect(() => {
//     fetchDashboardData();
//     if (profileComplete) {
//       fetchProfileDetails();
//     }
//   }, [profileComplete]);

    useEffect(() => {
        const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('jwt_token');
            const config = {
            headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get('dashboard/dashboard', config);
            setProfileComplete(response.data.profile_complete);
            
            if (response.data.profile_complete) {
            fetchUserProfile();
            }
        } catch (error) {
            console.log(error);
        }
        };
        fetchDashboardData();
    }, []);

  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
      <h1>Dashboard</h1>

      {profileComplete === false && (
        <div>
          <h2>Please complete your profile</h2>
          {/* Removing Username because its getting User ID and that can't be changed and the user doesn't need to see it. */}
          {/* <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> */}
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Field"
            value={field}
            onChange={(e) => setField(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button onClick={handleProfileCompletion}>Complete Profile</button>
        </div>
      )}

{profileComplete && (
        <div>
          <h2>Your Profile is Complete!</h2>
          {/* Display the fetched profile */}
          {fetchedProfile && !editing && (
            <div>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
              {/* Removing Username because its getting User ID and that can't be changed and the user doesn't need to see it. */}
              {/* <p><strong>Username:</strong> {fetchedProfile.user_id}</p> */}
              <p><strong>First Name:</strong> {fetchedProfile.first_name}</p>
              <p><strong>Last Name:</strong> {fetchedProfile.last_name}</p>
              <p><strong>Location:</strong> {fetchedProfile.location}</p>
              <p><strong>Field:</strong> {fetchedProfile.field}</p>
              <p><strong>Bio:</strong> {fetchedProfile.bio}</p>
            </div>
          )}
          {editing && (
            <div>
              <button onClick={handleProfileUpdate}>Save Changes</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
              {/* ...Display input fields for editing */}
              {/* Removing Username because its getting User ID and that can't be changed and the user doesn't need to see it. */}
                {/* <input
                    type="text"
                    placeholder="Username"
                    value={fetchedProfile.user_id}
                    onChange={(e) => setFetchedProfile({ ...fetchedProfile, user_id: e.target.value })}
                /> */}
                <input
                    type="text"
                    placeholder="First Name"
                    value={fetchedProfile.first_name}
                    onChange={(e) => setFetchedProfile({ ...fetchedProfile, first_name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={fetchedProfile.last_name}
                    onChange={(e) => setFetchedProfile({ ...fetchedProfile, last_name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={fetchedProfile.location}
                    onChange={(e) => setFetchedProfile({ ...fetchedProfile, location: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Field"
                    value={fetchedProfile.field}
                    onChange={(e) => setFetchedProfile({ ...fetchedProfile, field: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Bio"
                    value={fetchedProfile.bio}
                    onChange={(e) => setFetchedProfile({ ...fetchedProfile, bio: e.target.value })}
                />

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;



// import React, { useEffect, useState } from 'react';
// import axios from '../utils/axiosConfig';

// const Dashboard = () => {
//   const [profileComplete, setProfileComplete] = useState<boolean | null>(null);
//   const [username, setUsername] = useState<string>("");  // <-- Add this line for username
//   const [firstName, setFirstName] = useState<string>("");
//   const [lastName, setLastName] = useState<string>("");
//   const [location, setLocation] = useState<string>("");
//   const [field, setField] = useState<string>("");
//   const [bio, setBio] = useState<string>("");
// //   const [isEditing, setIsEditing] = useState(false);
  

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Retrieve the JWT token from local storage
//         const token = localStorage.getItem('jwt_token');

//         // Add the JWT token to the request headers
//         const config = {
//             headers: { Authorization: `Bearer ${token}` }
//           };


//         const response = await axios.get('dashboard/dashboard', config);
//         setProfileComplete(response.data.profile_complete);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const handleProfileCompletion = async () => {
//     try {
//         // Retrieve the JWT token from local storage
//         const token = localStorage.getItem('jwt_token');
        
//         // Add the JWT token to the request headers
//         const config = {
//         headers: { Authorization: `Bearer ${token}` }
//         };

//       // Call your API endpoint to complete the profile
//       await axios.post('profile/setup-user-profile', {
//         user_id: username, // <-- Add this line for username
//         first_name: firstName,
//         last_name: lastName,
//         location: location,
//         field: field,
//         bio: bio
//       }, config);

//       // Update the local state to reflect that the profile is now complete
//       setProfileComplete(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>

//       {profileComplete === false && (
//         <div>
//           <h2>Please complete your profile</h2>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)} // <-- Add this line for username
//           />
//           <input
//             type="text"
//             placeholder="First Name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Field"
//             value={field}
//             onChange={(e) => setField(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Bio"
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//           />
//           <button onClick={handleProfileCompletion}>Complete Profile</button>
//         </div>
//       )}

//       {profileComplete && (
//         <div>
//           {/* Here you would typically display the user's profile details */}
//           <h2>Your Profile is Complete!</h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


// Explanations:
// State Variables:
// profileComplete holds whether the profile is complete or not.
// firstName, lastName, and location will hold the form values.
// Fetching Dashboard Data:
// useEffect is used to fetch the dashboard data when the component mounts.
// setProfileComplete sets the state based on the API response.
// Completing the Profile:
// handleProfileCompletion is the function that gets called when the user clicks the "Complete Profile" button.
// This function makes an API call to complete the profile and updates the local state.
// Conditional Rendering:
// If profileComplete is false, a form is displayed asking the user to complete their profile.
// If profileComplete is true, a message is displayed indicating that the profile is complete. In a real-world application, this is where you would typically display the user's profile details.