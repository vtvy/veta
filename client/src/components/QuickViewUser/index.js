import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

function QuickViewUser({ user, showEmail, showFollower }) {
    const handleViewDetails = () => {};
    return (
        <Link
            to={`/profile/${user._id}`}
            className="flex items-center"
            onClick={handleViewDetails}
        >
            <div className="flex-shrink-0">
                <Avatar avatar={user.avatar} />
            </div>
            <div className="flex flex-col ml-4 ">
                <span className="text-2xl font-semibold">{user.name}</span>
                {showEmail && <span className="text-lg">{user.email}</span>}
                {showFollower && (
                    <span className="text-lg">{user.followers.length}</span>
                )}
            </div>
        </Link>
    );
}

export default QuickViewUser;
