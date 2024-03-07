import UserProfile from "@/components/Userprofile/Sidebar/userProfile/UserProfile";


const Dashboard = () => {
  
    // Once loading is done, render either Card or UserProfile based on admin status
    return (
        <div className="h-auto">
            <div>
                <UserProfile />
            </div>
        </div>
    );
};

export default Dashboard;
